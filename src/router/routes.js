const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/login', name: 'login', component: () => import('pages/LoginPage.vue') },
      { path: '/signup', name: 'signup', component: () => import('pages/SignUpPage.vue') },
      { path: '/logout', name: 'logout', component: () => import('pages/LogoutPage.vue'), meta: { requiresAuth: true } },
      { path: '/auth', component: () => import('pages/AuthPage.vue'), meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/account/DashboardPage.vue'), meta: { requiresAuth: true } },
      { path: 'providers', name: 'providers', component: () => import('pages/account/ProvidersPage.vue'), meta: { requiresAuth: true } },
      { path: 'sessions', name: 'sessions', component: () => import('pages/account/SessionsPage.vue'), meta: { requiresAuth: true } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
