import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosIntance from '../../Config/axiosInstance';

const initialState= {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false , 
    username: localStorage.getItem('username') || false , 
    role: localStorage.getItem('role') || false , 
    email: localStorage.getItem('email') || false,
    token: localStorage.getItem('token') || false,
};

export const register = createAsyncThunk('auth/signup', async(data) => {
        try {

            const response = axiosIntance.post('/signup',data);
            toast.promise(response, {
                loading: 'Registering...',
                success: 'Successfull Registered',
                error: 'Registered Failed '
            })
            const result = await response;
            // console.log('status => ', result.status);

            if(result.status == 200 ) return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Registration failed');
           
        }
})


export const login = createAsyncThunk('auth/login', async(data) => {
        try {

            const response = axiosIntance.post('/login',data);
            toast.promise(response, {
                loading: 'Logining...',
                success: 'Successfull Login',
                error: 'Login Failed '
            })
            const result = await response;
            
            if(result.status == 200 ) return result;
          

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || 'Login failed');
            
        }
})




const authSlice = createSlice({
    name: 'authSlicer',
     initialState,
    reducers: {
        logoutUser: (state) => {
            state.email = '';
            state.token = '';
            state.isLoggedIn = false; 
            state.role = '';
            state.username = '';
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
    builder 
        .addCase(login.fulfilled, (state,action) => {
            if(action?.payload?.data){
                const data = action?.payload?.data?.data;
                state.email = data.email;
                state.token = data.jwt;
                state.isLoggedIn = true; 
                state.role = data.role;
                state.username = data?.username | data?.email;

                localStorage.setItem('isLoggedIn',true);
                localStorage.setItem('role', data.role)
                localStorage.setItem('token', data.jwt)
            }
        })
        
}
   
});


export const {logoutUser} = authSlice.actions;
export default authSlice.reducer;
