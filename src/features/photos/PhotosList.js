import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPhotos, fetchPhotos } from "./photosSlice";
import { NavLink } from "react-router-dom";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  TextField,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addFavourite } from "../favourites/favouritesSlice";

export const PhotosList = () => {
  const dispatch = useDispatch();
  const photos = useSelector(selectAllPhotos);
  const [query, setquery] = useState("");

  useEffect(() => {
    dispatch(fetchPhotos(query));
  }, [dispatch, query]);

  let date = new Date();
  let day = `${date.getDate()}`.padStart(2, "0");
  let month = `${date.getMonth() + 1}`.padStart(2, "0");
  let year = date.getFullYear();
  date = `${day}-${month}-${year}`;

  const addFav = (id) => {
    const addPhoto = photos.find((photo) => photo.id === id);

    let data = {
      id: addPhoto.id,
      description: addPhoto.description,
      width: addPhoto.width,
      height: addPhoto.height,
      full: addPhoto.urls.full,
      thumb: addPhoto.urls.thumb,
      likes: addPhoto.likes,
      setDate: date,
    };

    dispatch(addFavourite(data));
  };

  return (
    <>
      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <TextField
          className="search"
          value={query}
          onChange={(e) => setquery(e.target.value)}
          placeholder="Search the Photo"
        />

        <ImageList
          sx={{
            width: "80%",
            height: "80%",
            margin: "auto",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          cols={4}
          rowHeight={164}
        >
          {photos &&
            photos.length &&
            photos.map((photo) => (
              <ImageListItem key={photo.id}>
                <img
                  src={`${photo.urls.thumb}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${photo.urls}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={photo}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{
                    height: 30,
                    fontSize: "small",
                  }}
                  title={photo.likes}
                  position="top"
                  actionIcon={
                    <FavoriteIcon
                      sx={{
                        fontSize: "x-large",
                        color: "red",
                        margin: 2,
                        marginRight: 1,
                      }}
                    />
                  }
                  actionPosition="left"
                />
                <ImageListItemBar
                  sx={{
                    height: 30,
                    fontSize: "small",
                  }}
                  actionIcon={
                    <NavLink
                      to="/favourites"
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton
                        sx={{ color: "white" }}
                        onClick={() => addFav(photo.id)}
                      >
                        <AddAPhotoIcon sx={{ width: "100%" }} />
                      </IconButton>
                    </NavLink>
                  }
                />
              </ImageListItem>
            ))}
        </ImageList>
      </Box>
    </>
  );
};
