import React, { Component } from 'react'
import {  Route, Switch } from "react-router-dom"
import Login from "./containar/login/Login"
import AuthRoute from "./component/authroute/AuthRoute"
import Dashboard from "./component/dashboard/Dashboard"
import Chat from "./component/chat/Chat"
import Register from "./containar/register/Register"
import BossInfo from "./containar/bossinfo/BossInfo"
import Geniusinfo from "./containar/geniusinfo/Geniusinfo"

export class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      hasErr:false
    }
  }
  componentDidCatch(err,info){
    console.log(err,info)
    this.setState({hasErr:true})
  }
  render() {
    return this.state.hasErr?<h2>出错了!</h2>
    :(
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={Geniusinfo} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    )
  }
}

export default App
