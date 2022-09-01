import { createSlice, createAsyncThunk, current} from "@reduxjs/toolkit"; 
import axios from "axios";


const URL= 'https://api.unsplash.com/search/photos';

const apiKey= 'fap9RiTBIkGKtr3KREf858iXt2RSjFG4NKm6XVdz0Tk';




export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async(query)=>{
    const response = await axios.get(`${URL}?query=${query}&client_id=${apiKey}&per_page=10`);
    return response.results
})

const initialState= {
    photos: [],
}


const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers:{},
    extraReducers(builder) {
         builder
        //   .addCase(fetchPhotos.pending, (state, action) => {
        //     state.status = 'loading'
        //   })
          .addCase(fetchPhotos.fulfilled, (state, action) => {
            state.status = 'succeeded'
             //Add any fetched posts to the array
            state.photos =action.payload
            console.log(current(state.photos))
           })
          // .addCase(fetchPhotos.rejected, (state, action) => {
          //   state.status = 'failed'
          //   state.error = action.error.message
          // })
      }
})



export default photosSlice.reducer

export const selectAllPhotos = state => state.photos.p

//export const selecPhotoById = (state, photoId) =>
//state.photos.find(photo => photo.id === photoId)
