import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mentor: null,
};

const mentorSlice = createSlice({
  name: "mentor",
  initialState,
  reducers: {
    setMentor: (state, action) => {
      console.log(action.payload);
      state.mentor = action.payload;
    },
    clearMentor: (state) => {
      state.mentor = null;
    },
  },
});

export const { setMentor, clearMentor } = mentorSlice.actions;
export const selectMentor = (state) => state.mentor.mentor;

export const updateProfile = (profileData) => (dispatch) => {
  // Update Redux store with the new mentor data
  dispatch(setMentor(profileData));
};

export default mentorSlice.reducer;
