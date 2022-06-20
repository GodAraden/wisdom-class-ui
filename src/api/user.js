import request from "@/utils/request.js"

export function register (data = {}) {
  return request({
    url: '/api/v1/user/register',
    method: 'post',
    data
  });
}

export function login (data = {}) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data
  });
}

export function logout (data = {}) {
  return request({
    url: '/api/v1/user/logout',
    method: 'get',
    data
  });
}

export function whoAmI (data = {}) {
  return request({
    url: '/api/v1/user/whoAmI',
    method: 'get',
    data
  });
}