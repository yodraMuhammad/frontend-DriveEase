import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/DashboardView.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

import LandingPage from '../views/landing/LandingView.vue'
import Login from '../views/landing/LoginView.vue'
import Register from '../views/landing/RegisterView.vue'

// car-povider
import CarList from '../views/car-povider/CarListView.vue'
import OwenerTransactions from '../views/car-povider/TransactionsView.vue'

// car-renter
import CarListRent from '../views/car-renter/CarListView.vue'
import Transactions from '../views/car-renter/TransactionsView.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: LandingPage },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [{ path: '', component: Dashboard }],
    meta: { requiresAuth: true },
  },
  {
    path: '/provider',
    component: DashboardLayout,
    children: [
      { path: 'car-list', component: CarList },
      { path: 'transactions', component: OwenerTransactions },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/renter',
    component: DashboardLayout,
    children: [
      { path: 'available-cars', component: CarListRent },
      { path: 'transactions', component: Transactions },
    ],
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
