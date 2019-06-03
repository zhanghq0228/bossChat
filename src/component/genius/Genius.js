import React, { Component } from "react"
import { connect } from "react-redux"
import { getUserList } from "../../redux/chart.user.redux"
import { CardInfo } from "../cardInfo/CardInfo"
export class Genius extends Component {
  componentDidMount() {
    this.props.getUserList("boss")
  }
  render() {
    return <CardInfo cardInfo={this.props.userlist}></CardInfo>
  }
}
Genius = connect(
  state=>state.chartUser,
  {getUserList}
)(Genius)
export default Genius
