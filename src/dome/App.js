import React, { Component } from "react";
import { connect } from "react-redux"
import { addGUN, remveGUN, addGunAsync } from "./index.redux"
import "./App.css";
const mapStatetoProps = (state)=>{
  return {num:state.connter}
}
const actionCreators = { addGUN, remveGUN, addGunAsync }

class App extends Component {
  render() {
    const num =this.props.num;
    return (
      <div className="App">
      现在有机枪{num}
      <button onClick={this.props.addGUN}>申请武器</button>
      <button onClick={this.props.remveGUN}>上交武器</button>
      <button onClick={this.props.addGunAsync}>拖两秒上交武器</button>
      </div>
    );
  }
}
//connect第一个参数:需要传递的属性,第二个需要传递的方法
App = connect(mapStatetoProps,actionCreators)(App)

export default App;
