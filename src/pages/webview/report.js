import Taro, { Component } from '@tarojs/taro'
// 引入 WebView 组件
import { WebView } from '@tarojs/components'

class Report extends Component {
  config = {
    navigationBarTitleText: '洞察报告',
  };
  componentDidMount () {
    if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY){
      my.setStorage({
        key: 'type',
        data: {
         type:3
        },
        success: function() {
          my.alert({content: '写入成功'});
        }
      });
    }
    else {

      console.log(666666)
    }
  }
  render () {
    return (
      <WebView src='https://www.laiyongmall.com/report/index.html?type=3'  />
    )
  }
}
