import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'
import studentReducer from '../slice/studentSlice';
import teacherReducer from '../slice/teacherSlice';
import classReducer from '../slice/classSlice';
import sectionReducer from '../slice/sectionSlice';
import parentReducer from '../slice/parentSlice';

export const store = configureStore({
    reducer:{
        userInfo:userReducer,
        studentInfo:studentReducer,
        teacherInfo:teacherReducer,
        classInfo:classReducer,
        sectionInfo:sectionReducer,
        parentInfo:parentReducer
    }
})

export default store;