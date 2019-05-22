import Taro, { Component } from '@tarojs/taro'
// 引入 WebView 组件
import { WebView } from '@tarojs/components'

class Ment extends Component {
  config = {
    navigationBarTitleText: '收藏有礼',
  };
  componentDidMount () {
  }
  render () {
    return (
      <WebView src='https://www.huizustore.com/20190305zulinxieyi.html'  />
    )
  }
}

export default Ment
