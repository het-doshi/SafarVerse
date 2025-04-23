import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import OHeader from './components/OHeader'
import OHome from './components/OHome'
import Gallery from './components/Gallery'
import DisplayTips from './components/DisplayTips'
import CreateTip from './components/CreateTip'
import Tours from './components/tours/FeaturedTours'
import TourDetails from './components/tours/TourDetails'


function App() {
    return (
    <>
    <Routes>
    <Route path='/' element= {<Navigate to='/OHome'/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/OHeader' element={<OHeader/>} />
    <Route path='/OHome' element={<OHome/>} />
    <Route path='/gallery' element={<Gallery/>} />
    <Route path='/tips' element={<DisplayTips/>} />
    <Route path='/createTip' element={<CreateTip/>} />
    <Route path='/tours' element={<Tours/>} />
    <Route path='/tourDetails' element={<TourDetails/>} />
    </Routes>
    </>
    ) 
}

export default App;
