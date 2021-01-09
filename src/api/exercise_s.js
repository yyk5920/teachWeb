import request from '@/utils/request'

export function fetchunfinishedList(query) {
  return request({
    url: '/user/homework/unfinished',
    method: 'post',
    params: query
  })
}

export function fetchfinishedList(query) {
  return request({
    url: '/user/homework/finished',
    method: 'post',
    params: query
  })
}

//作业/考试/练习中的一次题目列表
export function fetchHomework(query) {
  return request({
    url: '/user/homework/homework',
    method: 'post',
    params: query
  })
}

//获取实验模块列表
export function fetchExperiment(query) {
  return request({
    url: '/user/experiment/lists',
    method: 'post',
    data:query
  })
}

//根据模块id获取实验模块内容
export function fetchExercise(query) {
  return request({
    url: '/user/experiment/module',
    method: 'post',
    data: query
  })
}

export function commitExercise(query) {
  // return request({
  //   url: '/user/homework/commit',
  //   method: 'post',
  //   params: query
  // })
  return request({
    url: '/user/experiment/vlg-run',
    method: 'post',
    data: query
  })
}

export function commitHomework(data) {
  return request({
    url: '/user/homework/create',
    method: 'post',
    data
  })
}
