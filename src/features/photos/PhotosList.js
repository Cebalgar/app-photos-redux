import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from '../../components/Spinner';
import {selectAllPhotos,fetchPhotos} from './photosSlice'

const PhotoExcerpt = ({photo})=> {
    return(
        <div>
            <img src={photo.urls.small} alt= "photos"/>
        </div>
    )
}

export const PhotosList = () => {
    const dispatch = useDispatch()
    const photos = useSelector(selectAllPhotos)
    
    const photoStatus = useSelector(state => state.photos.status)
    const error = useSelector(state => state.photos.error)


    useEffect(() => {
        if(photoStatus === "idle"){
            dispatch(fetchPhotos())
        }
    }, [photoStatus, dispatch])

    let image;

    if(photoStatus === "loading"){
        image = <Spinner text= "Loading..."/>
    
    }else if (photoStatus === "succeeded"){
        image = photos.map(photo => (
            <PhotoExcerpt key={photo.id} photo={photo}/>
        ))
    }else if (photoStatus === "failed"){
        image = <div>{error}</div>
    }
    return (
        <section>
            <h2>Fotos</h2>
            {image}
        </section>
    )
    

    
}