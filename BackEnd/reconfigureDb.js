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
  user: new Datastore({ filename: process.env.USER_LOCATION, autoload: true }),
};

const companyDoc = {
  user_ID: process.env.DEFAULT_USER,
  // user_ID: 12345,
  company: [
    {
      id: 65432475,
      name: "Artesian Furniture",
      phone: "3234564578",
      // location: '1234 Telegraph ave Azusa 91235',
      city: "Bloomington",
      street: "315 Resource Dr.",
      zipCode: "91235",
      state: "Ca.",
      description: "haha a boring company",
    },
    {
      id: 65432423423475,
      name: "ghjkghkighijj Furniture",
      phone: "5624564578",
      location: "1234 Telegraph ave Azusa 91235",
      description: "haha a boring company",
    },
    {
      id: 65423423475,
      name: "asdasdad Furniture",
      phone: "8004564578",
      location: "1234 Telegraph ave Azusa 91235",
      description: "haha a boring company",
    },
  ],
  companyData: [],
  attributesNeeded: {
    name: "",
    phone: "number",
    city: "",
    street: "",
    zipCode: "number",
    state: "",
    description: "",
  },
};
const companyDoc1 = {
  user_ID: process.env.DEFAULT_USER,
  id: 65432475,
  name: "Artesian Furniture",
  phone: "3234564578",
  city: "Bloomington",
  street: "315 Resource Dr.",
  zipCode: "91235",
  state: "Ca.",
  description: "haha a boring company",
};
const companyDoc2 = {
  user_ID: process.env.DEFAULT_USER,
  id: 65432423423475,
  name: "ghjkghkighijj Furniture",
  phone: "5624564578",
  location: "1234 Telegraph ave Azusa 91235",
  description: "haha a boring company",
};
const companyAttributesNeeded = {
  // user_ID: process.env.DEFAULT_USER,
  attributesNeeded: {
    name: "string",
    phone: "number",
    city: "string",
    street: "string",
    zipCode: "number",
    state: "string",
    description: "string",
  },
};
const invoiceDoc = {
  user_ID: process.env.DEFAULT_USER,
  // user_ID: 12345,
  invoices: [
    {
      id: 2, // invoice #
      seller: 1231231, // id of seller
      company: 65432475, // id of company
      taxRate: 10, // taxRate in %
      date: "2020-05-31",
      hasPaid: false,
      items: [
        {
          id: 1, // id of item in inventory
          quantity: 4, // quantity being sold
          price: 21.21, // price per item
        },
        {
          id: 2, // id of item in inventory
          quantity: 10, // quantity being sold
          price: 61.59, // price per item
        },
      ],
      withInfo: {
        seller: {
          id: 1231231,
          name: "Joe Shmoe",
          city: "Azusa",
          street: "1234 Telegraph ave.",
          zipCode: "91235",
          state: "Ca",
          phone: 5624561234,
        }, // id of seller
        company: {
          id: 65432475,
          name: "Artesian Furniture",
          phone: "3234564578",
          city: "Bloomington",
          street: "315 Resource Dr.",
          zipCode: "91235",
          state: "Ca.",
          description: "haha a boring company",
        }, // id of company
        taxRate: 10, // taxRate in %
        date: "2020-05-31",
        hasPaid: false,
        items: [
          {
            type: "Staples",
            brand: "Senco",
            quantity: 21,
            name: "6/7'",
            description: "Senco 6/7'",
            id: 1, // id of item in inventory
            quantity: 4, // quantity being sold
            price: 21.21, // price per item
          },
          {
            type: "Staples_Guns",
            brand: "Senco",
            quantity: 3,
            name: "Flat Nose",
            description: "Senco Flat Nose",
            id: 2, // id of item in inventory
            quantity: 10, // quantity being sold
            price: 61.59, // price per item
          },
        ],
      },
    },
    {
      id: 3, // invoice #
      seller: 1231231, // id of seller
      company: 65432475, // id of company
      taxRate: 10, // taxRate in %
      date: "2022-05-31",
      hasPaid: true,
      items: [
        {
          id: 1, // id of item in inventory
          quantity: 2, // quantity being sold
          price: 4.21, // price per item
        },
        {
          id: 2, // id of item in inventory
          quantity: 3, // quantity being sold
          price: 12.23, // price per item
        },
      ],
      withInfo: {
        seller: {
          id: 1231231,
          name: "Joe Shmoe",
          city: "Azusa",
          street: "1234 Telegraph ave.",
          zipCode: "91235",
          state: "Ca",
          phone: 5624561234,
        }, // id of seller
        company: {
          id: 65432475,
          name: "Artesian Furniture",
          phone: "3234564578",
          city: "Bloomington",
          street: "315 Resource Dr.",
          zipCode: "91235",
          state: "Ca.",
          description: "haha a boring company",
        }, // id of company
        taxRate: 10, // taxRate in %
        date: "2020-05-31",
        hasPaid: false,
        items: [
          {
            type: "Staples",
            brand: "Senco",
            quantity: 21,
            name: "6/7'",
            description: "Senco 6/7'",
            id: 1, // id of item in inventory
            quantity: 2, // quantity being sold
            price: 4.21, // price per item
          },
          {
            type: "Staples_Guns",
            brand: "Senco",
            quantity: 3,
            name: "Flat Nose",
            description: "Senco Flat Nose",
            id: 2, // id of item in inventory
            quantity: 3, // quantity being sold
            price: 12.23, // price per item
          },
        ],
      },
    },
  ],
  attributesNeeded: {
    seller: "",
    company: "",
    taxRate: "",
    data: "",
    hasPaid: "boolean",
    items: "array",
    id: "",
  },
};

const invoiceDoc1 = {
  user_ID: process.env.DEFAULT_USER,
  id: 2, // invoice #
  seller: 1231231, // id of seller
  company: 65432475, // id of company
  taxRate: 10, // taxRate in %
  date: "2020-05-31",
  hasPaid: false,
  items: [
    {
      id: 1, // id of item in inventory
      quantity: 4, // quantity being sold
      price: 21.21, // price per item
    },
    {
      id: 2, // id of item in inventory
      quantity: 10, // quantity being sold
      price: 61.59, // price per item
    },
  ],
  withInfo: {
    seller: {
      id: 1231231,
      name: "Joe Shmoe",
      city: "Azusa",
      street: "1234 Telegraph ave.",
      zipCode: "91235",
      state: "Ca",
      phone: 5624561234,
    }, // id of seller
    company: {
      id: 65432475,
      name: "Artesian Furniture",
      phone: "3234564578",
      city: "Bloomington",
      street: "315 Resource Dr.",
      zipCode: "91235",
      state: "Ca.",
      description: "haha a boring company",
    }, // id of company
    taxRate: 10, // taxRate in %
    date: "2020-05-31",
    hasPaid: false,
    items: [
      {
        type: "Staples",
        brand: "Senco",
        quantity: 21,
        name: "6/7'",
        description: "Senco 6/7'",
        id: 1, // id of item in inventory
        quantity: 4, // quantity being sold
        price: 21.21, // price per item
      },
      {
        type: "Staples_Guns",
        brand: "Senco",
        quantity: 3,
        name: "Flat Nose",
        description: "Senco Flat Nose",
        id: 2, // id of item in inventory
        quantity: 10, // quantity being sold
        price: 61.59, // price per item
      },
    ],
  },
};

const invoiceDoc2 = {
  user_ID: process.env.DEFAULT_USER, //process.env.DEFAULT_USER,
  id: 3, // invoice #
  seller: 1231231, // id of seller
  company: 65432475, // id of company
  taxRate: 10, // taxRate in %
  date: "2022-05-31",
  hasPaid: true,
  items: [
    {
      id: 1, // id of item in inventory
      quantity: 2, // quantity being sold
      price: 4.21, // price per item
    },
    {
      id: 2, // id of item in inventory
      quantity: 3, // quantity being sold
      price: 12.23, // price per item
    },
  ],
  withInfo: {
    seller: {
      id: 1231231,
      name: "Joe Shmoe",
      city: "Azusa",
      street: "1234 Telegraph ave.",
      zipCode: "91235",
      state: "Ca",
      phone: 5624561234,
    }, // id of seller
    company: {
      id: 65432475,
      name: "Artesian Furniture",
      phone: "3234564578",
      city: "Bloomington",
      street: "315 Resource Dr.",
      zipCode: "91235",
      state: "Ca.",
      description: "haha a boring company",
    }, // id of company
    taxRate: 10, // taxRate in %
    date: "2020-05-31",
    hasPaid: false,
    items: [
      {
        type: "Staples",
        brand: "Senco",
        quantity: 21,
        name: "6/7'",
        description: "Senco 6/7'",
        id: 1, // id of item in inventory
        quantity: 2, // quantity being sold
        price: 4.21, // price per item
      },
      {
        type: "Staples_Guns",
        brand: "Senco",
        quantity: 3,
        name: "Flat Nose",
        description: "Senco Flat Nose",
        id: 2, // id of item in inventory
        quantity: 3, // quantity being sold
        price: 12.23, // price per item
      },
    ],
  },
};

const invoiceAttributesNeededDoc = {
  // user_ID: process.env.DEFAULT_USER, //process.env.DEFAULT_USER,
  attributesNeeded: {
    seller: "number",
    company: "number",
    taxRate: "number",
    withInfo: "object",
    hasPaid: "boolean",
    items: "object",
    id: "number",
  },
};

const sellerDoc = {
  sellers: [
    {
      id: 1231231,
      name: "Joe Shmoe",
      city: "Azusa",
      street: "1234 Telegraph ave.",
      zipCode: "91235",
      state: "Ca",
      phone: 5624561234,
    },
  ],
};
const sellerDoc1 = {
  user_ID: process.env.DEFAULT_USER,
  id: 1231231,
  name: "Joe Shmoe",
  city: "Azusa",
  street: "1234 Telegraph ave.",
  zipCode: "91235",
  state: "Ca",
  phone: 5624561234,
};
const sellerDoc2 = {
  user_ID: process.env.DEFAULT_USER,
  id: 3216548,
  name: "Jonathan Shmoe",
  city: "Azusa",
  street: "1234 Telegraph ave.",
  zipCode: "91235",
  state: "Ca",
  phone: 5624561234,
};
const sellerAttributesNeeded = {
  // user_ID: process.env.DEFAULT_USER,
  attributesNeeded: {
    name: "string",
    city: "string",
    street: "string",
    zipCode: "number",
    state: "string",
    phone: "number",
    id: "number",
  },
};

const inventoryDoc1 = {
  user_ID: process.env.DEFAULT_USER,
  type: "Staples",
  brand: "Senco",
  quantity: 21,
  // name: "6/7'",
  description: "Senco 6/7'",
  id: 1,
};

const inventoryDoc2 = {
  user_ID: process.env.DEFAULT_USER,
  type: "Staples_Guns",
  brand: "Senco",
  quantity: 3,
  // name: "Flat Nose",
  description: "Senco Flat Nose",
  id: 2,
};
const inventoryDoc3 = {
  user_ID: process.env.DEFAULT_USER,
  type: "Staples_Guns",
  brand: "Unicatch",
  quantity: 2,
  // name: "Brad",
  description: "Unicatch Brad",
  id: 3,
};
const inventroyAttributesNeeded = {
  // user_ID: process.env.DEFAULT_USER,
  attributesNeeded: {
    type: "string",
    brand: "string",
    quantity: "number",
    // name: "string",
    description: "string",
  },
};
const inventoryDoc = {
  inventory: [
    {
      type: "asd",
      brand: "Senco",
      quantity: 10,
      name: "1/2'",
      description: "3/5 Senco N17",
      id: 1,
    },
    {
      type: "d",
      brand: "Unicatch",
      quantity: 6,
      name: "3/8' Gauge",
      description: "Unicatch 3/8' Gauge",
      id: 2,
    },
    {
      type: "Staples",
      brand: "Senco",
      quantity: 21,
      name: "6/7'",
      description: "Senco 6/7'",
      id: 3,
    },
    {
      type: "Staples_Guns",
      brand: "Senco",
      quantity: 3,
      name: "Flat Nose",
      description: "Senco Flat Nose",
      id: 4,
    },
    {
      type: "Staples_Guns",
      brand: "Unicatch",
      quantity: 2,
      name: "Brad",
      description: "Unicatch Brad",
      id: 5,
    },
  ],
  inventoryData: [],
  attributesNeeded: {
    type: "dropdown",
    brand: "dropdown",
    quantity: "number",
    name: "",
    description: "",
  },
};

const userAttributesNeededDoc = {
  attributesNeeded: {
    name: "string",
    user_ID: "number",
    socket_ID: "string",
    userName: "string",
    password: "string",
  },
};

const userDoc1 = {
  name: "Joe Shmoe",
  user_ID: 741369,
  socket_ID: "FB_RO5IIY7RRU2PBNlQ4pgosNkk5c17h",
  password: "shmoe123",
  userName: "jshmoe",
};

const userDoc2 = {
  name: "Gues User",
  user_ID: 321654,
  socket_ID: "Is-lfIgxBhTofKb6XpOUQeUgPV3z7btl",
  password: "password",
  userName: "guest",
};

const reConfigureUserDB = (repopulate = true, remove = true) => {
  // remove all docs
  db.user.remove({}, { multi: true }, function (err, numRemoved) {
    // then insert the default ones above
    if (repopulate) {
      db.user.insert(userDoc1);
      db.user.insert(userDoc2);
      db.user.insert(userAttributesNeededDoc);
    }
  });
  if (!remove && repopulate) {
    db.user.insert(userDoc1);
    db.user.insert(userDoc2);
    db.user.insert(userAttributesNeededDoc);
  }
};

const reConfigureInventoryDB = (repopulate = true, remove = true) => {
  // remove all docs
  db.inventory.remove({}, { multi: true }, function (err, numRemoved) {
    // then insert the default ones above
    if (repopulate) {
      console.log('Inventory: inserting default data')
      db.inventory.insert(inventoryDoc1);
      db.inventory.insert(inventoryDoc2);
      db.inventory.insert(inventoryDoc3);
      db.inventory.insert(inventroyAttributesNeeded);
    }
  });
  if (!remove && repopulate) {
    console.log('Inventory: inserting default data1')
    db.inventory.insert(inventoryDoc1);
    db.inventory.insert(inventoryDoc2);
    db.inventory.insert(inventoryDoc3);
    db.inventory.insert(inventroyAttributesNeeded);
  }
};

const reConfigureInvoiceDB = (repopulate = true, remove = true) => {
  // remove all docs
  db.invoice.remove({}, { multi: true }, function (err, numRemoved) {
    // then insert the default ones above
    if (repopulate) {
      console.log('invoice: inserting default data')
      db.invoice.insert(invoiceDoc1);
      db.invoice.insert(invoiceDoc2);
      db.invoice.insert(invoiceAttributesNeededDoc);
    }
  });
  if (!remove && repopulate) {
    console.log('invoice: inserting default data1')
    db.invoice.insert(invoiceDoc1);
    db.invoice.insert(invoiceDoc2);
    db.invoice.insert(invoiceAttributesNeededDoc);
  }
};
const reConfigureCompanyDB = (repopulate = true, remove = true) => {
  // remove all docs
  db.company.remove({}, { multi: true }, function (err, numRemoved) {
    // then insert the default ones above
    if (repopulate) {
      console.log('company: inserting default data')
      db.company.insert(companyDoc1);
      db.company.insert(companyDoc2);
      db.company.insert(companyAttributesNeeded);
    }
  });
  if (!remove && repopulate) {
    console.log('company: inserting default data1')
    db.company.insert(companyDoc1);
    db.company.insert(companyDoc2);
    db.company.insert(companyAttributesNeeded);
  }
};
const reConfigureSellerDB = (repopulate = true, remove = true) => {
  // remove all docs
  db.seller.remove({}, { multi: true }, function (err, numRemoved) {
    // then insert the default ones above
    if (repopulate) {
      console.log('seller: inserting default data')
      db.seller.insert(sellerDoc1);
      db.seller.insert(sellerDoc2);
      db.seller.insert(sellerAttributesNeeded);
    }
  });
  if (!remove && repopulate) {
    console.log('seller: inserting default data1')
    db.seller.insert(sellerDoc1);
    db.seller.insert(sellerDoc2);
    db.seller.insert(sellerAttributesNeeded);
  }
};
let repopulateDB = true
let removeAllFromDB = true

reConfigureInvoiceDB(repopulateDB, removeAllFromDB);
reConfigureCompanyDB(repopulateDB, removeAllFromDB);
reConfigureSellerDB(repopulateDB, removeAllFromDB);
reConfigureInventoryDB(repopulateDB, removeAllFromDB);
reConfigureUserDB(repopulateDB, removeAllFromDB);
