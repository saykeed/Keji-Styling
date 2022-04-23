import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('../views/Wishlist.vue')
  },
  // {
  //   path: '/post',
  //   name: 'Post',
  //   component: () => import('../views/Post.vue')
  // },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Admin_page/Dashboard.vue')
  },
  {
    path: '/admin_page/dashboard/Products/post',
    name: 'Post',
    component: () => import('../views/Admin_page/Post.vue')
  },
  {
    path: '/admin_page/dashboard/Products/delete',
    name: 'Delete',
    component: () => import('../views/Admin_page/Delete.vue')
  },
  {
    path: '/admin_page/dashboard/Products/update',
    name: 'Update',
    component: () => import('../views/Admin_page/Update.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
