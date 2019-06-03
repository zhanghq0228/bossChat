import React, { Component } from "react"
import { Result, List, WhiteSpace, Modal } from "antd-mobile"
import { connect } from "react-redux"
import browserCookies from "browser-cookies"
import { logoutSubmit } from "../../redux/user.redux"
import { Redirect } from "react-router-dom"
export class User extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    const alert = Modal.alert
    alert("注销", "确认退出吗?", [
      { text: "取消", onPress: () => console.log("cancel") },
      {
        text: "确认",
        onPress: () => {
          browserCookies.erase("userid")
          this.props.logoutSubmit()
        }
      }
    ])
  }
  componentDidMount() {}
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user ? (
      <div>
        {/* {this.props.redirecTo&&this.props.redirecTo!="/login"?<Redirect to={this.props.redirecTo} />:null} */}
        <Result
          img={
            <img
              alt="头像"
              style={{ width: 50 }}
              src={require(`../image/${props.avatar}.png`)}
            />
          }
          title={props.user}
          message={props.type === "boss" ? props.company : ""}
        />
        <List renderHeader={() => "简介"}>
          <Item multipleLine>
            {props.title}
            {props.desc?props.desc.split("\n").map(v => (
              <Brief key={v}>{v}</Brief>
            )):null}
            {props.money ? <Brief>薪资 : {props.money}</Brief> : null}
          </Item>
          <WhiteSpace />
          <List>
            <Item onClick={this.logout.bind(this)}>退出登录</Item>
          </List>
        </List>
      </div>
    ) : (
      <Redirect to={props.redirecTo} />
    )
  }
}
User = connect(
  state => state.user,
  { logoutSubmit }
)(User)
export default User
