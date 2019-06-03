const ADD_GUN = "加1"
const REMOVE_GUN = "减1"

export function counter(state = 0, action) {
  switch (action.type) {
    case "加1":
      return state + 1
    case "减1":
      return state - 1
    default:
      return 10
  }
}

export function addGUN(){
  return{type:ADD_GUN}
}

export function remveGUN(){
  return{type:REMOVE_GUN}
}

export function addGunAsync(){
  return dispatch=>{
    setTimeout(()=>{
      dispatch(addGUN())
    },2000)
  }
}