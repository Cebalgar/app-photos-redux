import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavourite, favouritesPhotos } from "./favouritesSlice";
import ModalFavourites from "../../components/ModalFavourites";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DownloadIcon from "@mui/icons-material/Download";

export function PhotosFavourites() {
  const [favPhotos, setFavPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editPhoto, setEditPhoto] = useState("");

  const favourite = useSelector(favouritesPhotos);
  const dispatch = useDispatch();
  //console.log(favourite)

  useEffect(() => {
    setFavPhotos(favourite);
  }, [favourite]);

  

  const dataUrl = (url) => {
    return fetch(url)
      .then((resp) => {
        return resp.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  };

  async function downloadImage(url) {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = await dataUrl(url);
    a.download = "download.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filterFav = favourite.filter((photo) => (photo = photo.id));
    const searchDescription = filterFav.filter((photo) => {
      if (search === "") {
        return photo;
      } else {
        return photo.description
          ? photo.description.toLowerCase().includes(search.toLowerCase())
          : "";
      }
    });
    const orderFavPhotos = [...searchDescription];
    switch (order) {
      case "date":
        orderFavPhotos.sort((a, b) => a.setDate - b.setDate);
        break;
      case "width":
        orderFavPhotos.sort((a, b) => a.width - b.width);
        break;
      case "height":
        orderFavPhotos.sort((a, b) => a.height - b.height);
        break;
      case "likes":
        orderFavPhotos.sort((a, b) => a.likes - b.likes);
        break;
      default:
        break;
    }
    //console.log(orderFavPhotos)
    setFavPhotos(orderFavPhotos);
  }, [favourite, order,search]);
 
  const open = () => setOpenModal(true);
  const handleDescription = (photo) => {
    open();
    setEditPhoto(photo);
  };

  return (
    <>
      <TextField
        className="search"
        value={search}
        onChange={handleSearch}
        placeholder="Search Description"
      />

      <FormControl variant="filled" sx={{ width: "15%" }}>
        <InputLabel>Order By: </InputLabel>
        <Select
          value={order}
          label="Order"
          onChange={(e) => setOrder(e.target.value)}
        >
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="width">Width</MenuItem>
          <MenuItem value="height">Height</MenuItem>
          <MenuItem value="likes">Likes</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
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
          {favPhotos &&
            favPhotos.map((photo) => (
              <ImageListItem key={photo.id}>
                <img
                  src={`${photo.thumb}?w=164&h=164&fit=crop&auto=format`}
                  alt={photo.description}
                  loading="lazy"
                />
                <ImageListItemBar
                  actionIcon={
                    <>
                      <IconButton
                        sx={{ color: "white" }}
                        onClick={() => dispatch(deleteFavourite(photo))}
                      >
                        <DeleteForeverIcon sx={{ width: "100%" }} />
                      </IconButton>
                      <IconButton
                        sx={{ color: "white" }}
                        onClick={() => downloadImage(photo.full)}
                      >
                        <DownloadIcon sx={{ width: "100%" }} />
                      </IconButton>
                      <IconButton
                        sx={{ color: "white" }}
                        onClick={() => handleDescription(photo)}
                      >
                        <Typography variant="h6">Edit</Typography>
                      </IconButton>
                    </>
                  }
                ></ImageListItemBar>
              </ImageListItem>
            ))}
        </ImageList>

        <ModalFavourites
          openModal={openModal}
          setOpenModal={setOpenModal}
          editPhoto={editPhoto}
          setEditPhoto={setEditPhoto}
        />
      </Box>
    </>
  );
}
