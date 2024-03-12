import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  student: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    clearStudent: (state) => {
      state.student = null;
    },
  },
});

export const { setStudent, clearStudent } = studentSlice.actions;
export const selectStudent = (state) => state.student.student;

export const updateProfile = (profileData) => (dispatch) => {
  // Update Redux store with the new mentor data
  dispatch(setMentor(profileData));
};
export default studentSlice.reducer;
