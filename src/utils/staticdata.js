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
    dataIndex: 'address',
    width: '40%',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: '分数',
    dataIndex: 'age',
    width: '15%',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  },
]

export { memberColumns, classColumns, noticeColumns, subjectColumns, scoreColumns };