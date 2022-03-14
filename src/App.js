import React, { useState, useEffect } from 'react'

import NavBar from './components/NavBar'

import './App.css'

const App = (props) => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const handleAuth = () => {

    setIsLoggedIn(!isLoggedIn)

  }
  useEffect(() => {

    if(localStorage.getItem('token')){

      handleAuth()

    }

  }, [])
  return(

    <div className = 'container'> 
        <NavBar handleAuth = {handleAuth} isLoggedIn = {isLoggedIn}/>
    </div>

  )

}
export default App