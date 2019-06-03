import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile"
import AvatarSelector from "../../component/avatar_selector/AvatarSelector"
import { connect } from "react-redux"
import { upDate } from "../../redux/user.redux"
export class BossInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "",
      company:"",
      money:"",
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
        <NavBar mode="dark">BOSS信息完善页</NavBar>
        <AvatarSelector selectAvatar={imgname=>this.setState({
          avatar:imgname
        })}/>
        <InputItem
          onChange={v => {
            this.onChange("title", v)
          }}
        >
          招聘职位
        </InputItem>
        <InputItem
          onChange={v => {
            this.onChange("company", v)
          }}
        >
          公司名称
        </InputItem>
        <InputItem
          onChange={v => {
            this.onChange("money", v)
          }}
        >
          职位薪资
        </InputItem>
        <TextareaItem
          rows={3}
          autoHeight
          title="职位要求"
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
BossInfo = connect(
  state=>state.user,
  {upDate}
)(BossInfo)
export default BossInfo
