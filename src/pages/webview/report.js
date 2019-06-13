import Taro, { Component } from '@tarojs/taro'
// 引入 WebView 组件
import { WebView } from '@tarojs/components'

class Report extends Component {
  config = {
    navigationBarTitleText: '洞察报告',
  };
  componentDidMount () {
  }
  render () {
    return (
      <WebView src='https://www.huizustore.com/report_standard.html'  />
    )
  }
}
