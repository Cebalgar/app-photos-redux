import { createSlice } from "@reduxjs/toolkit";

const saveToStorage = (photos) => {
  localStorage.setItem("favouritePhotos", JSON.stringify(photos));
};

function getFromStorage() {
  const fromStorage = localStorage.getItem("favouritesPhoto");
  return fromStorage ? JSON.parse(fromStorage) : [];
}

const favouritesSlice = createSlice({
  name: "favouritesPhoto",
  initialState: {
    photos: getFromStorage(),
  },
  reducers: {
    addFavourite: (state, action) => {
      state.photos.push(action.payload);
      saveToStorage(state.photos);
    },

    deleteFavourite: (state, action) => {
      state.photos = state.photos.filter(
        (photo) => photo.id !== action.payload.id
      );
      saveToStorage(state.photos);
    },
    updateFavourite: (state, action) => {
      const { id, description } = action.payload;
      const existingFavourite = state.photos.find((photo) => photo.id === id);
      if (existingFavourite) {
        existingFavourite.description = description;
      }
      saveToStorage(state.photos);
    },
  },
});
//localStorage.clear()

export const { addFavourite, deleteFavourite, updateFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;

export const favouritesPhotos = (state) => state.favourites.photos;
