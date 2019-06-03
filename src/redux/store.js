import { combineReducers } from "redux"
import {chat } from "./caht.redux"
import { chartUser } from "./chart.user.redux"
import { user } from "./user.redux"
export default combineReducers({user, chartUser, chat})