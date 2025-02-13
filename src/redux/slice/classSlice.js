import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  class: null,
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    addClass: (state, action) => {
      state.class = action.payload;
    }
  },
});

export const GetAllClasss = () => {
  return async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/getAllClass`);
     dispatch(addClass(response.data));
  };
};

export const {addClass} = classSlice.actions;
export default classSlice.reducer;