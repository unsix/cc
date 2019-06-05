import Taro, { Component} from '@tarojs/taro'
import { View ,Image,Button,Text} from '@tarojs/components'
import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import './index.scss'

class orderExchange extends Component {
  config = {
    navigationBarTitleText: '兑换订单',
  };
  constructor () {
    super(...arguments)
    this.state = {
      open: false,
      list:[]
    }
  }
  toBack = () => {
    Taro.switchTab({ url: '/pages/home/index' })
  }
  toSee = () => {
    Taro.navigateTo({ url: '/pages/coupon/index' })
  }

  handleClick (value) {
    console.log(value)
    this.setState({
      open: value
    })
  }
  render() {
    const { loading }= this.props
    const { list } = this.state
    console.log(this.state)
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='container_exchange'>
        <View className='header'>
          <View className='item'>
            <View className='text-title'>我的金豆
              <Text className='text-tips'>(永久有效)</Text>
            </View>
            <View className='text-beans'>0</View>
            <View className='text-border'>

            </View>
            <View className='text-discount'>抵扣比例：100金豆=1元</View>
          </View>
        </View>
        <View className='content'>
          <View className='title'>
            <View className='text'>
              <View>收支明细</View>
              <View>
                全部
              </View>
            </View>
          </View>
          <View className='item'>
          { list && !!list.length?
            ( <View>123</View>):
            (<Image className='img' src={require('../../../images/member/exchange_none.png')} />)

          }
          </View>
        </View>

      </View>
    )
  }
}

export default orderExchange
