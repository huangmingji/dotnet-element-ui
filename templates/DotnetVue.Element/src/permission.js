import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from './utils/auth' // get token from cookie
import getPageTitle from './utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

function routeNext (to, from, next) {
  if (!to.meta.permissions) {
    next()
    return
  }

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/dashboard' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.permissions && store.getters.permissions.length > 0
      if (hasRoles) {
        if (hasPermission(store.getters.permissions, to.meta.permissions)) {
          next()
        } else {
          next({path: '/401', replace: true, query: { noGoBack: true }})
        }
      } else {
        try {
          // get user info
          store.dispatch('user/getInfo').then(res => {
            const permissions = res.data.permissions
            // generate accessible routes map based on roles
            store.dispatch('permission/generateRoutes', permissions).then(response => {
              // dynamically add accessible routes
              router.addRoutes(response)

              // hack method to ensure that addRoutes is complete
              // set the replace: true, so the navigation will not leave a history record
              next({ to, replace: true })
            }).catch((err) => {
              store.dispatch('user/resetToken').then(() => {
                Message.error(err || 'Verification failed, please login again')
                next({ path: '/' })
              })
            })
          })
        } catch (error) {
          // remove token and go to login page to re-login
          store.dispatch('user/resetToken').then(() => {
            Message.error(error || 'Has Error')
            next(`/login`)
            NProgress.done()
          })
        }
      }
    }
  } else {
    next(`/login`)
    NProgress.done()
  }
}

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  routeNext(to, from, next)
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

function hasPermission (userPermissions, permissions) {
  if (!permissions) return true
  return userPermissions.some(role => permissions.indexOf(role) >= 0)
}
