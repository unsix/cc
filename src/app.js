import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/home'
import dva from './utils/dva'
import models from './models'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {

  config = {
    pages: [
      'pages/home/index',
      'pages/address/index',
      'pages/classify/index',
      'pages/mine/index',
      'pages/shops/index',
      'pages/productList/index',
      'pages/productDetail/index',
      'pages/search/index',
      'pages/shops/index',
      'pages/confirmOrder/index',
      'pages/serviceProtocol/index',
      'pages/addAddress/index',
      'pages/realName/index',
      'pages/orderDetail/index',
      'pages/orderList/index',
      'pages/coupon/index',
      'pages/billDetail/index',
      'pages/freshman/index',
      'pages/sendBack/index',
      'pages/selAddress/index',
      'pages/active_pages/unclaimed/index',
      'pages/webview/report',
      'pages/report/home/index',
      'pages/report/pay/index',
      'pages/report/presentation/index',
      'pages/report/read/index',
      'pages/report/report_case/index',
      'pages/report/report_results/index',
      'pages/member/index',
      'pages/webview/xieyi',
      'pages/webview/vipment'
    ],
    window: {
      titleBarColor: '#fff',
      defaultTitle: 'alipay',
    },
    tabBar: {
      textColor: '#333333',
      selectedColor: '#FC766B',
      backgroundColor: '#fff',
      items: [
        {
          name: '首页',
          pagePath: 'pages/home/index',
          icon: 'images/home/home.png',
          activeIcon: 'images/home/home_se.png',
        },
        {
          name: '分类',
          pagePath: 'pages/classify/index',
          icon: 'images/home/classify.png',
          activeIcon: 'images/home/classify_se.png',
        },
        {
          name: '我的',
          pagePath: 'pages/mine/index',
          icon: 'images/home/mine.png',
          activeIcon: 'images/home/mine_se.png',
        },
      ],
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
