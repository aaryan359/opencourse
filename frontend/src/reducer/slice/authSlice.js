import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
             
         sighnupData: localStorage.getItem('signupData') ? JSON.parse(localStorage.getItem('signupData')) : null,

         loading:false,
         token: Cookies.get('accessToken') || null,

}


const authSlice  = createSlice({
          
    name: 'auth',
    initialState,

    reducers:{
             
                 setSignupData(state,action){

                         state.sighnupData = action.payload;
                 },

                 setLoading(state,action){
                    
                     state.loading = action.payload;
                 },

                 setToken(state,action){ 
                    state.token = action.payload;
                 },
                 logout(state) {
                    state.token = null; // Clear the token from Redux state
                    Cookies.remove('accessToken'); // Optional: Remove the token cookie on logout
                    Cookies.remove('refreshToken'); // Clear refresh token if applicable

                    localStorage.removeItem('signupData')


                  },
    }
}) ;

export const {  setSignupData,setLoading,setToken,logout}= authSlice.actions;
export default authSlice.reducer;