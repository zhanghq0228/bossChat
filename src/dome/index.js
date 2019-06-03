import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import reducers from "./reducer";
// import { counter } from "./index.redux";
const windowDevtools = window.devToolsExtension
  ? window.devToolsExtension()
  : () => {};
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    windowDevtools
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        <Redirect to="/dashboard"></Redirect>
      </Switch>
      {/* <div>
        <ul>
          <li>
            <Link to="/">一营</Link>
          </li>
          <li>
            <Link to="/erying">二营</Link>
          </li>
          <li>
            <Link to="/qibinlian">骑兵连</Link>
          </li>
        </ul>
      </div> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
