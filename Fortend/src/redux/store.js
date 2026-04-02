import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../redux/Slices/AuthSlice';
import favoriteSliceReducer from '../redux/Slices/favoriteSlice';
import propertySliceReducer from '../redux/Slices/propertySlice';


export default configureStore({
    reducer:{
        auth: authSliceReducer,
        property: propertySliceReducer,
        favorite: favoriteSliceReducer,
    },
      
    devTools: true,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})