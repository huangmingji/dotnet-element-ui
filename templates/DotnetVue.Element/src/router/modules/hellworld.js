import Layout from '../../layout/index'

const helloWorldRouter = {
  path: '/helloworld',
  component: Layout,
  children: [
    {
      path: '',
      name: 'HelloWorld',
      component: () => import('../../components/HelloWorld')
    },
    {
      path: 'index',
      name: 'HelloWorld1',
      component: () => import('../../components/HelloWorld'),
      meta: {
        permissions: ['HelloWorld.Show'],
        title: 'HelloWorld',
        icon: 'skill'
      }
    }
  ]
}

export default helloWorldRouter
