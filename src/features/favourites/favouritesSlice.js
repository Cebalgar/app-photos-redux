import { createSlice } from "@reduxjs/toolkit"; 

const initialState = [
    {id:"1", title: "photo1"},
    {id: "2", title: "photo2"}
]

const favouriteSlice = createSlice({
    name: "favouritePhoto",
    initialState,
    reducers:{}

})

export default favouriteSlice.reducer