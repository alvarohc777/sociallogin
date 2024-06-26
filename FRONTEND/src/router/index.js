import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'
import { checkAuth } from 'src/lib/auth'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: to => {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth'
        }
      } else {
        return { left: 0, top: 0 }
      }
    },

    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    if (['login', 'index', 'signup'].includes(to.name)) {
      checkAuth().then(isAuthenticated => {
        if (isAuthenticated === true) {
          next({ name: 'dashboard' })
        } else {
          next()
        }
      })
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
      checkAuth().then(isAuthenticated => {
        console.log('is authenticated', isAuthenticated)
        if (isAuthenticated === true) {
          next()
        } else {
          next({ name: 'login' })
        }
      })
    } else {
      next()
    }
  })

  return Router
})
