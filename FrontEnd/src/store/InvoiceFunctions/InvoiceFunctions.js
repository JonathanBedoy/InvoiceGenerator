const max = 555555;
const min = 111111;

// needs the list of invoices and
//will generate an invoice #
const generateInvoiceNumber = (invoices) => {
  let invoiceNumber = getRandomInt(max, min);
  let isUnique = invoices.findIndex(
    (ele) => parseInt(ele.id) === invoiceNumber
  );
  while (isUnique !== -1) invoiceNumber = getRandomInt(max, min);
  isUnique = invoices.findIndex((ele) => parseInt(ele.id) === invoiceNumber);
  return invoiceNumber;
};

export const getInvoicehasPaidBreakdown = (invoices) => {
  let invoiceBreakdown = [
    { x: "Paid", y: 0, color: "lightgreen", total: 0 },
    { x: "Unpaid", y: 0, color: "#db6565", total: 0 },
  ];
  invoices.forEach((invoiceInfo) => {
    let invoiceItorator = invoiceInfo.hasPaid ? 0 : 1;
    invoiceBreakdown[invoiceItorator].y++; //= getInvoiceTotal(invoices, invoiceInfo.id)//++
    invoiceBreakdown[invoiceItorator].total += getInvoiceTotal(
      invoices,
      invoiceInfo.id
    );
  });
  return invoiceBreakdown.filter((ele) => ele.y !== 0);
};

export const getTop5Companies = (companies, invoices, companiesToShow = 5) => {
  let colors = ["#86C98A", "#54A759", "#2D8633", "#116416", "#004304"];
  let top5Companies = [
    // { x: "Artesian\nFurniture", y: 600.02, color: "lightblue", stroke: "blue" },
    // { x: "Moss\nStudio", y: 350.9, color: "orange", stroke: "red" },
    // { x: "Imperial\nManufacture", y: 535.54, color: "lightblue", stroke: "blue" },
    // { x: "Creative\nSolutions", y: 1000.36, color: "lightgreen", stroke: "green" },
    // { x: "Cresssative\nSolutions", y: 1000.36, color: "lightgreen", stroke: "green" },
  ];

  companies.forEach((companyInfo, index) => {
    top5Companies.push({
      x: companyInfo.name.replace(" ", "\n"),
      y: getCompanyProfit(invoices, companyInfo),
      color: colors[index % colors.length],
      stroke: "#041C06",
    });
  });
  let sortedCompanies = top5Companies.sort((a, b) => (a.y > b.y ? -1 : 1));
  sortedCompanies.splice(companiesToShow, sortedCompanies.length);
  return top5Companies;
};

const getCompanyProfit = (invoices, company) => {
  let revenue = 0;
  let companyInvoices = getInvoicesList(invoices, company.id, "company");
  companyInvoices.forEach((invoiceInfo) => {
    if (invoiceInfo.hasPaid)
      revenue += getInvoiceTotal(invoices, invoiceInfo.id);
  });
  return revenue;
};

export const getSellersInvoices = (invoices, sellerIds) => {
  return sellerIds.map((ele) => {
    return {
      id: ele,
      invoicesMade: getSellerInvoices(invoices, ele),
    };
  });
};

export const getSellerInvoices = (invoices, sellerId) => {
  const sellerInvoices = invoices.filter((ele) => {
    return parseInt(ele.seller) === parseInt(sellerId);
  });
  return sellerInvoices;
};

export const generateIdNumber = (listOfThings) => {
  let idNumber = getRandomInt(max, min);
  let isUnique = listOfThings.findIndex((ele) => parseInt(ele.id) === idNumber);
  while (isUnique !== -1) idNumber = getRandomInt(max, min);
  isUnique = listOfThings.findIndex((ele) => parseInt(ele.id) === idNumber);
  return idNumber;
};

// export const calculateNewInventoryQuantity = (invoices, invoiceI)

const fetchAllInfoForInvoice = (state, id) => {
  const invoice = getInvoiceWithId(id, state.invoice.invoices);

  if (!invoice) {
    return {
      id,
      taxRate: 0,
      date: new Date(),
      seller: {},
      companyInfo: {},
      data: [],
      hasPaid: false,
      doesNotExist: true,
    };
  }
  const { seller, company, taxRate, items, date, hasPaid } = invoice;

  const invoiceData = {
    date: new Date(date),
    seller: getSellerWithId(seller, state.seller.sellers),
    companyInfo: getCompanyWithId(company, state.company.company),
    data: itemsInvoiceFormatted(items, state.inventory.inventory),
  };

  const keys = Object.keys(invoiceData);
  let pass = true;
  keys.forEach((ele) => {
    if (!invoiceData[ele]) pass = false;
  });
  invoiceData.doesNotExist = !pass;
  return {
    id,
    taxRate,
    hasPaid,
    ...invoiceData,
  };
};

const getInvoiceTotal = (invoices, id) => {
  const invoiceInfo = getInvoiceWithId(id, invoices);
  let total = 0;
  let tax = 0;
  if (!invoiceInfo) return -1;
  invoiceInfo.items.forEach((a) => {
    total += a.price * a.quantity;
  });
  tax = +(total * (invoiceInfo.taxRate / 100)).toFixed(2);
  total = +(tax + total).toFixed(2);
  return total;
};

const getInvoicesList = (
  invoices,
  id = null,
  type = null,
  filterUnpaid = false
) => {
  // const {company, invoice} = state
  let invoiceList = [];
  if (!id || !type) {
    invoices.forEach((ele) => {
      if (ele.hasPaid && filterUnpaid) return;
      let total = getInvoiceTotal(invoices, ele.id);
      invoiceList.push({
        ...ele,
        total,
      });
    });
    return invoiceList;
  }

  invoices.forEach((ele) => {
    if (ele.hasPaid && filterUnpaid) return;
    if (ele[type].toString() === id.toString()) {
      let total = getInvoiceTotal(invoices, ele.id);
      invoiceList.push({
        ...ele,
        total,
      });
    }
  });
  return invoiceList;
};

const itemsInvoiceFormatted = (items, itemList) => {
  return items.map((ele) => {
    const tempInfo = getItemWithId(ele.id, itemList);
    return tempInfo
      ? {
          ...ele,
          description: tempInfo.description,
        }
      : {
          ...ele,
          description: "Loading",
        };
  });
  // {
  //   // id, description, quantity, price
  // }
};

const generateInventoryDropdownCategories = (inventory, attributes) => {
  // for every attribute, find all the values in the inventory (list them only once)
  const listOfItems = {};
  const attributeItems = Object.keys(attributes);
  inventory.forEach((a) => {
    attributeItems.forEach((b) => {
      if (!listOfItems[b]) {
        listOfItems[b] = [];
        listOfItems[b].push(a[b]);
      } else {
        let index = listOfItems[b].findIndex((ele) => ele == a[b]);
        if (index === -1) listOfItems[b].push(a[b]);
      }
    });
  });
};

const generatePrepulateEditInvoiceInfo = (invoices, invoiceId) => {

  let currInvoice = getInvoiceWithId(invoiceId, invoices)
  if (currInvoice === undefined) return currInvoice

  return {
    items: currInvoice.withInfo.items.map((ele) => {
      return {
        item: ele,
        quantity: ele.quantity,
        price: ele.price
      }
    }),
    invoiceInfo: {
      company: currInvoice.withInfo.company,
      po: currInvoice.po,
      seller: currInvoice.withInfo.seller,
      taxRate: currInvoice.taxRate,
      date: new Date(currInvoice.date),
      dateVal: currInvoice.date
    }
  }
}

const getItemWithId = (id, itemList) => {
  return itemList.find((ele) => parseInt(ele.id) === parseInt(id));
};

const getInvoiceWithId = (id, invoiceList) => {
  return invoiceList.find((ele) => parseInt(ele.id) === parseInt(id));
};

const getSellerWithId = (id, sellerList) => {
  return sellerList.find((ele) => parseInt(ele.id) === parseInt(id));
};

const getCompanyWithId = (id, companyList) => {
  return companyList.find((ele) => parseInt(ele.id) === parseInt(id));
};

const getRandomInt = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export {
  generatePrepulateEditInvoiceInfo,
  generateInventoryDropdownCategories,
  getInvoicesList,
  generateInvoiceNumber,
  getRandomInt,
  fetchAllInfoForInvoice,
  getInvoiceWithId,
};
