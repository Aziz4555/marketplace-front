import { createRouter, createWebHistory } from 'vue-router'

import Signup from "../views/Signup";
import Signin from "../views/Signin";
import Accueil from "../views/Accueil";
import Home from "../views/Home";
import _product from "../views/_product";
import Post from "../views/Post";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/accueil',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: _product
  },
  {
    path: '/formpost',
    name: 'Post',
    component: Post
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
