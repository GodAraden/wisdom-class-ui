import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/auth'
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
        permission: -1,
        component: () => import('@/views/notice/Notice.vue')
      }, {
        path: 'resource',
        name: '教学资源',
        permission: -1,
        component: () => import('@/views/resource/Resource.vue')
      }, {
        path: 'members',
        name: '成员管理',
        permission: 0,
        component: () => import('@/views/members/Members.vue')
      }, {
        path: 'homework',
        name: '作业发布',
        permission: 0,
        component: () => import('@/views/homework/Homework.vue')
      }, {
        path: 'score',
        name: '成绩管理',
        permission: 0,
        component: () => import('@/views/score/Score.vue')
      }, {
        path: 'my-homework',
        name: '我的作业',
        permission: 1,
        component: () => import('@/views/homework/MyHomework.vue')
      }, {
        path: 'my-score',
        name: '我的成绩',
        permission: 1,
        component: () => import('@/views/score/MyScore.vue')
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