import { combineReducers } from "@reduxjs/toolkit";
import authReducer from  "../reducer/slice/authSlice"

const rootreducer = combineReducers({
               
     auth:authReducer,
})

export default rootreducer;