import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/home'
import dva from './utils/dva'
import models from './models'
import { baseUrl } from './config'
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
      'pages/member/home/index',
      'pages/member/success/index',
      'pages/member/orderExchange/index',
      'pages/idcard/index',
      'pages/webview/xieyi',
      'pages/webview/vipment',
      'pages/express/index',
      'pages/Certificates/index',
      'pages/recharge/index',
      'pages/deposit/index',
      'pages/buyout/index',
      'pages/buyout/confirm',
      'pages/renewal/index',
      'pages/renewal/confirm',
      'pages/checkSuccess/index'
      // 'pages/shareMember/index'
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
          icon: 'http://oss.huizustore.com/77893ace29c349c1b8dd737fc88a576a.png',
          activeIcon: 'http://oss.huizustore.com/b43b8532b3124e99b2b6edb279152136.png',
        },
        // {
        //   name: '会员',
        //   pagePath: 'pages/member/home/index',
        //   icon: 'images/home/member.png',
        //   activeIcon: 'images/home/member_se.png',
        // },
        {
          name: '分类',
          pagePath: 'pages/classify/index',
          icon: 'http://oss.huizustore.com/8f9853676f184b29a4897927cfefec27.png',
          activeIcon: 'http://oss.huizustore.com/da86f4ce10364856af90f15c557bddb8.png',
        },
        {
          name: '我的',
          pagePath: 'pages/mine/index',
          icon: 'http://oss.huizustore.com/25d360d609c34f829652a70da79bf8bf.png',
          activeIcon: 'http://oss.huizustore.com/7f45042e4d4245b49cc9e8327740ade6.png',
        },
      ],
    },
  }
  componentWillMount = (options) => {
    const obj = this.$router.params
    const { query } = obj
    if(query && query.type){
      my.httpRequest({
        url: baseUrl+'aliPay/index/getZhifubaoFlow',
        data:{
          type:query.type
        },
        // data: newObj,
        headers:{
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
    }
  }
  componentDidMount (options) {


  }
  componentDidShow () {
  }

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
