

import React, {useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { deleteFavourite, favouritesPhotos } from "./favouritesSlice";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  TextField,}
 from "@mui/material";
 import DeleteForeverIcon from '@mui/icons-material/DeleteForever';




export function PhotosFavourites(){
  const [favPhotos, setFavPhotos]= useState([]);
  const [search, setSearch] = useState("");
  const favourite = useSelector(favouritesPhotos);
  const dispatch = useDispatch();

  useEffect(()=>{
    setFavPhotos(favourite)
  },[favourite])

    //console.log(favourite)

  const handleSearch = (e) =>{
    setSearch(e.target.value);
  };
    const searchDescription = favourite.filter((photo)=>{
      if(search === ''){
        return photo;
      }else{
        return photo.description ? photo.description.toLowerCase().includes(search) : '';
      }
    })
  


    

  return (
    <>
      
        
      <TextField
      className="search"
      value={search}
      onChange = {handleSearch}
      placeholder= "Search Description" />

      <ImageList
      sx={{ width: '80%', height: '80%', margin:'auto',marginTop:'20px', marginBottom: '20px' }} 
      cols={4} rowHeight={164}>
      {favPhotos && favPhotos.length && searchDescription.map((photo)=> (
      <ImageListItem key={photo.id}>
      <img 
      src= {`${photo.urls.thumb}?w=164&h=164&fit=crop&auto=format`} 
      alt={photo.description}
      loading="lazy"
      />
          <ImageListItemBar
          sx={{
            height:30,
            fontSize: "small",
            }}
            actionIcon={
            <IconButton
              sx={{ color: "white" }}
              onClick={() => dispatch(deleteFavourite(photo))}>
              <DeleteForeverIcon sx={{width:'100%'}}/>
            </IconButton>    
            }
            >
          </ImageListItemBar>
      </ImageListItem>
        
      ))}
    </ImageList>
    
    </>
  )}
