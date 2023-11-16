// Composables
import { createRouter, createWebHistory } from 'vue-router'
import ViewVideo from "@/views/ViewVideo.vue";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/register',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Register',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Register.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Dashboard.vue'),
      },
    ],
  },
  {
    path: '/upload',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Upload',
        component: () => import('@/views/Upload.vue'),
      },
    ],
  },
  {
    path: '/myvideos',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'MyVideos',
        component: () => import('@/views/MyVideos.vue'),
      },
    ],
  },
  {
    path: '/test',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Test',
        component: () => import('@/views/Test.vue'),
      },
    ],
  },
  {
    path: '/test2',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Test2',
        component: () => import('@/views/Test2.vue'),
      },
    ],
  },
  {
    path: '/test3',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Test3',
        component: () => import('@/views/Test3.vue'),
      },
    ],
  },
  {
    path: '/viewVideo/:id',

    name: 'viewVideo',
    props: true,
    component: ViewVideo
  },
  // {
  //   path: '/viewVideo/:id',
  //   component: () => import('@/layouts/default/Default.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'viewVideo',
  //       component: ViewVideo,
  //     },
  //   ],
  // },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
