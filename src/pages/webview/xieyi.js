import Taro, { Component } from '@tarojs/taro'
// 引入 WebView 组件
import { WebView } from '@tarojs/components'

class Ment extends Component {
  config = {
    navigationBarTitleText: '租赁协议',
  };
  componentDidMount () {
  }
  render () {
    return (
      <WebView src='https://www.huizustore.com/zuping.html'  />
    )
  }
}

export default Ment
