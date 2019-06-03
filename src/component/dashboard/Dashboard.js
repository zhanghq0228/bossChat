import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import { NavBar } from "antd-mobile"
import NavLinkBar from "../navLink/NavLinkBar"
import Msg from "../msg/Msg"
import Boss from "../boss/Boss"
import Genius from "../genius/Genius"
import User from "../user/User"
import { getMsgList, recvMsg } from "../../redux/caht.redux"
import "./base.css"

export class Dashboard extends Component {
  componentDidMount = () => {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  };
  render() {
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: "/boss",
        text: "牛人",
        icon: "boss",
        title: "牛人列表",
        component: Boss,
        hide: user.type === "genius"
      },
      {
        path: "/genius",
        text: "boss",
        icon: "job",
        title: "BOSS列表",
        component: Genius,
        hide: user.type === "boss"
      },
      {
        path: "/msg",
        text: "消息",
        icon: "msg",
        title: "消息列表",
        component: Msg
      },
      {
        path: "/me",
        text: "我的",
        icon: "user",
        title: "个人中心",
        component: User
      }
    ]
    const page = navList.find(v=>v.path == pathname)
    return page?(
      <div>
        <NavBar className="fixed-header" mode="dard">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        {/* <div>
                  <Switch>
                    {navList.map(v=>{
                      return (<Route key={v.path} path={v.path} component={v.component}></Route>)
                    })}
                  </Switch>
                </div> */}
        <NavLinkBar data={navList}> </NavLinkBar>
      </div>
    ):<Redirect to="/msg"></Redirect>
  }
}
Dashboard = connect(
  state => state,
  {
    getMsgList,
    recvMsg
  }
)(Dashboard)
export default Dashboard
