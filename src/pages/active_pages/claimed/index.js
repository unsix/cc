import Taro, { Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Back from '../../../images/active_page/back.png'
import ToSee from '../../../images/active_page/tosee.png'
import './index.scss';
@connect(({ unclaimed }) => ({
  ...unclaimed,
}))
class RedCollect extends Component {
  config = {
    navigationBarTitleText: '收藏有礼',
  };

  toBack = () => {
    Taro.switchTab({ url: '/pages/home/index' })
  }
  toSee = () => {
    Taro.navigateTo({ url: '/pages/coupon/index' });
  }
  render() {
    return (
      <View className='red_claimed'>
        <View className='red_bg'>
          <View className='complete'>
            <Image className='complete_img' onClick={this.toBack} src={Back} />
            <Image className='complete_img' onClick={this.toSee} src={ToSee} />
          </View>
        </View>
      </View>
    )
  }
}

export default RedCollect
