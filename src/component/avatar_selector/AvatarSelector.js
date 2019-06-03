import React, { Component } from "react"
import { List, Grid } from "antd-mobile"
import PropTypes from "prop-types"
export class AvatarSelector extends Component {
  static propType = {
    selectAvatar:PropTypes.func.isRequired
  }
  render() {
    const avatarList = "boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra"
      .split(",")
      .map((v, i) => ({
        icon: require(`../image/${v}.png`),
        text: v
      }))
    const gridHeader = this.state ? (
      <div>
        <span>已选择头像</span>
        <img alt="头像" src={this.state.icon} style={{ width: 20 }} />
      </div>
    ) : (
      <div>请选择头像</div>
    )
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={ele => {
              this.setState(ele)
              this.props.selectAvatar(ele.text)
            }}
          />
          
        </List>
      </div>
    )
  }
}

export default AvatarSelector
