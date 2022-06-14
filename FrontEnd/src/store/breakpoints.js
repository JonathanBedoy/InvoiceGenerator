import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  xs: false,
  sm: false,
  md: true,
  lg: false,
  xl: false,
  xxl: false,
  currentBreakpoint: "md",
};

const BreakpointSlice = createSlice({
  name: "breakpoints",
  initialState,
  reducers: {
    setBreakpoint(state, { payload }) {
      const { width } = payload;
      let newBreakpoint = state.currentBreakpoint;
      if (width < 576) {
        newBreakpoint = "xs";
      } else if (width >= 576 && width < 768) {
        newBreakpoint = "sm";
      } else if (width >= 768 && width < 992) {
        newBreakpoint = "md";
      } else if (width >= 992 && width < 1200) {
        newBreakpoint = "lg";
      } else if (width >= 1200 && width < 1440) {
        newBreakpoint = "xl";
      } else if (width >= 1440) {
        newBreakpoint = "xxl";
      }
      state[state.currentBreakpoint] = false;
      state[newBreakpoint] = true;
      state.currentBreakpoint = newBreakpoint;
    },
  },
});

export const BreakpointActions = BreakpointSlice.actions;
export default BreakpointSlice;
