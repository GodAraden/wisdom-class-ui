import request from "@/utils/request.js"

export function createClass (data = {}) {
  return request({
    url: '/api/v1/class/create',
    method: 'post',
    data
  });
}

export function findClassByUser (data = {}) {
  return request({
    url: '/api/v1/class/user',
    method: 'post',
    data
  });
}

export function findClassMember (data = {}) {
  return request({
    url: '/api/v1/class/member',
    method: 'post',
    data
  });
}

export function searchMember (data = {}) {
  return request({
    url: '/api/v1/class/search/member',
    method: 'post',
    data
  });
}

export function searchClass (data = {}) {
  return request({
    url: '/api/v1/class/search/class',
    method: 'post',
    data
  });
}

export function sendRequest (data = {}) {
  return request({
    url: '/api/v1/class/request/send',
    method: 'post',
    data
  });
}

export function getRequest (data = {}) {
  return request({
    url: '/api/v1/class/request/get',
    method: 'post',
    data
  });
}

export function manageRequest (data = {}) {
  return request({
    url: '/api/v1/class/request/manage',
    method: 'post',
    data
  });
}