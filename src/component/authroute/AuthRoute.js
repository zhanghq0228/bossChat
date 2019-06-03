import { Component } from 'react'
import axios from "axios"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { loaddata } from "../../redux/user.redux"
// @withRouter
export class AuthRoute extends Component {
  componentDidMount = () => {
    const publicList = ["/login","/register"]
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname)>-1){
      return null
    }
    //获取用户信息
    axios.get("/user/info")
    .then(res=>{
      if(res.status === 200){
        if(res.data.code === 0){
          //有登陆信息
          this.props.loaddata(res.data.data)
        }else{
          this.props.history.push('/login')
        }
      }
    })
    // 是否登录
    // 根据url地址 login不需要跳转
    // 根据用户type 跳转到boss或者牛人模板
    // 判断用户是否完善信息(选择头像 个人简介)

  }
  
  render() {
    return null
  }
}


AuthRoute = connect(state=>state.user,{loaddata})(AuthRoute)
export default withRouter(AuthRoute)
