import request from "@/utils/request.js"

export function create (data = {}) {
  return request({
    url: '/api/v1/homework/create',
    method: 'post',
    data
  });
}

export function getall (data = {}) {
  return request({
    url: '/api/v1/homework/getall',
    method: 'post',
    data
  });
}

export function getone (data = {}) {
  return request({
    url: '/api/v1/homework/getone',
    method: 'post',
    data
  });
}

export function answer (data = {}) {
  return request({
    url: '/api/v1/homework/answer',
    method: 'post',
    data
  });
}

export function result (data = {}) {
  return request({
    url: '/api/v1/homework/result',
    method: 'post',
    data
  });
}

export function score (data = {}) {
  return request({
    url: '/api/v1/homework/score',
    method: 'post',
    data
  });
}