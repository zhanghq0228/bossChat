import React, { Component } from "react"
import { Card, WingBlank, WhiteSpace } from "antd-mobile"
import PropTypes from "prop-types"
export class CardInfo extends Component {
  static propType = {
    selectAvatar: PropTypes.array.isRequired,
  }
  handlerClick(v){
    this.context.router.history.push(`/chat/${v._id}`)
  }
  render() {
    return (
      <WingBlank size="lg">
        {this.props.cardInfo.map((v,i) =>
          v.avatar ? (
            <div key={i}>
              <WhiteSpace size="lg" />
              <Card onClick={()=>this.handlerClick(v)}>
                <Card.Header
                  title={v.user}
                  thumb={require(`../image/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                />
                <Card.Body>
                  {v.type === "boss" ? <div>公司 : {v.company}</div> : null}
                  {v.desc.split("\n").map((d,j) => (
                    <div key={d}>{d}</div>
                  ))}
                  {v.type === "boss" ? <div>薪资 : {v.money}</div> : null}
                </Card.Body>
              </Card>
            </div>
          ) : null
        )}
      </WingBlank>
    )
  }
}
CardInfo.contextTypes = {
  router: PropTypes.object.isRequired
}
export default CardInfo
