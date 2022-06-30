import { h } from 'vue'
import { notification, Button, message } from 'ant-design-vue'
import { read } from 'xlsx'

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
    case 'number':
      return '学号/工号'
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

function createUploadModal () {
  const inputObj = document.createElement('input')
  inputObj.setAttribute('id', 'file')
  inputObj.setAttribute('type', 'file')
  inputObj.setAttribute('name', 'file')
  inputObj.setAttribute('style', 'display:none;')
  document.body.appendChild(inputObj)
  inputObj.value
  inputObj.click()
  return inputObj
}

function readWorkbookFromLocalFile (file, callback) {
  const reader = new FileReader()
  reader.onload = function (e) {
    const data = e.target.result
    const workbook = read(data, { type: 'binary' })
    if (callback) callback(workbook)
  }
  reader.readAsBinaryString(file)
}

export function uploadFile (dataSource) {
  createUploadModal().addEventListener('change', (e) => {
    for (let entry of e?.target?.files) {
      readWorkbookFromLocalFile(entry, (e) => {
        dataSource.value = []
        for (const k in e.Sheets) {
          let i = 0
          for (const _ in e.Sheets[k]) i++
          const length = Math.floor(i / 3)
          try {
            for (let j = 1; j <= length; j++) {
              dataSource.value.push({
                number: e.Sheets[k]['A' + j].v.toString(),
                name: e.Sheets[k]['B' + j].v,
                score: e.Sheets[k]['C' + j].v,
              })
            }
          } catch (e) {
            message.warn('请上传格式正确的excel文件')
          }
        }
      })
    }
  })

}