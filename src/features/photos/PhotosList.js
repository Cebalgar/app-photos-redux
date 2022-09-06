import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectAllPhotos,fetchPhotos} from './photosSlice'
import { NavLink } from 'react-router-dom';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  TextField,
} from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addFavourite } from '../favourites/favouritesSlice';



export const PhotosList = ({favourite}) => {
    const dispatch = useDispatch()
    const photos = useSelector(selectAllPhotos)
    const [query, setquery ] = useState('')
    
    //console.log(photos)
    

    useEffect(() => {
    dispatch(fetchPhotos(query))
    }, [dispatch,query])
           

    // let date = new Date();
    // let day = `${date.getDate()}`.padStart(2, "0");
    // let month = `${date.getMonth() + 1}`.padStart(2, "0");
    // let year = date.getFullYear();
    // date = `${day}-${month}-${year}`;

    // const addFav = (id) => {
    //   if(favourite.find((photo)=>photo.id === id))return; 
    // const newFavourite = photos.find((photo)=> photo.id ===id)
    
    // let data = {
    //   id: newFavourite.id,
    //   description: newFavourite.description,
    //   width: newFavourite.width,
    //   height: newFavourite.height,
    //   full: newFavourite.urls.full,
    //   thumb: newFavourite.urls.thumb,
    //   likes: newFavourite.likes,
    //   setDate: date,
    // };
  
    // dispatch(addFavourite(data));
    // }
  
   

    return (
    <>

      <TextField 
      className='search' 
      value={query} 
      onChange={(e)=>setquery(e.target.value)} 
      placeholder= "Search the Photo"/>

        <ImageList 
        sx={{ width: '80%', height: '80%', margin:'auto',marginTop:'20px', marginBottom: '20px' }} 
        cols={4} rowHeight={164}>
        {photos &&photos.length && photos.map((photo) => (
        <ImageListItem key={photo.id}>
          <img
            src={`${photo.urls.thumb}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${photo.urls}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={photo}
            loading="lazy"
          />
        <ImageListItemBar
          sx={{
           height:30,
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
                  height:30,
                  fontSize: "small",
                  }}
                  actionIcon={
                    <NavLink to="/favourites" style={{ textDecoration: "none" }}>
                      <IconButton
                        sx={{ color: "white" }}
                        onClick={() => dispatch(addFavourite(photo))}>
                        <AddAPhotoIcon sx={{width:'100%'}}/>
                      </IconButton>
                    </NavLink>
                  }
                />
              </ImageListItem>
            ))}
        </ImageList>
   
    </>
  );
}