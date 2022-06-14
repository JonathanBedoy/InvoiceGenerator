const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const session = require("express-session");

app.use(history());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();

if (process.env.DEV_ENVIRONMENT === 'true' ) {
  console.log('DEV MODE')
} else {
  console.log('Production Mode')
}
var sess = {
  secret: "keyboard cat",
  cookie: {
    sameSite: process.env.DEV_ENVIRONMENT === 'true'  ? process.env.SAMESITE_DEV : process.env.SAMESITE,
    secure: process.env.SECURE === 'true',
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
};

// need to set these headers to get cookies to work cross origin(cors)
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.DEV_ENVIRONMENT === 'true'  ? process.env.ORIGIN_DEV : process.env.ORIGIN);
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.use(session(sess));
var corsOptions = {
  origin: process.env.DEV_ENVIRONMENT === 'true'  ? process.env.ORIGIN_DEV : process.env.ORIGIN,
  credentials: true,
  // httpOnly: false,
  optionsSuccessStatus: 200,
};

app.enable('trust proxy')

// app.options("/login", cors(corsOptions));
app.post("/login", cors(corsOptions), function (req, res, next) {
  console.log('attempt Login', req.sessionID, req.session.userID);
  attemptLogin(req.body, res, req);
});

app.get("/loginstatus", cors(corsOptions), function (req, res, next) {
  verifyLogin(req, res);
});

// const db = require('./Database/databaseConnection')
const db = require("./Database/databaseConnection");
const {
  stringToNumbersObject,
  stringToNumber,
  checkIfBoolean,
  checkIfNumber,
} = require("./HelperFunctions/typeFormatter");
const { login, verifyUserConnection } = require("./Database/Databases/login");
// const getAllInvoices = require('./Database/databaseConnection')

app.get("/items/:userID", cors(corsOptions), (req, res) => {
  console.log(req.session.userID, ": getting items", req.params.userID);

  sendAllInfo(res, req);
});

// app.options("/addCompany", cors());
app.put("/addCompany/:userID", cors(corsOptions), (req, res) => {
  console.log(req.session.userID, ": adding company");
  addToDb("company", req.body, "/companies/companyView/", req, res);
});

// app.options("/addSeller", cors());
app.put("/addSeller/:userID", cors(corsOptions), (req, res) => {
  console.log(req.session.userID, ": adding seller");
  addToDb("seller", req.body, "/seller/view/", req, res);
});

// app.options("/addInvoice", cors());
app.put("/addInvoice/:userID", cors(corsOptions), (req, res) => {
  console.log(req.session.userID, ": adding invoice");
  addToDb("invoice", req.body, "/invoice/view/", req, res);
});

// app.options("/addInventory", cors());
app.put("/addInventory/:userID", cors(corsOptions), (req, res) => {
  console.log(req.session.userID, ": adding inventory");
  addToDb("inventory", req.body, "/inventory/showItem/", req, res);
});

// app.options("/updateInvoiceStatus", cors());
app.patch("/updateInvoiceStatus/:userID", cors(corsOptions), (req, res) => {
  console.log(req.session.userID, ": updating invoice status");
  updateInvoiceStatus(req, res, req.body);
});
// app.options("/updateInventoryQuantities", cors());
app.patch("/updateInventoryQuantities/:userID",cors(corsOptions),(req, res) => {
    console.log(req.session.userID, ": updating inventory Quantities");
    updateInventoryQuantities(req, res, req.body);
  }
);

// app.options("/updateDoc", cors());
app.patch("/updateDoc/:userID", cors(corsOptions), (req, res) => {
  console.log(req.session.userID, ": updateDoc");
  updateDoc(req, res, req.body);
});
// app.options("/removeDocs", cors());
app.delete("/removeDocs/:userID", cors(corsOptions), (req, res) => {
  console.log(req.session.userID, ": removeDocs");
  removeDocs(req, res, req.body);
});

async function sendAllInfo(res, req) {
  let verified = await verifyUserConnection(req.sessionID, req.params.userID);
  // console.log(verified);
  if (!verified) {
    // console.log("not verified");
    res.status(403).end();
    return;
  }
  const allInvoices = {
    invoice: await db.getAllInvoices(req.params.userID),
    company: await db.getAllCompany(req.params.userID),
    inventory: await db.getAllInventory(req.params.userID),
    seller: await db.getAllSeller(req.params.userID),
  };
  res.send(allInvoices);
}
const updateDoc = async (req, res, docInfo) => {
  let verified = await verifyUserConnection(req.sessionID, req.params.userID);
  // console.log(verified)
  if (!verified) {
    // console.log('not verified')
    res.status(403).end();
    return;
  }
  let keysOfDoc = Object.keys(docInfo);
  let response = 400;
  if (docInfo.id && docInfo.dbType) {
    const newDoc = stringToNumbersObject(docInfo);
    delete newDoc.dbType;
    // will update more than one thing in doc (merge 2 old doc with new)
    if (keysOfDoc.length > 3) {
      response = await db.updateWholeDoc(
        docInfo.dbType,
        newDoc,
        req.params.userID
      );
    } else {
      keysOfDoc = keysOfDoc.filter((ele) => ele !== "id" && ele !== "dbType");
      // will just update one item
      response = await db.updateOrAddDocAttribute(
        docInfo.dbType,
        newDoc.id,
        keysOfDoc,
        newDoc[keysOfDoc],
        req.params.userID
      );
    }
  }
  // console.log(response)
  res.status(response).end();
};

const attemptLogin = async (loginInfo, res, req) => {
  let response = 400;
  if (hasProperAttributes(Object.keys(loginInfo), ["pass", "user"])) {
    // console.log(loginInfo);
    let loginResult = await login(
      loginInfo.user,
      loginInfo.pass,
      req.sessionID
    );
    // conso
    response = Number(loginResult.statusCode);
    let userID = loginResult.userID;
    req.session.userID = userID;
    req.session.userName = loginInfo.user;
    res.send({ data: { userId: userID, userName: loginInfo.user } });
  }
  // console.log(response);
  res.status(response).end();
};

const verifyLogin = async (req, res) => {
  // console.log(req.sessionID, req.session.userID);
  if (req.session.userID && req.session.userName) {
    let verified = await verifyUserConnection(
      req.sessionID,
      req.session.userID
    );
    // console.log(verified);
    if (!verified) {
      req.session.userID = false;
      req.session.userName = false;
      // console.log("not verified");
      res.send({
        data: { userId: false, userName: false },
      });
      res.status(403).end();
      return;
    }
    res.send({
      data: { userId: req.session.userID, userName: req.session.userName },
    });
    res.end();
  } else {
    res.send({
      data: { userId: false, userName: false },
    });
  }
};
// addToDb("invoice", req.body, "/invoice/view/", req, res);
const addToDb = async (dbType, docToAdd, locationStr, req, res) => {
  let verified = await verifyUserConnection(req.sessionID, req.params.userID);
  console.log(verified)
  if (!verified) {
    // console.log('not verified')
    res.status(403).end();
    return;
  }
  const response = await db.addToDBWithStatusCode(
    dbType,
    stringToNumbersObject(docToAdd),
    req.params.userID
  );
  if (response === 200 || response === 201) {
    res.location(`${locationStr}${docToAdd.id}`);
  }
  res.status(response).end();
};

const updateInvoiceStatus = async (req, res, invoice) => {
  // console.log(req.sessionID, req.params.userID);
  let verified = await verifyUserConnection(req.sessionID, req.params.userID);
  // console.log(verified);
  if (!verified) {
    // console.log("not verified");
    res.status(403).end();
    return;
  }
  let response = 400;
  if (checkIfBoolean(invoice.status)) {
    response = await db.updateInvoicePaidStatus(
      invoice.status,
      stringToNumber(invoice.id),
      req.params.userID
    );
  }
  res.status(response).end();
};
const updateInventoryQuantities = async (req, res, inventoryItems) => {
  let verified = await verifyUserConnection(req.sessionID, req.params.userID);
  // console.log(verified)
  if (!verified) {
    // console.log('not verified')
    res.status(403).end();
    return;
  }
  let response = Array(inventoryItems.length).fill(undefined); //Array(n).fill(0)
  for (let i = 0; i < inventoryItems.length; i++) {
    if (checkIfNumber(inventoryItems[i].offset)) {
      response[i] = await db.updateInventoryQuantity(
        false,
        stringToNumber(inventoryItems[i].id),
        stringToNumber(inventoryItems[i].offset),
        req.params.userID
      );
    } else response[i] = 400;
  }

  let statusCode = 204;
  response.forEach((ele) => {
    statusCode = ele !== 204 ? ele : statusCode;
  });
  res.status(statusCode);
  res.send({ responses: response });
};

const removeDocs = async (req, res, docInfo) => {
  let verified = await verifyUserConnection(req.sessionID, req.params.userID);
  // console.log(verified)
  if (!verified) {
    // console.log('not verified')
    res.status(403).end();
    return;
  }
  // console.log(docInfo)
  let response = 400;
  if (
    hasProperAttributes(Object.keys(docInfo), [
      "dbType",
      "attributeLabel",
      "attributeValue",
      "attributeValueType",
    ])
  ) {
    // console.log('removing')
    response = await db.removeDocFromDBWithAttribute(
      docInfo.dbType,
      docInfo.attributeLabel,
      docInfo.attributeValue,
      docInfo.attributeValueType,
      true,
      req.params.userID
    );
  }
  res.status(response).end();
};

const hasProperAttributes = (attributes, attributesNeeded) => {
  let acceptable = true;
  const sortedAttributes = attributes.sort((a, b) => a.localeCompare(b));
  const sortedattributesNeeded = attributesNeeded.sort((a, b) =>
    a.localeCompare(b)
  );
  sortedAttributes.forEach((element, index) => {
    // console.log(element, sortedattributesNeeded[index], element !== sortedattributesNeeded[index])
    if (element !== sortedattributesNeeded[index]) acceptable = false;
  });
  // console.log(acceptable)
  return acceptable;
};

app.listen(process.env.DEV_ENVIRONMENT === 'true' ? process.env.DEV_PORT :process.env.PORT);
