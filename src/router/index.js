import { createRouter, createWebHistory } from 'vue-router'
import { OrderedListOutlined, FolderOpenOutlined, TeamOutlined, FileAddOutlined, FileOutlined, PieChartOutlined, LineChartOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const routes = [
  {
    path: '/',
    redirect: '/user'
  }, {
    path: '/login',
    redirect: '/user'
  },
  {
    path: '/user',
    component: () => import('@/views/User.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '',
        redirect: '/main/notice'
      }, {
        path: 'notice',
        name: '班级通知',
        icon: () => h(OrderedListOutlined),
        permission: -1,
        component: () => import('@/views/notice/Notice.vue')
      }, {
        path: 'resource',
        name: '教学资源',
        icon: () => h(FolderOpenOutlined),
        permission: -1,
        component: () => import('@/views/resource/Resource.vue')
      }, {
        path: 'members',
        name: '成员管理',
        icon: () => h(TeamOutlined),
        permission: 0,
        component: () => import('@/views/members/Members.vue')
      }, {
        path: 'homework',
        name: '作业发布',
        icon: () => h(FileAddOutlined),
        permission: 0,
        component: () => import('@/views/homework/Homework.vue')
      }, {
        path: 'score',
        name: '成绩管理',
        permission: 0,
        icon: () => h(PieChartOutlined),
        component: () => import('@/views/score/Score.vue')
      }, {
        path: 'my-homework',
        name: '我的作业',
        icon: () => h(FileOutlined),
        permission: 1,
        component: () => import('@/views/homework/MyHomework.vue')
      }, {
        path: 'my-score',
        name: '我的成绩',
        icon: () => h(LineChartOutlined),
        permission: 1,
        component: () => import('@/views/score/MyScore.vue')
      }, {
        path: 'score-manage',
        name: 'score-manage',
        component: () => import('@/views/score/Manage.vue'),
        props: true
      }, {
        path: 'score-analyze',
        name: 'score-analyze',
        component: () => import('@/views/score/Manage.vue'),
        props: true
      }
    ]
  }, {
    path: '/auth',
    component: () => import('@/views/Auth.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router