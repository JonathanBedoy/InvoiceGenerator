import { SellerActions } from "../sellerSlice";
import { InvoiceActions } from "../invoiceSlice";
import { InventoryActions } from "../inventorySlice";
import { CompanyActions } from "../companiesSlice";
import store from "..";

import axios from "axios";

import {
  generateIdNumber,
  generateInvoiceNumber,
} from "../InvoiceFunctions/InvoiceFunctions";
import { UserActions } from "../userSlice";

// axios.defaults.withCredentials = true
const instance = axios.create({
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: process.env.REACT_APP_DEV_ENVIRONMENT === 'true' ? process.env.REACT_APP_LOGIN_ENDPOINT_DEV: process.env.REACT_APP_LOGIN_ENDPOINT,
});

export const login = (user, pass) => {
  return async (dispatch) => {
    dispatch(UserActions.setLogginIn({loggingIn: true}))
    const postLogin = async () => {
      try {
        const response = await instance.post("/login",{user:user, pass:pass});
        if (response.data.data.userName && response.data.data.userId)
          dispatch(UserActions.setUserState({userName: response.data.data.userName, userId: response.data.data.userId}))
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    let data = await postLogin();
    dispatch(UserActions.setLogginIn({loggingIn: false}))
    // console.log(data.data);
  };
};
export const checkIfLoggedIn = () => {
  return async (dispatch) => {
    dispatch(UserActions.setLogginIn({loggingIn: true}))
    const postLogin = async () => {
      try {
        const response = await instance.get("/loginstatus");
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    let data = await postLogin();
    if (data && data.data.userId && data.data.userName) {
      dispatch(UserActions.setUserState({userName: data.data.userName, userId: data.data.userId}))
    }
    dispatch(UserActions.setLogginIn({loggingIn: false}))
    // console.log(data.data);
  };
};



export const populateStore = () => {
  let userInfo = store.getState().user
  console.log(userInfo)
  return async (dispatch) => {
    const getStoreData = async () => {
      try {
        const response = await instance.get(
          "/items/"+userInfo.userId
        );
        // console.log(response.data);
        dispatch(
          SellerActions.setSellerState({ sellers: response.data.seller })
        );
        dispatch(
          InventoryActions.setInventoryState({
            inventory: response.data.inventory,
          })
        );
        dispatch(
          CompanyActions.setCompanyState({ company: response.data.company })
        );
        dispatch(
          InvoiceActions.setInvoiceState({ invoices: response.data.invoice })
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    // let data = await getStoreData();
    await getStoreData();
    dispatch(SellerActions.setHasBeenFetched({}));
    dispatch(InventoryActions.setHasBeenFetched({}));
    dispatch(CompanyActions.setHasBeenFetched({}));
    dispatch(InvoiceActions.setHasBeenFetched({}));

    // console.log(data);
  };
};

export const updateInvoiceStatus = (invoiceStatus, invoiceId) => {
  let userInfo = store.getState().user
  return async (dispatch) => {
    const postUpdateInvoiceStatus = async () => {
      try {
        const response = await instance.patch("/updateInvoiceStatus/"+userInfo.userId,
          { id: invoiceId, status: invoiceStatus }
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    postUpdateInvoiceStatus();
    // so that it will work in offline mode
    dispatch(
      InvoiceActions.markPaid({ id: invoiceId, hasPaid: invoiceStatus })
    );
  };
};

export const editSomethingsOnDb = (newDoc, typeOfThing) => {
  let userInfo = store.getState().user

  // newDoc should have the attributes that need to be updated, along with the value
  // {id: 2, hasPaid: true} dont need the rest of the doc just whatever needs to be changed
  // NEEDS ID NO MATTER WHAT

  return async (dispatch) => {
    const updateSomethingOnDB = async () => {
      try {
        const response = await instance.patch("/updateDoc/"+userInfo.userId,
          { ...newDoc, dbType: typeOfThing }
        );
        console.log(response);
        // return response.data
      } catch (error) {
        console.error(error);
      }
    };
    updateSomethingOnDB();
    // so that it will work in offline mode
    // dispatch(CompanyActions.addToCompany(newCompanyData))
    switch (typeOfThing) {
      case "invoice":
        break;
      case "inventory":
        dispatch(InventoryActions.editInventoryItem({ ...newDoc }));
        break;
      case "company":
        dispatch(CompanyActions.editCompany({ ...newDoc }));
        break;
      case "seller":
        dispatch(SellerActions.editSeller({ ...newDoc }));
        break;

      default:
        break;
    }
  };
};

export const removeSomethingsOnDbWithID = (newDoc, typeOfThing) => {
  let userInfo = store.getState().user

  // newDoc should have {attributeLabel, attributeValue, attributeValueType}
  console.log(newDoc, typeOfThing);
  return async (dispatch) => {
    const updateSomethingOnDB = async () => {
      try {
        const response = await instance.delete("/removeDocs/"+userInfo.userId,
          { data: { ...newDoc, dbType: typeOfThing } }
        );
        console.log(response);
        // return response.data
      } catch (error) {
        console.error(error);
      }
    };
    updateSomethingOnDB();
    // so that it will work in offline mode
    // dispatch(CompanyActions.addToCompany(newCompanyData))
    switch (typeOfThing) {
      case "invoice":
        dispatch(InvoiceActions.removeInvoice({ ...newDoc }));
        break;
      case "inventory":
        dispatch(InventoryActions.removeInventory({ ...newDoc }));
        break;
      case "company":
        dispatch(CompanyActions.removeCompany({ ...newDoc }));
        // dispatch(removeSomethingsOnDbWithID({attributeLabel: 'company', attributeValue: newDoc.attributeValue, attributeValueType: 'number'}, 'invoice'))
        // remove all invoices associated with company, THIS ASSUMES THAT THE attributeValue PASSED IN IS COMPANY_ID
        break;
      case "seller":
        dispatch(SellerActions.removeSeller({ ...newDoc }));
        break;

      default:
        break;
    }
  };
};

export const addCompany = (newCompany, companies) => {
  const {
    city = "",
    street = "",
    zipCode = "",
    state = "",
    phone = "5555555555",
    name = "",
    description = "",
  } = newCompany;
  const id = generateIdNumber(companies);
  const newCompanyData = {
    name,
    city,
    street,
    zipCode,
    state,
    description,
    phone,
    id,
  };
  console.log(newCompanyData);
  return async (dispatch) => {
    let userInfo = store.getState().user

    const postCompanyData = async () => {
      try {
        const response = await instance.put(
          "/addCompany/"+userInfo.userId,
          newCompanyData
        );
        console.log(response);
        // return response.data
      } catch (error) {
        console.error(error);
      }
    };
    postCompanyData();
    // so that it will work in offline mode
    dispatch(CompanyActions.addToCompany(newCompanyData));
  };
};

export const addInvoice = (newInvoice, invoices, edit) => {
  let userInfo = store.getState().user

  const {
    seller = "",
    company = "",
    taxRate = 0,
    items = [],
    po = '',
    id = generateInvoiceNumber(invoices),
    dateVal = "2020-05-31",
    hasPaid = false,
    withInfo = {},
  } = newInvoice;
  const newInvoiceData = {
    seller,
    company,
    taxRate,
    items,
    po,
    id,
    date: dateVal,
    hasPaid,
    withInfo,
    updateInventory: true,
  };
  console.log('newdata is this',newInvoiceData);
  return async (dispatch) => {
    const postInvoiceData = async () => {
      try {
        const response = await instance.put("/addInvoice/"+userInfo.userId,
          newInvoiceData
        );
        console.log(response);
        // return response.data
      } catch (error) {
        console.error(error);
      }
    };
    const updateInventoryQuantity = async (items) => {
      try {
        const response = await instance.patch("/updateInventoryQuantities/"+userInfo.userId,
          items
        );
        console.log(response);
        // return response.data
      } catch (error) {
        console.error(error);
      }
    };
    postInvoiceData();

    let itemFormatted = [];
    newInvoiceData.items.forEach((element) => {
      itemFormatted.push({ id: element.id, offset: -1 * element.quantity });
      dispatch(
        InventoryActions.updateQuantity({
          id: element.id,
          offset: -1 * element.quantity,
        })
      );
    });
    updateInventoryQuantity(itemFormatted);
    // so that it will work in offline mode
    if (edit) {
      dispatch(InvoiceActions.editInvoice(newInvoiceData));
    }
    else dispatch(InvoiceActions.makeInvoice(newInvoiceData));
  };
};

export const addInventory = (newItem, items) => {
  let userInfo = store.getState().user

  const {
    type = "",
    brand = "",
    quantity = 0,
    name = "",
    description = "",
    id = generateIdNumber(items),
  } = newItem;
  const newItemData = { type, brand, quantity, name, description, id };

  return async (dispatch) => {
    const postInventoryData = async () => {
      try {
        const response = await instance.put( "/addInventory/"+userInfo.userId,
          newItemData
        );
        console.log(response);
        // return response.data
      } catch (error) {
        console.error(error);
      }
    };
    postInventoryData();
    // so that it will work in offline mode
    dispatch(InventoryActions.addToInventory(newItemData));
  };
};

export const addSeller = (newSeller, sellers) => {
  let userInfo = store.getState().user

  const {
    name = "",
    city = "",
    street = "",
    zipCode = "",
    state = "",
    phone = "",
    id = generateIdNumber(sellers),
  } = newSeller;
  const newSellerData = {
    name,
    city,
    street,
    zipCode,
    state,
    phone,
    id,
  };

  console.log(newSellerData);

  return async (dispatch) => {
    const postSellerData = async () => {
      try {
        const response = await instance.put("/addSeller/"+userInfo.userId,
          newSellerData
        );
        console.log(response);
        // return response.data
      } catch (error) {
        console.error(error);
      }
    };
    postSellerData();
    // so that it will work in offline mode
    dispatch(SellerActions.addSeller(newSellerData));
  };
};
