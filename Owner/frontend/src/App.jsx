import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Content from './components/Content'
import ManagePackage from './components/ManagePackage'
import CreatePackage from './components/CreatePackage'
import PackDetails from './components/PackDetails'


function App() {
    return (
    <>
    <Routes>
    <Route path='/' element= {<Login/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/content' element={<Content/>} />
    <Route path='/package' element={<ManagePackage/>} />
    <Route path='/createPackage' element={<CreatePackage/>} />
    <Route path='/packDetails' element={<PackDetails/>} />

    </Routes>
    </>
    ) 
}

export default App;
