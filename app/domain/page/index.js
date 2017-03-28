// Tabs: { 键
//   name: 'Tabs', 组件名
//   title: '', 导航条标题，为false表示没有标题栏
//   Inverse: true, 是否深色
//   get Comp() { 路由所渲染的
//     return require('./Tabs').Tabs
//   }
// }
export const Routes = {
  Tabs: {
    name: 'Tabs',
    Title: { home: '首页', category: '分类', me: false },
    Inverse: true,
    get Comp() {
      return require('./Tabs').Tabs
    }
  },
  Login: {
    name: 'Login',
    Title: '登录',
    Inverse: true,
    get Comp() {
      return require('./Login').Login
    }
  }
}
