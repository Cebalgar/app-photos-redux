import React from 'react';
import {Route,Routes} from 'react-router-dom'


import { PhotosList } from './features/photos/PhotosList';
import {PhotosFavourites} from './features/favourites/PhotosFavourites'
import './App.css';
import { Navbar } from './app/Navbar';


function App() {
  return (
  
    <div className="App">
   
       <Navbar/>
       <Routes>
        <Route path='/' element={<PhotosList/>}/>
        <Route path= 'favourites' element={<PhotosFavourites/>}/>
       </Routes>
    </div>
  );
}

export default App;
