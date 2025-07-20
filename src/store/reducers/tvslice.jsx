import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    loadtv: (state, action) => {
      state.info = action.payload;
    },
    removetv: (state) => {
      state.info = null;
    },
  },
});

// Action creators generated from reducers
export const { loadtv, removetv } = tvSlice.actions;

export default tvSlice.reducer;
