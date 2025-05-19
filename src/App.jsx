import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import Login from './components/Authentication/Login'
import Logout from './components/Authentication/Logout'
import Signup from './components/Authentication/Signup'
import Users from './components/Users/Users'
import Home from './components/Homepage/Home'
import './App.css'

function App() {

  const [user, setUser] = useState({
    username: null,
  })

  return (
    <>
    <NavBar user={user} />
      <h1>Testing User Authentication/Authorization</h1>
        <>       
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/signup" element={<Signup user={user} setUser={setUser}/>} />
          <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
          <Route path="/logout" element={<Logout user={user} setUser={setUser}/>} />
          <Route path="/users" element={<Users />} />
        </Routes>
        </>
    </>
  )
}

export default App
