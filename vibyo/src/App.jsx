import React from "react"
import Auth from "./Components/Auth/Auth"
import OTP from "./Components/Auth/OTP"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      {/* <Auth/> */}
      <OTP email="info.vibyo@gmail.com"/>
      <ToastContainer/>
    </>
  )
}

export default App
