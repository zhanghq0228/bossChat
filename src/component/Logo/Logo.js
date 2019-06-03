import React, { Component } from 'react'
import LogoImg from './job.png'

import "./logo.css"
export class Logo extends Component {
 
  render() {
    return (
      <div className="logo-content">
        <img src={LogoImg} alt=""/>
      </div>
    )
  }
}

export default Logo
