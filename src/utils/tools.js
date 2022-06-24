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