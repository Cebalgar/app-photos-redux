import React from 'react';
import {Route,Routes} from 'react-router-dom'
import { Home } from './app/Home';

import { PhotosList } from './features/photos/PhotosList';
import './App.css';
import { Navbar } from './app/Navbar';


function App() {
  return (
  
    <div className="App">
       <Home />
       <Navbar/>
       <Routes>
        <Route path='/' element={<PhotosList/>}/>
       </Routes>
    </div>
  );
}

export default App;
