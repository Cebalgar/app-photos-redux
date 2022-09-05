import { configureStore } from "@reduxjs/toolkit";

//reducers
import photosReducer from "../features/photos/photosSlice";
import favouritesReducer from "../features/favourites/favouritesSlice";




export default configureStore({
    reducer:{
        photos: photosReducer,
        favourites: favouritesReducer,
    }
})