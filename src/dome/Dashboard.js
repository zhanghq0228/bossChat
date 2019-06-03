import React, { Component } from "react";
import {
  BrowserRouter as Router, Route, Link
} from "react-router-dom";
import App from "./App";

function Erying() {
  return <h2> 二营 </h2>;
}

function Qibinlian() {
  return <h2> 骑兵连 </h2>;
}
export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/dashboard/"> 一营 </Link>
            </li>
            <li>
              <Link to="/dashboard/erying"> 二营 </Link>
            </li>
            <li>
              <Link to="/dashboard/qibinlian"> 骑兵连 </Link>
            </li>
          </ul>
          <Route exact to="/dashboard/" component={App} />
          <Route exact to="/dashboard/erying" component={Erying} />
          <Route exact to="/dashboard/qibinglian" component={Qibinlian} />
        </div>
      </Router>
    );
  }
}

export default Dashboard;
