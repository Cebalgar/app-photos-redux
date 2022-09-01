import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"; 
import axios from "axios";


const URL= 'https://api.unsplash.com/search/photos';
const apiKey= 'fap9RiTBIkGKtr3KREf858iXt2RSjFG4NKm6XVdz0Tk';


export const fetchPhotos = createAsyncThunk
('photos/fetchPhotos', 
async(query)=>{
    const response = await axios.get(`${URL}?query=${query}&client_id=${apiKey}&per_page=10`);
    console.log (response.data)
    return response.data.results
})

const initialState= {
    photos: [],
}



const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers:{},
    extraReducers(builder) {
      builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.photos =action.payload   
      })    
    }
})



export default photosSlice.reducer

export const selectAllPhotos = state => state.photos.photos

//export const selecPhotoById = (state, photoId) =>
//state.photos.find(photo => photo.id === photoId)
