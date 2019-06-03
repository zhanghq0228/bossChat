import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import PropTypes from "prop-types"
import { TabBar } from "antd-mobile"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
export class NavLinkBar extends Component {
  static propType = {
    data: PropTypes.array.isRequired
  }
  render() {
    const navList = this.props.data.filter(v => !v.hide)
    const { pathname } = this.props.location
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
            badge={v.path =="/msg" ?this.props.unread:""}
            title={v.text}
            key={v.path}
            icon={{ uri: require(`./img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path)
            }}
          >
            <div style={{ marginTop: "45px" }}>
              <Switch>
                {navList.map(v => {
                  return (
                    <Route key={v.path} path={v.path} component={v.component} />
                  )
                })}
              </Switch>
            </div>
          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}
NavLinkBar = connect(state=>state.chat)(NavLinkBar)
export default withRouter(NavLinkBar)
