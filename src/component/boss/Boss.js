import React, { Component } from "react"
import { connect } from "react-redux"
import { getUserList } from "../../redux/chart.user.redux"
import { CardInfo } from "../cardInfo/CardInfo"
export class Boss extends Component {
  componentDidMount() {
    this.props.getUserList("genius")
  }

  render() {
    return <CardInfo cardInfo={this.props.userlist}></CardInfo>
  }
}
Boss = connect(
  state=>state.chartUser,
  {getUserList}
)(Boss)
export default Boss
