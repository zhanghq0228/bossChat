import React, { Component } from "react"
import { List, InputItem, NavBar, Icon, Grid } from "antd-mobile"
import { connect } from "react-redux"
// import { getMsgList,sendmsg,recvmsg } from "../../redux/caht.redux"
import { getMsgList, sendMsg, recvMsg, readMsg } from "../../redux/caht.redux"
import { getChatId } from "../../util"
import "./chat.css"
// import io from "socket.io-client"
// const soket = io("ws://localhost:9090")

export class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      msg: [],
      showEmojis:false
    }
  }
  componentDidMount = () => {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  componentWillUnmount(){
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  fixCarouse(){
    setTimeout(function(){
      window.dispatchEvent(new Event("resize"))
    }, 0)
  }
  handlerSubmit() {
    this.setState({ text: "" })
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
  }
  render() {
    const emojis = "😉 😶 😫 😔 😳 😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 😍 🤩 😘 😗 😚 😙 😋 😛 😜 🤪 👶 🧒 👦 👧 🧑 👱 👨 🧔 👱‍ 👨‍ 👨‍ 👨‍ 👨‍ 👩 👱‍ 👩‍ 👩‍ 👩‍ 👩‍ 🧓 👴 👵 💋 👋 🤚 🖐 ✋ 🖖 👌 ✌ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍ 💅 🤳 💪 👗 👘 👙 👚 👛 👜 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 🧢 ⛑ 💄 💍 💼"
      .split(" ")
      .filter(v => v)
      .map(v => ({ text: v }))
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userid]) return null
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid == chatid)
    return (
      <div id="chat-page">
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
          mode="dark"
        >
          {users[userid].name}
        </NavBar>
        {chatmsg.map(v => {
          const avatar = require(`../image/${users[v.to].avatar}.png`)
          return v.to == userid ? (
            // 我发送出去
            <List key={v._id}>
              <Item className="chat-me" extra={<img alt="头像" src={avatar} />}>
                {v.content}
              </Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item thumb={avatar}>{v.content}</Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                this.setState({ text: v })
              }}
              extra={
                <span>
                  {" "}
                  <span onClick={() => { this.setState({showEmojis:!this.state.showEmojis}); this.fixCarouse()}} style={{ marginRight: 15 }}>😊</span>
                  <span
                    onClick={() => {
                      this.handlerSubmit()
                    }}
                  >
                    发送
                  </span>
                </span>
              }
            />
          </List>
          {this.state.showEmojis?<Grid
            data={emojis}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el=>{
              this.setState({text:this.state.text+el.text})
            }}
          />:null}
          
        </div>
      </div>
    )
  }
}
Chat = connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
)(Chat)
export default Chat
