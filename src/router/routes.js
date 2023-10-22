import MainLayout from '../layouts/MainLayout.vue'
import LoginPage from '../pages/LoginPage.vue'
import IndexPage from '../pages/IndexPage.vue'
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: IndexPage,
        meta: { requireAuth: true }
      },
      { path: 'login', component: LoginPage }
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
