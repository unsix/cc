import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';

class NoData extends Component {

  render() {
    const { display, type } = this.props;
    return (
      <View className='no-data' style={{ display }}>
        {
          type === 'order' ?
            <Image mode='aspectFit' src='../../images/common/order.png' className='img' /> :
            <Image mode='aspectFit' src='../../images/common/coupon.png' className='img' />
        }

        <View className='text-center'>
          <Text className='text'>{type === 'order' ? '当前暂无订单' : '当前暂无优惠券可用'}</Text>
        </View>
        <View className='text-center'>
          <Text className='text'>{type === 'order' && '快去找自己心仪的商品下单吧'}</Text>
        </View>
      </View>
    )
  }
}

export default NoData;
