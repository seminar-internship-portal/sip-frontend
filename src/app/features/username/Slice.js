// slice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

// Update profile action creator
export const updateProfile = (profileData) => async (dispatch) => {
  try {
    console.log(profileData);
    // const response = await axios.put(
    //   "https://sip-backend-api.onrender.com/api/v1/mentor/updateAccountDetails",
    //   profileData
    // );
    dispatch(setMentor(profileData));
    // Optionally, you can dispatch additional actions based on success
  } catch (error) {
    // Handle errors or dispatch additional actions based on failure
    console.error("Error updating profile:", error);
  }

  // Explicitly return dispatch to resolve type error
  return dispatch;
};

export default mentorSlice.reducer;
