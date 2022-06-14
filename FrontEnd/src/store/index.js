import { configureStore } from "@reduxjs/toolkit";
import companySlice from "./companiesSlice";
import invoiceSlice from './invoiceSlice'
import inventorySlice from './inventorySlice'
import sellerSlice from "./sellerSlice";
import BreakpointSlice from "./breakpoints";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer,
    company: companySlice.reducer,
    invoice: invoiceSlice.reducer,
    seller: sellerSlice.reducer,
    breakpoint: BreakpointSlice.reducer,
    user: userSlice.reducer,
  }
})


export default store;