import Taro, { Component} from '@tarojs/taro'
import { View ,Image,Button,Text} from '@tarojs/components'

class paySuccess extends Component {
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


  render() {
    const { loading }= this.props
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='container_success'>
        <View className='success_img'>
          <Image className='img' src={require('../../../images/member/success.png')} />
        </View>
        <View className='content'>
          <View className='price'>￥<Text className='num'>568</Text></View>
          <View className='get_equity'>
            获得权益
          </View>
          <View className='equity'>
            <View className='item'>
              <View className='item-img'>
                <Image className='img' src={require('../../../images/member/beans_exc.png')} />
              </View>
              <View className='item-text'>
                <View className='text'>
                  获得租金豆 <Text className='num'>+5000金</Text>
                </View>
                <View className='word'>
                  金豆当钱花
                </View>
              </View>
              <View className='get'>
                已获得
              </View>
            </View>
            <View className='item'>
              <View className='item-img'>
                <Image className='img' src={require('../../../images/member/discount_exc.png')} />
              </View>
              <View className='item-text'>
                <View className='text'>
                  全场享折扣
                </View>
                <View className='word'>
                  会员折扣9折起
                </View>
              </View>
              <View className='get'>
                已获得
              </View>
            </View>
            <View className='item'>
              <View className='item-img'>
                <Image className='img' src={require('../../../images/member/price_exc.png')} />
              </View>
              <View className='item-text'>
                <View className='text'>
                  免押额度增加
                </View>
                <View className='word'>
                  免押总额度增加500元
                </View>
              </View>
              <View className='get'>
                已获得
              </View>
            </View>
            <View className='item'>
              <View className='item-img'>
                <Image className='img' src={require('../../../images/member/ship_exc.png')} />
              </View>
              <View className='item-text'>
                <View className='text'>
                  包邮劵
                </View>
                <View className='word'>
                  回寄包邮一次
                </View>
              </View>
              <View className='get'>
                已获得
              </View>
            </View>
          </View>
        </View>
        <View className='footer'>
          <Button className='back'>
            取消
          </Button>
          <Button className='to-see'>
            查看权益
          </Button>
        </View>
      </View>
    )
  }
}

export default paySuccess
