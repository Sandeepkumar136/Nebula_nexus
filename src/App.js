import React from 'react'
import './Style.css'
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import APOD from './Components/Content/APOD';
import MarsRover from './Components/Content/MarsRover';
import AsteroidNearEarth from './Components/Content/AsteroidNearEarth';
import SpaceMission from './Components/Content/SpaceMission';
import Exoplanets from './Components/Content/Exoplanets';
import Donki from './Components/Content/Donki';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/apod' element={<APOD />}/>
        <Route path='/marsrover' element={<MarsRover />}/>
        <Route path='/asteroidnearearth' element={<AsteroidNearEarth />}/>
        <Route path='/spacemission' element={<SpaceMission />}/>
        <Route path='/exoplanets' element={<Exoplanets />}/>
        <Route path='/donki' element={<Donki />}/>
      </Routes>
    </Router>
  )
}

export default App;
