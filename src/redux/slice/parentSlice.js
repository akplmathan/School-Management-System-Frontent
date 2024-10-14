import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  parent: null,
};

export const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    addParent: (state, action) => {
      state.parent = action.payload;
    }
  },
});

export const GetAllParents = () => {
  const role = localStorage.getItem('role')
  return async (dispatch) => {
    if (role) {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/getAllParent`);

      dispatch(addParent(response.data));
    }
  };
};

export const {addParent} = parentSlice.actions;
export default parentSlice.reducer;