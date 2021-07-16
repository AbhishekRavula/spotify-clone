import React from 'react'
import WelcomeHome from './spotify/components/Welcome'
import UserAuthenticate from './spotify/components/UserAuthenticate'


function App() {
  let token = localStorage.getItem("token")

  return (
    token ? <WelcomeHome/> : <UserAuthenticate/>
  )
}
export default App