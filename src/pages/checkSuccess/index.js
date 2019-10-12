import Taro, { Component} from '@tarojs/taro'
import { View , Image,} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss';
@connect(({ checkSuccess ,loading}) => ({
  ...checkSuccess,
  loading: loading.models.checkSuccess,
}))
class RedCollect extends Component {
  config = {
    navigationBarTitleText: '下单成功',
  };
  state={

  }
  componentDidMount () {
    const { dispatch  } = this.props
    const { orderId } = this.$router.params
    dispatch({
      type:'checkSuccess/getOrderBySuccess',
      payload:{orderId}
    })
  }

  goOrderDetail = () => {
    const { orderId } = this.$router.params
    // Taro.redirectTo({ url: `/pages/orderDetail/index?orderId=${orderId}` })
    Taro.switchTab({
      url:`/pages/mine/index`
    })
  }
  goHome = () => {
    Taro.switchTab({ url: '/pages/home/index' })
  }
  render() {
    const {loading,firstRent,creditFreeze,orderDeposit,realFreeze,restBuyOutPrice,restRent,status,totalPeriods}= this.props
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='container-suc'>
        <View className='top'>
          <Image className='img' src='http://oss.huizustore.com/402cc8a52bb84a3583a78b80e1158a68.png' />
        </View>
        <View className='content'>
          <View className='header'>
            <View className='item'>
              <View className='item-left'>
                第一期租金
              </View>
              <View className='item-right'>
                ¥{firstRent.toFixed(2)}
              </View>
            </View>
          </View>
          <View className='con'>
            {
              totalPeriods>1 &&(
              <View className='item'>
                <View className='item-left'>
                  分期还款计划
                </View>
                    <View className='item-right'>
                      ¥{Number(restRent).toFixed(2)}✖️{totalPeriods-1}期
              </View>
            </View>
              )
            }
            <View className='item'>
              <View className='item-left'>
                租金还款方式
              </View>
              <View className='item-right'>
                主动支付
              </View>
            </View>
          </View>
          <View className='bom'>
            <View className='item'>
              <View className='item-left all'>
                总押金
              </View>
              <View className='item-right all'>
               ¥{orderDeposit.toFixed(2)}
              </View>
            </View>
            <View className='item'>
              <View className='item-left'>
                信用免押金
              </View>
              <View className='item-right'>
                ¥{creditFreeze.toFixed(2)}
              </View>
            </View>
            <View className='item'>
              <View className='item-left frozen'>
                冻结押金
              </View>
              <View className='item-right frozen'>
                ¥{realFreeze.toFixed(2)}
              </View>
            </View>
          </View>
        </View>
        <View className='buy_price'>
          <View className='header'>
            <View className='item'>
              {status === 0 && (
                <View className='item-left'>
                  参考到期买断价
                </View>
              )}
              {(status === 2 || status === 1) && (
                <View className='item-left'>
                  到期买断价
                </View>
              )}
              { status === 1 ?
                (
                  <View className='item-right'>
                    该商品暂不支持买断
                  </View>
                )
                :
                (
                  <View className='item-right'>
                    ¥{restBuyOutPrice.toFixed(2)}
                  </View>
                )
              }
            </View>
          </View>
          {status === 0 && (
            <View className='con'>
              <View className='item'>
                <View className='item-left frozen'>
                  规格为“租就送”，“免归还”，“一元买断”商品买断价为0元/1元
                </View>
              </View>
            </View>
          )}
        </View>
        <View className='footer'>
          <View className='item order' onClick={this.goOrderDetail}>
            查看订单
          </View>
          <View className='item home' onClick={this.goHome}>
            返回首页
          </View>
        </View>
      </View>
    )
  }
}

export default RedCollect
