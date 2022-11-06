import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Kick from './Kick'
import VideoGame from './VideoGame'
import Movie from './Movie'
import Navbar from './Navbar'

export default function App() {
    return (
      <div className='App'>

      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Kick />}  />
        <Route path='/videogames' element={<VideoGame />}  />
        <Route path='/movies' element={<Movie />}  />

        </Routes>
        </BrowserRouter>
        </div>
 
     
     

    )
}