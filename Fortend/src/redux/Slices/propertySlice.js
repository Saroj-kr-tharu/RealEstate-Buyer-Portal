import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosIntance from '../../Config/axiosInstance';



const initialState= {
    PropertyList: [],
    AgentPropertyList:[]

};

export const PropertyGetAll = createAsyncThunk('Property/getall', async() => {
        try {
            
            const response = axiosIntance.get('/property');
            toast.promise(response, {
                loading: 'Loading Property...',
                success: 'Sucessfully Loaded Property',
                error: 'Failed to Load Property '
            }) 
            const result = await response;
            return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || ' Failed');
           
        }
})

export const PropertyGetById = createAsyncThunk('Property/getById', async(data) => {
        try {
            const response = axiosIntance.get(`/property/${data}`);
            toast.promise(response, {
                loading: 'Loading Property...',
                success: 'Sucessfully Loaded Property',
                error: 'Failed to Load Property '
            }) 
            const result = await response;
            return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || '  Failed');
           
        }
})

export const PropertyGetAllByAgent = createAsyncThunk('Property/getallAgent', async() => {
        try {
            const response = axiosIntance.get(`/propertyAgent`,  {
                            headers: {
                                'x-access-token': localStorage.getItem('token')
                            }
                        });
            
            toast.promise(response, {
                loading: 'Loading Property...',
                success: 'Sucessfully Loaded Property',
                error: 'Failed to Load Property '
            }) 
            const result = await response;
            return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || ' Failed');
           
        }
})




const PropertySlice = createSlice({
    name: 'PropertySlicer',
     initialState,
    extraReducers: (builder) => { 
            builder
            .addCase(PropertyGetAll.fulfilled, (state,action) => {
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data; 
                    state.PropertyList = data;
                    // console.log("data => ", data )
                }
            })


            .addCase(PropertyGetById.fulfilled, (state,action) => {
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data; 
                    console.log("data => ", data)
                }
            })
            
            .addCase(PropertyGetAllByAgent.fulfilled, (state,action) => {
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data; 
                    console.log("data => ", data)
                    state.AgentPropertyList = data ; 
                }
            })

        }

    
});


export default PropertySlice.reducer;
