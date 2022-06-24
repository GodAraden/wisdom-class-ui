import { h } from 'vue'
import { notification, Button } from 'ant-design-vue'

export function getPermName (perm) {
  if (perm == '0') {
    return '老师'
  } else if (perm == '1') {
    return '学员'
  }
}

export function englishToChinese (word) {
  switch (word) {
    case 'username':
      return '手机号码'
    case 'user_type':
      return '用户类型'
    case 'email':
      return '电子邮箱'
    case 'name':
      return '名字'
    case 'sex':
      return '性别'
    case 'birthday':
      return '出生日期'
  }
}

export function formatTextToHtml (text) {
  let html = text;
  if (html) {
    html = html.replace(/ /g, "&nbsp;");
    html = html.replace(/\n/g, "<br/>");
  }
  return html;
};

export function bitChange (limit) {
  let size = "";
  if (limit < 0.1 * 1024) {                            //小于0.1KB，则转化成B
    size = limit.toFixed(2) + "B"
  } else if (limit < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + "KB"
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {        //小于0.1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB"
  } else {                                            //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
  }

  let sizeStr = size + "";                        //转成字符串
  let index = sizeStr.indexOf(".");                    //获取小数点处的索引
  let dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
  if (dou == "00") {                                //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}

export function globalNotice (k, manageRequest) {
  const key = k.class + '-' + k.username
  notification.open({
    message: `${k.class} 邀请您加入`,
    description: h('div', {}, [
      h(Button, {
        danger: true, style: 'margin-right:10px', onClick: () => manageRequest(2, k, key)
      }, '拒绝'),
      h(Button, {
        type: 'primary', ghost: true, onClick: () => manageRequest(1, k, key)
      }, '加入'),
    ]),
    placement: 'bottomRight',
    duration: null,
    key
  })
}

export function fileDownload (res) {
  const { data, headers } = res
  const fileName = headers['content-disposition'].replace(
    /\w+;filename=(.*)/,
    '$1'
  ).slice(5,)
  const blob = new Blob([data], { type: headers['content-type'] })
  let dom = document.createElement('a')
  let url = window.URL.createObjectURL(blob)
  dom.href = url
  dom.download = decodeURI(fileName)
  dom.style.display = 'none'
  document.body.appendChild(dom)
  dom.click()
  dom.parentNode.removeChild(dom)
  window.URL.revokeObjectURL(url)
}