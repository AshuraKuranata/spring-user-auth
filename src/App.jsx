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
  const cookieUserCheck = " username=";

  const [user, setUser] = useState({
    username: null,
  })


  // Button routes to check if cookies are active
  // const checkCookie = () => {
  //   try {
  //     console.log(document.cookie)
  //     let decodedCookie = decodeURIComponent(document.cookie)
  //     let splitCookie = decodedCookie.split(";")
  //     let cookieUsername = splitCookie[1].replace(" username=", "") 
  //     console.log(splitCookie[1])
  //     console.log(cookieUsername)
  //   }
  //   catch (Error) {
  //     console.log(Error)
  //   }
  // }

  // const removeCookie = () => {
  //   document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // }

  useEffect(() => {
    if (document.cookie.includes(cookieUserCheck)) {
      let decodedCookie = decodeURIComponent(document.cookie)
      let splitCookie = decodedCookie.split(";")
      let cookieUsername = splitCookie[1].replace(" username=", "")
      setUser({...user, username: cookieUsername});
    }
  },[])
  
  // if (document.cookie.includes(cookieUserCheck)) {
  //   let decodedCookie = decodeURIComponent(document.cookie)
  //   console.log(decodeURIComponent(document.cookie))
  //   console.log(decodedCookie.split(';'))
  //   let cookieName = decodedCookie.split(';')
  //   for(let i=0; i < cookieName.length; i++) {
  //     let c = cookieName[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // } else {
  //   console.log("No User Cookies")
  // }

  return (
    <>
    <NavBar user={user} />
      <h1>Testing User Authentication/Authorization</h1>
      {/* Check buttons for cookies */}
      {/* <button onClick={checkCookie}>Check Cookie</button>
      <button onClick={removeCookie}>Remove Cookie</button> */}
        <>       
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/signup" element={<Signup user={user} setUser={setUser} /> } />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/logout" element={<Logout user={user} setUser={setUser} />} />
          <Route path="/users" element={<Users user={user} cookieUserCheck={cookieUserCheck} />} />
        </Routes>
        </>
    </>
  )
}

export default App
