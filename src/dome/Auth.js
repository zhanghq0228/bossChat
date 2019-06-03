import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";
import { login } from "./Auth.redux"
import axios  from "axios"
export class Auth extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    axios.get("/data")
    .then(res=>{
      console.log(res.data)
    })
  }
  
  render() {
    return (
      <div>
        {this.props.isAuth?<Redirect to="/dashboard"></Redirect>:null}
        {this.props.user}年龄:{this.props.age}
       <h2>你没有权限,需要登录才能看</h2> 
       <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}
Auth = connect(state=>state.auth,{login})(Auth)
export default Auth
