import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosIntance from '../../Config/axiosInstance';



const initialState= {
    PropertyList: [],
    AgentPropertyList:[]

};

export const PropertyCreate = createAsyncThunk('Property/create', async(data) => {
        try {
            const response = axiosIntance.post('/property', data , {
                            headers: {
                                'x-access-token': localStorage.getItem('token')
                            }
                        });
            toast.promise(response, {
                loading: 'Creating Property...',
                success: 'Sucessfully Created Property',
                error: 'Failed to Created Property '
            }) 
            const result = await response;
            return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || ' Failed');
           
        }
})

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

export const PropertyDeleteByAgent = createAsyncThunk('Property/deleteAgent', async(id) => {
        try {
            const response = axiosIntance.delete(`/property/${id}`,  {
                            headers: {
                                'x-access-token': localStorage.getItem('token')
                            }
                        });
            
            toast.promise(response, {
                loading: 'Deleting Property...',
                success: 'Sucessfully Deleted Property',
                error: 'Failed to Deleted Property '
            }) 
            const result = await response;
            return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || ' Failed');
           
        }
})

export const PropertyUpdateByAgent = createAsyncThunk('Property/updateAgent', async(data ) => {
        try {
            console.log('data => ', data ,"id => ", data.id )
            const response = axiosIntance.patch(`/property/${data.id}`, data, {
                            headers: {
                                'x-access-token': localStorage.getItem('token')
                            }
                        });
            
            toast.promise(response, {
                loading: 'Updating Property...',
                success: 'Sucessfully Updated Property',
                error: 'Failed to Updated Property '
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
            .addCase(PropertyCreate.fulfilled, (state,action) => {
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data; 
                    console.log("data create  => ", data)
                }
            })
            
            .addCase(PropertyDeleteByAgent.fulfilled, (state,action) => {
                console.log("action", action?.meta?.arg)
                if(action?.payload?.data){
                   let arry=[];

                    state.AgentPropertyList.map( (item) => {
                        if(item.id != action?.meta?.arg) 
                            arry.push(item)
                    } )
                    state.AgentPropertyList= arry; 
                }
            })
        }

    
});


export default PropertySlice.reducer;
