import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components'
import { formatStrDate } from '../../../../utils/utils';
import './index.scss';

class MemberCouponList extends Component {

  gotoHome(status) {
    Taro.switchTab({ url: '/pages/home/index' });
    if (status === 0) {
    }
  }

  handExchange (data) {
    const { onClick } = this.props
    onClick(data)
  }
  render() {
    const { data } = this.props
    // const durationStr = `${formatStrDate(data.start, 'yyyy.MM.dd')}-${formatStrDate(data.end, 'yyyy.MM.dd')}`;
    return (
      <View className='shop-list'>
        <View className='item'>
          <View className='item-img'>
            <Image className='img' src={data.couponImgUrl} />
          </View>
          <View className='item-text'>
            <View className='text-bold'>
              {data.name}
            </View>
            <View className='text-shallow'>{data.description}</View>
            <View className='text-time'>{data.duration}天有效</View>
            <View className='text-beans'>{data.integralAmount}金豆</View>
            <View className='text-sales'>
              <View className='sales'>
                已售{data.sellAmount}份
              </View>
              <View className='exchange'>
                <View className='exchange_btn' onClick={this.handExchange.bind(this,data)}>立即兑换</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default MemberCouponList;
