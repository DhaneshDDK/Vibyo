import React from "react"
import Auth from "./Components/Auth/Auth"
import OTP from "./Components/Auth/OTP"
import { ToastContainer } from 'react-toastify';
import UIRoutes from './Routes/UIRoutes'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path={UIRoutes.auth} element={<Auth />} />
        <Route path={UIRoutes.otp} element={<OTP />} />
      </Routes>
    </>
  )
}

export default App
