import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../redux/Slices/AuthSlice';
import propertySliceReducer from '../redux/Slices/propertySlice';


export default configureStore({
    reducer:{
        auth: authSliceReducer,
        property: propertySliceReducer,
    },
      
    devTools: true,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})