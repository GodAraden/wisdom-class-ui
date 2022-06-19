import request from "@/utils/request.js"

export function ping (data = {}) {
  return request({
    url: '/api/v1/webtest/ping',
    method: 'get',
    data
  });
}