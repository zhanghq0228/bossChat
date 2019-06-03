import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import reducers from "./redux/store"
import "./config"
import App from "./App"
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f =>f
  )
)
//boss genius me msg 4个页面
ReactDOM.render(
  <Provider store={store}>
    <Router>
    <App></App>

    </Router>
  </Provider>,
  document.getElementById("root")
)
