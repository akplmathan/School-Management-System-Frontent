import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  section: null,
};

export const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    addSection: (state, action) => {
      state.section = action.payload;
    }
  },
});

export const GetAllSections = () => {
  const role = localStorage.getItem('role')
  return async (dispatch) => {
    if (role) {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/getAllSection`);

      dispatch(addSection(response.data));
    }
  };
};

export const {addSection} = sectionSlice.actions;
export default sectionSlice.reducer;