export function getRedirecPath({type , avatar}){
  //根据用户信息 跳转页面
  let url = (type === "boss")?"/boss" : "/genius"
  if(!avatar){
    url+="info"
  }
  return url
}

export function getChatId(userId , targetId){
  return [userId,targetId].sort().join("_")
}