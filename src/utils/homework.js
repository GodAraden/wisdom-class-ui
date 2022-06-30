class FormComponent {
  constructor(type) {
    this.key = FormComponent._index++
    this.type = type
    this.title = ''
    this.required = false
    this.placeholder = ''
    this.options = []
    switch (this.type) {
      case 1:
      case 3:
      case 4:
      case 5:
        this.value = ''
        break
      case 2:
      case 6:
        this.value = []
        break
    }
  }
  typeToText () {
    switch (this.type) {
      case 1:
        return "单项选择"
      case 2:
        return '多项选择'
      case 3:
        return '下拉选择'
      case 4:
        return '单行文本输入'
      case 5:
        return '多行文本输入'
      case 6:
        return '文件上传'
    }
  }
}

export function getFullTitle (formComponent) {
  return `【${formComponent.required ? '必填' : '非必填'}】 ${formComponent.title}`
}

export { FormComponent }