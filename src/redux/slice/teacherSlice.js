import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  teacher: null,
};

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    addTeacher: (state, action) => {
      state.teacher = action.payload;
    }
  },
});

export const GetAllTeachers = () => {
  const role = localStorage.getItem('role')
  return async (dispatch) => {
    if (role) {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/getAllTeachers`);

      dispatch(addTeacher(response.data));
    }
  };
};

export const {addTeacher} = teacherSlice.actions;
export default teacherSlice.reducer;