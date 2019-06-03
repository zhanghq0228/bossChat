import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile"
import AvatarSelector from "../../component/avatar_selector/AvatarSelector"
import { connect } from "react-redux"
import { upDate } from "../../redux/user.redux"
export class Geniusinfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "",
      desc:""
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }
  render() {
    const path = this.props.location.pathname
    const redirecTo = this.props.redirecTo
    return (
      <div>
        {redirecTo&&redirecTo!==path ? <Redirect to={this.props.redirecTo}></Redirect> : null}
        <NavBar mode="dark">牛人信息完善页</NavBar>
        <AvatarSelector selectAvatar={imgname=>this.setState({
          avatar:imgname
        })}/>
        <InputItem
          onChange={v => {
            this.onChange("title", v)
          }}
        >
          求职岗位
        </InputItem>
      
        <TextareaItem
          rows={3}
          autoHeight
          title="个人简介"
          onChange={v => {
            this.onChange("desc", v)
          }}
        />
        <Button 
          type="primary"
          onClick = {()=>{
            this.props.upDate(this.state)
          }}
        >保存</Button>
      </div>
    )
  }
}
Geniusinfo = connect(
  state=>state.user,
  {upDate}
)(Geniusinfo)
export default Geniusinfo
