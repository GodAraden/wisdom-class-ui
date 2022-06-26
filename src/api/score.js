import request from "@/utils/request.js"

export function getSubjects (data = {}) {
  return request({
    url: '/api/v1/score/subject/get',
    method: 'post',
    data
  });
}

export function addSubject (data = {}) {
  return request({
    url: '/api/v1/score/subject/add',
    method: 'post',
    data
  });
}

export function updateSubject (data = {}) {
  return request({
    url: '/api/v1/score/subject/update',
    method: 'post',
    data
  });
}

export function deleteSubject (data = {}) {
  return request({
    url: '/api/v1/score/subject/delete',
    method: 'post',
    data
  });
}

export function getName (data = {}) {
  return request({
    url: '/api/v1/score/subject/name',
    method: 'post',
    data
  });
}