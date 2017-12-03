import React from 'react'
import roteImage from '../public/images/main-image.jpg'
import { Link } from 'react-router-dom'

const Homepage = (props) => {
  return (
    <div className="main-container">
      <h1 className="main-title">ROTE</h1>
      <img src={roteImage} className="main-image" />
      <Link to="/login">
        <div className="start-btn button"><h2>Start to quiz yourself now!</h2></div>
      </Link>
    </div>
  )
}

export default HomePage