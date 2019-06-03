import React, { Component } from "react"
import Logo from "../../component/Logo/Logo"
import { List, InputItem, WhiteSpace, Button,Radio } from "antd-mobile"
import { connect } from "react-redux"
import { register } from "../../redux/user.redux"
import { Redirect } from "react-router-dom"
import imoocForm from "../../component/form/Form"
import "./index.css"
export class Register extends Component {
  constructor(props) {
    super(props)
    this.handlerRegister = this.handlerRegister.bind(this)
  }
  componentDidMount = () => {
    this.props.handlerChange('type','boss')
  }
  handlerRegister(){
    this.props.register(this.props.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirecTo?<Redirect to={this.props.redirecTo} />:null}
        <Logo> </Logo> <h2> 注册页 </h2>
        <List>
          {this.props.msg?<p className="error_msg">{this.props.msg}</p>:""}
        <InputItem onChange={v=>this.props.handlerChange("user",v)}>用户:</InputItem>
        <WhiteSpace></WhiteSpace>
        <InputItem 
        type="password"
        onChange={v=>this.props.handlerChange("pwd",v)}>密码:</InputItem>
        <WhiteSpace></WhiteSpace>
        <InputItem
        type="password"
         onChange={v=>this.props.handlerChange("repeatpwd",v)}>确认密码:</InputItem>
        <WhiteSpace></WhiteSpace>
        <RadioItem 
        onChange={()=>this.props.handlerChange("type","boss")}
        checked={this.props.state.type === "boss"}>Boss</RadioItem>
        <WhiteSpace></WhiteSpace>
        <RadioItem 
        onChange={()=>this.props.handlerChange("type","genius")}
        checked={this.props.state.type === "genius"}>牛人</RadioItem>
        <WhiteSpace></WhiteSpace>
        <Button type="primary"
        onClick={this.handlerRegister}
        >注册</Button>
        </List>
      </div>
    )
  }
}
Register = connect(
  state => state.user,
  {register}
)(Register)
export default imoocForm(Register)
