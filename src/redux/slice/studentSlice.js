import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  student: null,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.student = action.payload;
    }
  },
});

export const GetAllStudents = () => {
  const role = localStorage.getItem('role')
  return async (dispatch) => {
    if (role) {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/getAllStudents`);

      dispatch(addStudent(response.data));
    }
  };
};

export const {addStudent} = studentSlice.actions;
export default studentSlice.reducer;