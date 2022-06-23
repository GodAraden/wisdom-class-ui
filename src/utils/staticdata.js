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
    dataIndex: 'name',
    width: '60%',
  },
  {
    title: '发布者',
    dataIndex: 'age',
  },
  {
    title: '最后修改时间',
    dataIndex: 'address',
  },
]


export { memberColumns, classColumns, noticeColumns };