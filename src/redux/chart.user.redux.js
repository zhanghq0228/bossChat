import axios from "axios"
const USER_LIST = "USER_LIST"
const initState = {
  userlist : []
}

export function chartUser(state=initState, action) {
  switch (action.type) {
    case USER_LIST:
      return { ...state , userlist:action.payloda }
    default:
      return state
  }
}

function userList(data) {
  return {
    type: USER_LIST,
    payloda: data
  }
}

export function getUserList(type) {
  return async dispatch=>{
    const res = await axios.get("/user/list?type="+type)
    if (res.data.code === 0) {
      dispatch(userList(res.data.data))
     }
  }
}