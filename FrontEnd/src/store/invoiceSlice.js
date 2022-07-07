import { createSlice } from "@reduxjs/toolkit";
import { generateInvoiceNumber } from "./InvoiceFunctions/InvoiceFunctions";

const initialState = {
  invoices: [
    // {
    //   id: 2, // invoice #
    //   seller: 1231231, // id of seller
    //   company: '65432475', // id of company
    //   taxRate: 10, // taxRate in %
    //   date: '2020-05-31',
    //   hasPaid: false,
    //   items: [
    //     {
    //       id: 1, // id of item in inventory
    //       quantity: 4, // quantity being sold
    //       price: 21.21 // price per item
    //     },
    //     {
    //       id: 2, // id of item in inventory
    //       quantity: 10, // quantity being sold
    //       price: 61.59 // price per item
    //     }
    //   ],
    //   withInfo:{
    //     seller: 1231231, // id of seller
    //     company: '65432475', // id of company
    //     taxRate: 10, // taxRate in %
    //     po: '',
    //     date: '2020-05-31',
    //     hasPaid: false,
    //     items: [
    //       {
    //         id: 1, // id of item in inventory
    //         quantity: 4, // quantity being sold
    //         price: 21.21 // price per item
    //       },
    //       {
    //         id: 2, // id of item in inventory
    //         quantity: 10, // quantity being sold
    //         price: 61.59 // price per item
    //       }
    //     ],
    //   }
    // },
    // {
    //   id: 3, // invoice #
    //   seller: 1231231, // id of seller
    //   company: '65432475', // id of company
    //   taxRate: 10, // taxRate in %
    //   date: '2022-05-31',
    //   hasPaid: true,
    //   items: [
    //     {
    //       id: 1, // id of item in inventory
    //       quantity: 2, // quantity being sold
    //       price: 4.21 // price per item
    //     },
    //     {
    //       id: 2, // id of item in inventory
    //       quantity: 3, // quantity being sold
    //       price: 12.23 // price per item
    //     }
    //   ]
    // }
  ],
  hasBeenFetched: false
}

const invoiceSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    editInvoice(state, action) {
      const { payload } = action
      const { seller = '',
        company = '',
        po = '',
        taxRate = 0,
        items = [],
        id = generateInvoiceNumber(state.invoices),
        date = '2020-05-31',
        hasPaid = false,
        withInfo = {}
      } = payload

      let index = state.invoices.findIndex(ele => {
        return parseInt(ele['id']) === parseInt(id)
      })
      if (index !== -1)  state.invoices.splice(index, 1)
      // console.log('editing', index)
      // Math.floor(Math.random() * 100000000000000000)
      state.invoices.push({ seller, po, company, taxRate, items, id, date, hasPaid, withInfo })
      // if (payload.cb) {
      // cb(id)
      // }
    },
    setHasBeenFetched(state, {payload}) {
      const {val =true} = payload
      state.hasBeenFetched = val
    },
    makeInvoice(state, action) {
      const { payload } = action
      const { seller = '',
        company = '',
        po = '',
        taxRate = 0,
        items = [],
        id = generateInvoiceNumber(state.invoices),
        date = '2020-05-31',
        hasPaid = false,
        withInfo = {}
      } = payload
      // Math.floor(Math.random() * 100000000000000000)
      state.invoices.push({ seller, po, company, taxRate, items, id, date, hasPaid, withInfo })
      // if (payload.cb) {
      // cb(id)
      // }
    },
    removeInvoice(state, action) {
      const { attributeLabel = '', attributeValue = '', id = null } = action.payload
      if (id !== null) {
        let index = state.invoices.findIndex(ele => ele.id.toString() === id.toString())
        state.invoices.splice(index, 1)
        return
      }

      let attributeValueFormatted = attributeValue
      // if (attributeValueType === 'number') attributeValueFormatted = parseInt(attributeValueFormatted)
      // if (attributeValueType === 'string') attributeValueFormatted = attributeValueFormatted.toString()

      let index = state.invoices.findIndex(ele => {
        return ele[attributeLabel] == attributeValueFormatted
      })
      // in case there are more than one
      while (index !== -1) {
        state.invoices.splice(index, 1)
        index = state.invoices.findIndex(ele => ele[attributeLabel] == attributeValueFormatted)
      }
    },
    markPaid(state, action) {
      const { id, hasPaid = true } = action.payload
      let index = state.invoices.findIndex(a => a.id.toString() === id.toString())
      if (index !== -1)
        state.invoices[index].hasPaid = hasPaid
    },
    setInvoiceState(state, { payload }) {
      const { invoices = [{
        id: 321322, // invoice #
        seller: 1231231, // id of seller
        company: '65432475', // id of company
        taxRate: 10, // taxRate in %
        date: '2020-05-31',
        hasPaid: false,
        items: [
          {
            id: 1, // id of item in inventory
            quantity: 4, // quantity being sold
            price: 21.21 // price per item
          },
          {
            id: 2, // id of item in inventory
            quantity: 10, // quantity being sold
            price: 61.59 // price per item
          }
        ]
      }] } = payload
      state.invoices = invoices
      state.hasBeenFetched = true
    }
  }
});

export const InvoiceActions = invoiceSlice.actions

export default invoiceSlice;