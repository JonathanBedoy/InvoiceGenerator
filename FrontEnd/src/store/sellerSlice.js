import { createSlice } from "@reduxjs/toolkit";
import { generateIdNumber } from "./InvoiceFunctions/InvoiceFunctions";

const initialState = {
  sellers: [
    
  ],
  attributesNeeded: {
    name: '',
    city: '',
    street: '',
    zipCode: 'number',
    state: '',
    phone: 'number'
  },
  hasBeenFetched: false
}

const sellerSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setHasBeenFetched(state, {payload}) {
      const {val =true} = payload
      state.hasBeenFetched = val
    },
    setSellerState(state, { payload }) {
      const { sellers = [
        {
          id: 1231231,
          name: 'Default User',
          city: 'Fullerton',
          street: '123 Coole ave.',
          zipCode: '98423',
          state: 'Ca',
          phone: 6571234567
        }
      ] } = payload
      state.sellers = sellers
      state.hasBeenFetched = true
    },
    addSeller(currState, { payload }) {
      const { name = '',
        city = '',
        street = '',
        zipCode = '',
        state = '',
        phone = '',
        id = generateIdNumber(currState.sellers)
      } = payload
      currState.sellers.push({
        name,
        city,
        street,
        zipCode,
        state,
        phone,
        id
      })
    },
    editSeller(currState, {payload}) {
      const { id } = payload
      const index = currState.sellers.findIndex(ele => ele.id === parseInt(id))
      if (index !== -1)
      currState.sellers[index] = {
          ...currState.sellers[index],
          ...payload
        }

    },
    removeSeller(state, action) {
      const { attributeLabel = '', attributeValue = '', id = null } = action.payload
      if (id !== null) {
        let index = state.sellers.findIndex(ele => ele.id.toString() === id.toString())
        state.sellers.splice(index, 1)
        return
      }

      let attributeValueFormatted = attributeValue

      let index = state.sellers.findIndex(ele => {
        return ele[attributeLabel] == attributeValueFormatted
      })
      // in case there are more than one
      while (index !== -1) {
        state.sellers.splice(index, 1)
        index = state.sellers.findIndex(ele => ele[attributeLabel] == attributeValueFormatted)
      }
    },
  }
});

// const getSellerData = () => {
//   return async (dispatch) => {
//     dispatch()
//   }
// }

export const SellerActions = sellerSlice.actions

export default sellerSlice;