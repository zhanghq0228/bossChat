import {
  createStore
} from 'redux'

//新建store
//通过reducer简历
//根据老的stata和action生成新的state

function counter(state = 0, action) {
  switch (action.type) {
    case "加1":
      return state + 1
    case "减1":
      return state - 1
    default:
      return 10
  }
}

//新建store
const store = createStore(counter)

const init = store.getState()
console.log(init)
function Linten(){
  const current = store.getState()
  console.log(current)
}
store.subscribe(Linten)
store.dispatch({type:"加1"})
store.dispatch({type:"加1"})
store.dispatch({type:"减1"})