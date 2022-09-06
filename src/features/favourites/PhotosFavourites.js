

import React, {useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { deleteFavourite, favouritesPhotos } from "./favouritesSlice";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem}
 from "@mui/material";
 import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
 import DownloadIcon from '@mui/icons-material/Download';


export function PhotosFavourites(){
  const [favPhotos, setFavPhotos]= useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
 
  

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
        return photo.description ? photo.description.toLowerCase().includes(search.toLowerCase()) : '';
      }
    });



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

   useEffect(()=>{

    const filterFav = favourite.filter((photo)=> photo=photo.id)
    const orderFavPhotos = [...filterFav];
      switch(order){
          case 'date':
              orderFavPhotos.sort((a,b) => a.date - b.date);  
              break;
          case 'width': 
              orderFavPhotos.sort((a,b) => a.width - b.width);  
              break;
          case 'height':
              orderFavPhotos.sort((a,b) => a.height - b.height);  
              break;
          case 'likes':
              orderFavPhotos.sort((a,b) => a.likes - b.likes);  
              break;
          default:
             break;
      }
      setFavPhotos(orderFavPhotos);
   },[favourite,order])
    

  return (
    <>
         
      <TextField
      className="search"
      value={search}
      onChange = {handleSearch}
      placeholder= "Search Description" />


      <FormControl
        variant="filled"
        sx={{width:'15%'}}
      >
        <InputLabel>Order By: </InputLabel>
         <Select
          value={order}
          label= "Order"
          onChange={(e) => setOrder(e.target.value)}
        >
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="width">Width</MenuItem>
          <MenuItem value="height">Height</MenuItem>
          <MenuItem value="likes">Likes</MenuItem>
        </Select>
      </FormControl>

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
              <>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => dispatch(deleteFavourite(photo))}>
              <DeleteForeverIcon sx={{width:'100%'}}/>
            </IconButton>  
            <IconButton
              sx={{ color: "white"}}
              onClick={()=>downloadImage(photo.urls.full)}>
            <DownloadIcon sx={{width: '100%'}}/> 
            </IconButton>
           
            </>
              
            }
            >
          </ImageListItemBar>
      </ImageListItem>
        
      ))}
    </ImageList>
    
    </>
  )}
