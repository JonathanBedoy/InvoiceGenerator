const Datastore = require("nedb");
require("dotenv").config();

const db = {
  invoice: new Datastore({
    filename: process.env.INVOICE_LOCATION,
    autoload: true,
  }),
  company: new Datastore({
    filename: process.env.COMPANY_LOCATION,
    autoload: true,
  }),
  inventory: new Datastore({
    filename: process.env.INVENTORY_LOCATION,
    autoload: true,
  }),
  seller: new Datastore({
    filename: process.env.SELLER_LOCATION,
    autoload: true,
  }),
};


const getAllInvoices = (userID = process.env.DEFAULT_USER) => {
  return new Promise((resolve, reject) => {
    db.invoice.find(
      {
        $and: [
          { user_ID: userID },
          { $not: { attributesNeeded: { $exists: true } } },
        ],
      },
      { user_ID: 0, _id: 0 },
      (err, doc) => {
        err ? reject(err) : resolve(doc);
        // cb(doc)
      }
    );
  });
};
const getInvoice = (invoiceId, userID = process.env.DEFAULT_USER) => {
  return new Promise((resolve, reject) => {
    db.invoice.findOne(
      { $and: [{ user_ID: userID }, { id: invoiceId }] },
      { user_ID: 0, _id: 0 },
      (err, doc) => {
        err ? reject(err) : resolve(doc);
        // cb(doc)
      }
    );
  });
};

const addInvoiceToDB = (invoiceToAdd, userID = process.env.DEFAULT_USER) => {
  return new Promise((resolve, reject) => {
    db.invoice.insert({ user_ID: userID, ...invoiceToAdd }, (err, doc) => {
      err ? reject(err) : resolve(doc);
    });
  });
};
// const canAddInvoiceToDB = (invoiceToAdd, userID = process.env.DEFAULT_USER) => {
// /
// }

//
const updateWholeDoc = async (
  typeOfDb,
  newDocInfo,
  userID = process.env.DEFAULT_USER
) => {
  // 1. retrieve the doc from db
  // 2. merge the doc with invoiceToBeUpdated
  let docInfo = await getDocFromDB(typeOfDb, newDocInfo.id, userID);

  if (!checkIfSameAttributeTypes(docInfo, newDocInfo)) {
    return 400;
  }
  return new Promise((resolve, reject) => {
    db[typeOfDb].update(
      { $and: [{ user_ID: userID }, { id: parseInt(newDocInfo.id) }] },
      { user_ID: userID, ...docInfo, ...newDocInfo },
      function (err, numReplaced) {
        // console.log(numReplaced)
        err ? reject(err) : resolve(numReplaced === 1 ? 204 : 400);
      }
    );
  });
};

const checkIfSameAttributeTypes = (doc1, doc2) => {
  let keys = Object.keys(doc1);
  for (let i = 0; i < keys.length; i++) {
    let ele = keys[i];
    // console.log(ele, typeof(doc1[ele]), typeof(doc2[ele]), typeof(doc1[ele]) !== typeof(doc2[ele]) && typeof(doc2[ele]) !== 'undefined')
    if (
      typeof doc1[ele] !== "string" &&
      typeof doc1[ele] !== typeof doc2[ele] &&
      typeof doc2[ele] !== "undefined"
    )
      return false;
  }
  return true;
};

const getDocFromDB = (typeOfDb, DocId, userID = process.env.DEFAULT_USER) => {
  return new Promise((resolve, reject) => {
    db[typeOfDb].findOne(
      { $and: [{ user_ID: userID }, { id: DocId }] },
      { user_ID: 0, _id: 0 },
      (err, doc) => {
        err ? reject(err) : resolve(doc);
      }
    );
  });
};
// updateWholeDoc('invoice', {id:312445, seller: 224474, hasPaid: true},)
const updateInvoice = async (
  invoiceToBeUpdated,
  userID = process.env.DEFAULT_USER
) => {
  // 1. retrieve the doc from db
  // 2. merge the doc with invoiceToBeUpdated
  let invoiceInfo = await getInvoice(invoiceToBeUpdated.id, userID);
  return new Promise((resolve, reject) => {
    db["invoice"].update(
      { $and: [{ user_ID: userID }, { id: parseInt(invoiceToBeUpdated.id) }] },
      { ...invoiceInfo, ...invoiceToBeUpdated },
      function (err, numReplaced) {
        err ? reject(err) : resolve(numReplaced);
      }
    );
  });
};

// TODO: if updating existing attribute, make sure its the same type
const updateOrAddDocAttribute = (
  typeOfDb,
  docId,
  attributeToChange,
  valueOfAttribute,
  userID = process.env.DEFAULT_USER
) => {
  // console.log(invoiceStatus, id)
  return new Promise((resolve, reject) => {
    db[typeOfDb].update(
      { $and: [{ user_ID: userID }, { id: parseInt(docId) }] },
      { $set: { [attributeToChange]: valueOfAttribute } },
      {},
      function (err, numReplaced) {
        err ? reject(400) : resolve(numReplaced === 1 ? 204 : 400);
      }
    );
  });
};

// updateInvoice({id:224474, hasPaid: false})
// console.log('yo')
const updateInvoicePaidStatus = (
  invoiceStatus,
  id,
  userID = process.env.DEFAULT_USER
) => {
  return new Promise((resolve, reject) => {
    db.invoice.update(
      { $and: [{ user_ID: userID }, { id: parseInt(id) }] },
      { $set: { hasPaid: invoiceStatus } },
      {},
      function (err, numReplaced) {
        err ? reject(err) : resolve(numReplaced === 1 ? 204 : 400);
      }
    );
  });
};
const getAllCompany = (userID = process.env.DEFAULT_USER) => {
  return new Promise((resolve, reject) => {
    db.company.find(
      { $and: [{ user_ID: userID }, { id: { $exists: true } }] },
      { user_ID: 0, _id: 0 },
      (err, doc) => {
        err ? reject(err) : resolve(doc);
        // cb(doc)
      }
    );
  });
};
const addCompanyToDB = async (
  companyToAdd,
  userID = process.env.DEFAULT_USER
) => {
  // check if the database can be added to DB (meets schema)
  let canAdd = await canAddToCompanyDB(companyToAdd, userID);
  if (!canAdd) return false;

  return new Promise((resolve, reject) => {
    db.company.update(
      { $and: [{ user_ID: userID }, { id: companyToAdd.id }] },
      { user_ID: userID, ...companyToAdd },
      { upsert: true },
      (err, doc, upsert) => {
        err ? reject(err) : resolve(upsert ? upsert : doc);
      }
    );
  });
};

const canAddToCompanyDB = (companyToAdd, userID = process.env.DEFAULT_USER) => {
  return new Promise((resolve, reject) => {
    db.company.findOne(
      { attributesNeeded: { $exists: true } },
      { user_ID: 0, _id: 0 },
      (err, doc) => {
        // console.log(doc.attributesNeeded)
        let keysNeeded = Object.keys(doc.attributesNeeded);
        keysNeeded.forEach((ele) => {
          if (!companyToAdd[ele]) resolve(false);
        });
        resolve(true);
      }
    );
  });
};

const getAllInventory = (userID = process.env.DEFAULT_USER) => {
  return new Promise((resolve, reject) => {
    db.inventory.find(
      { $and: [{ user_ID: userID }, { id: { $exists: true } }] },
      { user_ID: 0, _id: 0 },
      (err, doc) => {
        err ? reject(err) : resolve(doc);
        // cb(doc)
      }
    );
  });
};
const addInventoryToDB = async (
  inventoryToAdd,
  userID = process.env.DEFAULT_USER
) => {
  // check if the database can be added to DB (meets schema)
  let canAdd = await canAddToInventoryDB(inventoryToAdd, userID);
  if (!canAdd) return false;
  return new Promise((resolve, reject) => {
    db.inventory.insert({ user_ID: userID, ...inventoryToAdd }, (err, doc) => {
      err ? reject(err) : resolve(doc);
    });
  });
};
const canAddToInventoryDB = (itemToAdd, userID = process.env.DEFAULT_USER) => {
  return new Promise((resolve, reject) => {
    db.inventory.findOne(
      { attributesNeeded: { $exists: true } },
      { user_ID: 0, _id: 0 },
      (err, doc) => {
        // console.log(doc.attributesNeeded)
        let keysNeeded = Object.keys(doc.attributesNeeded);
        keysNeeded.forEach((ele) => {
          if (!itemToAdd[ele]) resolve(false);
        });
        resolve(true);
      }
    );
  });
};
const updateInventoryQuantity = (
  newQuantity,
  id,
  offset = null,
  userID = process.env.DEFAULT_USER
) => {
  let operationType = offset ? "$inc" : "$set";
  let operationValue = offset ? parseInt(offset) : parseInt(newQuantity);

  return new Promise((resolve, reject) => {
    db.inventory.update(
      { $and: [{ user_ID: userID }, { id: parseInt(id) }] },
      { [operationType]: { quantity: operationValue } },
      {},
      function (err, numReplaced) {
        // console.log(numReplaced === 1 ? 204 : 400)
        err ? reject(400) : resolve(numReplaced === 1 ? 204 : 400);
      }
    );
  });
};

// db.inventory.update({ $and: [{ user_ID: process.env.DEFAULT_USER }, { id: 3 }] }, { $inc: { quantity: -2 } }, {}, function (err, numReplaced) {
//   console.log(err, numReplaced)
// });

const getAllSeller = (userID = process.env.DEFAULT_USER) => {
  return new Promise((resolve, reject) => {
    db.seller.find(
      { $and: [{ user_ID: userID }, { id: { $exists: true } }] },
      { user_ID: 0, _id: 0 },
      (err, doc) => {
        err ? reject(err) : resolve(doc);
        // cb(doc)
      }
    );
  });
};

const addSellerToDB = async (
  sellerToAdd,
  userID = process.env.DEFAULT_USER
) => {
  // check if the database can be added to DB (meets schema)
  let canAdd = await canAddToDB("seller", sellerToAdd, userID);
  if (!canAdd) return 400;
  return new Promise((resolve, reject) => {
    db.seller.update(
      { $and: [{ user_ID: userID }, { id: sellerToAdd.id }] },
      { user_ID: userID, ...sellerToAdd },
      { upsert: true },
      (err, doc, upsert) => {
        err ? reject(err) : resolve(upsert ? 201 : doc === 1 ? 200 : 400);
      }
    );
  });
};

const addToDBWithStatusCode = async (
  dbType,
  docToAdd,
  userID = process.env.DEFAULT_USER
) => {
  // check if the database can be added to DB (meets schema)
  let canAdd = await canAddToDB(dbType, docToAdd, userID);
  // console.log(canAdd)
  if (!canAdd) return 400;
  return new Promise((resolve, reject) => {
    db[dbType].update(
      { $and: [{ user_ID: userID }, { id: docToAdd.id }] },
      { user_ID: userID, ...docToAdd },
      { upsert: true },
      (err, doc, upsert) => {
        err ? reject(err) : resolve(upsert ? 201 : doc === 1 ? 200 : 400);
      }
    );
  });
};

const canAddToDB = (
  dbType,
  docToBeAdded,
  userID = process.env.DEFAULT_USER
) => {
  return new Promise((resolve, reject) => {
    db[dbType].findOne(
      { attributesNeeded: { $exists: true  }},
      { user_ID: 0, _id: 0 },
      (err, doc) => {
        let keysNeeded = Object.keys(doc.attributesNeeded);
        keysNeeded.forEach((ele) => {
          // console.log(ele, docToBeAdded[ele], (typeof docToBeAdded[ele] !== doc.attributesNeeded[ele]), doc.attributesNeeded[ele], typeof(docToBeAdded[ele]))
          if (typeof docToBeAdded[ele] !== doc.attributesNeeded[ele])
            resolve(false);
        });
        resolve(true);
      }
    );
  });
};

const removeDocFromDBWithAttribute = (
  typeOfDb,
  attribute,
  attributeVal,
  attributeType = "string",
  moreThanOne = true,
  userID = process.env.DEFAULT_USER
) => {
  let attributeValTransformed = attributeVal;
  if (attributeType === "number") {
    attributeValTransformed = Number(attributeValTransformed);
  }
  // console.log(typeOfDb, attribute, attributeValTransformed, attributeType)
  return new Promise((resolve, reject) => {
    db[typeOfDb].remove(
      { $and: [{ user_ID: userID }, { [attribute]: attributeValTransformed }] },
      { multi: moreThanOne },
      function (err, numReplaced) {
        // console.log(numReplaced)
        err ? reject(400) : resolve(numReplaced === 1 ? 204 : 400);
      }
    );
  });
};

const removeDocFromDBWithId = (
  typeOfDb,
  docId,
  userID = process.env.DEFAULT_USER
) => {
  // console.log(invoiceStatus, id)
  return new Promise((resolve, reject) => {
    db[typeOfDb].remove(
      { $and: [{ user_ID: userID }, { id: parseInt(docId) }] },
      { multi: true },
      function (err, numReplaced) {
        // console.log(numReplaced);
        err ? reject(err) : resolve(numReplaced);
      }
    );
  });
};

// removeDocFromDBWithId('company', 65432423423475)
// removeDocFromDBWithAttribute('invoice', 'seller', 475231, 'number')

async function logInvoices() {
  // let resssss = await updateOrAddDocAttribute('invoice', 2, 'company', 65432423423475)
  // console.log(resssss)
  // let dbResult = await getAllInvoices()
  // console.log(dbResult)
}

// logInvoices()
exports.getAllInvoices = getAllInvoices;
exports.addInvoiceToDB = addInvoiceToDB;
exports.updateInvoicePaidStatus = updateInvoicePaidStatus;
exports.getAllCompany = getAllCompany;
exports.addCompanyToDB = addCompanyToDB;
exports.getAllInventory = getAllInventory;
exports.addInventoryToDB = addInventoryToDB;
exports.updateInventoryQuantity = updateInventoryQuantity;
exports.getAllSeller = getAllSeller;
exports.addSellerToDB = addSellerToDB;
exports.updateOrAddDocAttribute = updateOrAddDocAttribute;
exports.updateWholeDoc = updateWholeDoc;
exports.removeDocFromDBWithId = removeDocFromDBWithId;
exports.removeDocFromDBWithAttribute = removeDocFromDBWithAttribute;
exports.addToDBWithStatusCode = addToDBWithStatusCode;
exports.db = db;

// module.exports = db

// export default db;
