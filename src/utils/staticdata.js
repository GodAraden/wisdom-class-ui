import { h } from "vue"
import { EditTwoTone, CopyTwoTone, SnippetsTwoTone } from '@ant-design/icons-vue'

const memberColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '30%',
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
  },
  {
    title: '用户类型',
    dataIndex: 'user_type',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
]

const classColumns = [
  {
    title: '班级名称',
    dataIndex: 'name',
    width: '50%',
  },
  {
    title: '创建者',
    dataIndex: 'creator',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
]

const noticeColumns = [
  {
    title: '标题',
    dataIndex: 'title',
    width: '50%',
  },
  {
    title: '发布者',
    dataIndex: 'creator',
    width: '20%',
  },
  {
    title: '最后修改时间',
    dataIndex: 'last_changed',
    width: '30%',
  },
]

const subjectColumns = [
  {
    title: '科目名称',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: '考试时间',
    dataIndex: 'date',
    width: '20%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: '55%',
  },
]

const scoreColumns = [
  {
    title: '学号',
    dataIndex: 'number',
    width: '40%',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: '分数',
    dataIndex: 'score',
    width: '15%',
  }
]

const homeworkColumns = [
  {
    title: '作业标题',
    dataIndex: 'title',
    width: '40%',
  },
  {
    title: '发布者',
    dataIndex: 'creator',
    width: '25%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '15%',
  }
]

const homeworkBtnGroup = [
  {
    icon: () => h(EditTwoTone),
    description: '发布新的作业',
  }, {
    icon: () => h(CopyTwoTone),
    description: '已有作业预览',
  }, {
    icon: () => h(SnippetsTwoTone),
    description: '作业结果查看',
  }
]

const homeworkComponents = [{
  key: 1,
  header: '选择组件',
  components: [{
    type: 1,
    text: "单选",
    img: "https://gw.alipayobjects.com/zos/alicdn/8cYb5seNB/Radio.svg"
  }, {
    type: 2,
    text: "多选",
    img: "https://gw.alipayobjects.com/zos/alicdn/8nbVbHEm_/CheckBox.svg"
  }, {
    type: 3,
    text: "下拉菜单",
    img: "https://gw.alipayobjects.com/zos/alicdn/_0XzgOis7/Select.svg"
  }]
}, {
  key: 2,
  header: '问答组件',
  components: [{
    type: 4,
    text: "输入框",
    img: "https://gw.alipayobjects.com/zos/alicdn/xS9YEJhfe/Input.svg"
  }, {
    type: 5,
    text: "文本域",
    img: "https://gw.alipayobjects.com/zos/alicdn/KpcciCJgv/Skeleton.svg"
  }]
}, {
  key: 3,
  header: '其他组件',
  components: [{
    type: 6,
    text: "文件上传",
    img: "https://gw.alipayobjects.com/zos/alicdn/QaeBt_ZMg/Upload.svg"
  }]
}, {
  key: 4,
  header: '敬请期待',
  collapsible: "disabled",
}]

const resultColumns = [
  {
    title: '姓名',
    width: 100,
    dataIndex: 'user',
    fixed: 'left',
  },
  {
    title: '分数',
    width: 100,
    dataIndex: 'score',
    fixed: 'left',
  },

]

export { memberColumns, classColumns, noticeColumns, subjectColumns, scoreColumns, homeworkColumns, homeworkBtnGroup, homeworkComponents, resultColumns };