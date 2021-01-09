import service from '@/utils/request'

export function login(data) {
  console.log("request login")
  return service({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return service({
    url: '/user/info',
    method: 'post',
    data:  token
  })
}

export function logout(userInfo) {
  return service({
    url: '/user/logout',
    method: 'post',
    data: userInfo
  })
}
