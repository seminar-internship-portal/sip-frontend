import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  admin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    clearAdmin: (state) => {
      state.admin = null;
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export const selectAdmin = (state) => state.admin.admin;

export default adminSlice.reducer;
