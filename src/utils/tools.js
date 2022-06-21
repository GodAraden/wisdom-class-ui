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