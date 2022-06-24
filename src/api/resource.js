import request from "@/utils/request.js"

export function updateResource (data = {}) {
  return request({
    url: '/api/v1/resource/update',
    method: 'post',
    data
  });
}

export function deleteResource (data = {}) {
  return request({
    url: '/api/v1/resource/delete',
    method: 'post',
    data
  });
}

export function getResource (data = {}) {
  return request({
    url: '/api/v1/resource/get',
    method: 'post',
    data
  });
}

export function download (data = {}) {
  return request({
    url: '/api/v1/resource/download',
    method: 'post',
    responseType: 'blob',
    data
  });
}
