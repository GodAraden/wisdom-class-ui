import request from "@/utils/request.js"

export function createNotice (data = {}) {
  return request({
    url: '/api/v1/notice/create',
    method: 'post',
    data
  });
}

export function getNotice (data = {}) {
  return request({
    url: '/api/v1/notice/get',
    method: 'post',
    data
  });
}

export function changeNotice (data = {}) {
  return request({
    url: '/api/v1/notice/change',
    method: 'post',
    data
  });
}

export function deleteNotice (data = {}) {
  return request({
    url: '/api/v1/notice/delete',
    method: 'post',
    data
  });
}