import axios from 'axios'
import { getRedirecPath } from "../util"
const ERROR_MSG = "ERROR_MSG"
const LOAD_DATA = "LOAD_DATA"
const LOGOUT = "LOGOUT"
const AUTH_SUCESS = "AUTH_SUCESS"
const initState = {
  msg:"",
  user:"",
  pwd:"",
  type:"",
  redirecTo:""
}

//reducer
export function user(state =initState,action){
  switch(action.type){
    case AUTH_SUCESS:
      return {...state,msg:"",redirecTo:getRedirecPath(action.payload),...action.payload}
    case LOAD_DATA:
      return { ...state,...action.payload}
    case LOGOUT:
      return { ...state,redirecTo:"/login"}
    case ERROR_MSG:
      return { ...state,isAuth:false,msg : action.msg}
    default:
      return state
  }
}
function authSucess(obj){
  const { pwd,...data} = obj 
  return { type:AUTH_SUCESS,payload:data}
}

function errorMsg(msg){
  return{msg,type:ERROR_MSG}
}
// function registerSuccess(data){
//   return { type:REGISTER_SUCCESS , payload:data}
// }
// function loginSucess(data){
//   return {type: LOGIN_SUCCESS,payload:data}
// }

export function loaddata (userInfo){
  return { type:LOAD_DATA, payload:userInfo}
}

export function login({user,pwd}){
  if(!user||!pwd){
    return errorMsg("用户名密码必须输入")
  }
  return async dispatch=>{
    const res = await axios.post("/user/login",{user,pwd})
    if(res.data.code === 0){
      dispatch(authSucess(res.data.data))
    }else{
      dispatch(errorMsg(res.data.msg))
    }
  }
}

export function logoutSubmit(){
  return { type: LOGOUT}
}
export function register({user,pwd,type,repeatpwd}){
  if(!user||!pwd||!type){
    return errorMsg("用户名密码必须输入")
  }
  if(pwd !== repeatpwd){
    return errorMsg("密码与确认密码不同")
  }
  return async dispatch=>{

    const res = await axios.post("/user/register",{user,pwd,type})
    if(res.data.code === 0){
      dispatch(authSucess({user,pwd,type}))
    }else{
      dispatch(errorMsg(res.data.msg))
    }
  }
}

export function upDate(data){
  return async dispatch=>{
    const res = await axios.post("/user/update",data)
    if(res.data.code === 0){
      dispatch(authSucess(res.data.data))
    }else{
      dispatch(errorMsg(res.data.msg))
    }
  }
}