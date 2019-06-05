import Taro, { Component} from '@tarojs/taro'
import { View ,Image,Button,Text} from '@tarojs/components'
import './index.scss'

class idCard extends Component {
  config = {
    navigationBarTitleText: '开通成功',
  };
  state={

  }

  toBack = () => {
    Taro.switchTab({ url: '/pages/home/index' })
  }
  toSee = () => {
    Taro.navigateTo({ url: '/pages/coupon/index' })
  }

  getOn= () => {
    my.getFileInfo({
      apFilePath:'https://resource/apml953bb093ebd2834530196f50a4413a87.video',
      digestAlgorithm:'sha1',
      success:(res)=>{
        console.log(JSON.stringify(res))
      }
    })
  }
  render() {
    const { loading }= this.props
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='container_idcard'>
       <View className='img' onClick={this.getOn}>
         <uploadFile />
       </View>
      </View>
    )
  }
}

export default idCard
