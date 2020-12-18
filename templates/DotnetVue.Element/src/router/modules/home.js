
const homeRouter = {
  path: '/',
  name: 'Home',
  component: () => import('../../views/home/index')
}

export default homeRouter
