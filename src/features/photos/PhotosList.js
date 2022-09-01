import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectAllPhotos,fetchPhotos} from './photosSlice'

export const PhotosList = () => {
    const dispatch = useDispatch()
    const photos = useSelector(selectAllPhotos)
    
    console.log(photos)
    
    useEffect(() => {

    dispatch(fetchPhotos())

    }, [dispatch])
        
        
    return (
      <div>
        {photos.map(photo =>(
            <div key={photo.id}>
                <img src={photo.urls.small} alt= {photo} />

            </div>
        ))}

      </div>
    )
   
}