import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosIntance from '../../Config/axiosInstance';



const initialState= {
    PropertyList: []

};

export const FavoriteGetAll = createAsyncThunk('Favorite/getall', async() => {
        try {
            const response = axiosIntance.get(`/favorite`, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            toast.promise(response, {
                loading: 'Loading Favorite...',
                success: 'Sucessfully Loaded Favorite',
                error: 'Failed to Load Favorite '
            }) 
            const result = await response;
            return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || ' Failed');
           
        }
})

export const AddedToFavorite = createAsyncThunk('Favorite/added', async(id) => {
        try {
            const response = axiosIntance.post(`/favorite/${id}`, {}, {
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
            toast.error(error?.response?.data?.err || error?.response?.data?.message || '  Failed');
           
        }
}) 

export const RemovedFavorite = createAsyncThunk('Favorite/remvoed', async(id) => {
        try {
            const response = axiosIntance.delete(`/favorite/${id}`,  {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            toast.promise(response, {
                loading: 'Removing  From Favorite...',
                success: 'Sucessfully Removed  From Favorite',
                error: 'Failed to Removing From Favorite '
            }) 
            const result = await response;
            return result;
          
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.err || error?.response?.data?.message || '  Failed');
           
        }
})




const FavoriteSlice = createSlice({
    name: 'PropertySlicer',
     initialState,
    extraReducers: (builder) => { 
            builder
            .addCase(FavoriteGetAll.fulfilled, (state,action) => {
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data; 
                    state.PropertyList = data;                     
                }
            })


            .addCase(AddedToFavorite.fulfilled, (state,action) => {
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data; 
                    // console.log("data => ", data)
                }
            })
            
            .addCase(RemovedFavorite.fulfilled, (state,action) => {
                if(action?.payload?.data){
                    const data = action?.payload?.data?.data; 
                    // console.log("data => ", state.)
                }
            })

        }

    
});


export default FavoriteSlice.reducer;
