import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '首页 - 校园二手交易平台' }
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../views/BooksView.vue'),
    meta: { title: '二手书城 - 校园二手交易平台' }
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('../views/GoodsView.vue'),
    meta: { title: '闲置杂货 - 校园二手交易平台' }
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import('../views/JobsView.vue'),
    meta: { title: '校园兼职 - 校园二手交易平台' }
  },
  {
    path: '/book/:id',
    name: 'BookDetail',
    component: () => import('../views/BookDetailView.vue'),
    meta: { title: '图书详情 - 校园二手交易平台' }
  },
  {
    path: '/good/:id',
    name: 'GoodDetail',
    component: () => import('../views/GoodDetailView.vue'),
    meta: { title: '闲置详情 - 校园二手交易平台' }
  },
  {
    path: '/job/:id',
    name: 'JobDetail',
    component: () => import('../views/JobDetailView.vue'),
    meta: { title: '兼职详情 - 校园二手交易平台' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue'),
    meta: { title: '购物车与预订 - 校园二手交易平台' }
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../views/PublishView.vue'),
    meta: { title: '发布中心 - 校园二手交易平台' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/UserProfileView.vue'),
    meta: { title: '学生中心 - 校园二手物品互助平台' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminView.vue'),
    meta: { title: '管理后台 - 校园二手物品互助平台' }
  }
]

const router = createRouter({
  // Use hash history for seamless zero-config GitHub Pages hosting
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
