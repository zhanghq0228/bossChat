import React, { Component } from "react"
import { List, Badge } from "antd-mobile"
import { connect } from "react-redux"
export class Msg extends Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    const msgGrounp = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGrounp[v.chatid] = msgGrounp[v.chatid] || []
      msgGrounp[v.chatid].push(v)
    })
    //console.log(Object.values({"imop":"name","age":"123"})) //["name","123"]
    const chatList = Object.values(msgGrounp).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userInfo = this.props.chat.users
    //排序
    // console.log([2,3,4,6,1].sort(function(a,b){
    //   return a-b
    // }))
    return (
      <div>
        <List>
          {chatList.map((v, i) => {
            const LataItem = this.getLast(v)
            const targetId = v[0].from == userid ? v[0].to : v[0].from
            const unReadNum = v.filter(v => !v.read && v.to == userid).length
            const name = userInfo[targetId] ? userInfo[targetId].name : null
            const avatar = userInfo[targetId]
              ? userInfo[targetId].avatar
              : null
            return (
              <Item
                key={i}
                arrow="horizontal"
                extra={<Badge text={unReadNum} />}
                thumb={require(`../image/${avatar}.png`)}
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                {LataItem.content}
                <Brief>{name}</Brief>
              </Item>
            )
          })}
        </List>
      </div>
    )
  }
}
Msg = connect(state => state)(Msg)
export default Msg
