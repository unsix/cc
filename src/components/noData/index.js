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
          <Text className='text'>{type === 'order' ? '当前暂无订单' : null}</Text>
        </View>
        <View className='text-center'>
          <Text className='text'>{type === 'order' && '快去找自己心仪的商品下单吧'}</Text>
        </View>
        <View className='text-center'>
          <Text className='text'>{type === 'coupon' ? '当前暂无优惠券可用':null}</Text>
        </View>
        <View className='text-center'>
          <Text className='text'>{type === 'equity' ? '暂无权益可用':null}</Text>
        </View>
        <View className='text-center'>
          <Text className='text'>{type === 'deposit' ? '当前无充值记录':null}</Text>
        </View>
        <View className='text-center'>
          <Text className='text'>{type === 'express' ? '物流信息暂无更新':null}</Text>
        </View>
        <View className='text-center'>
          <Text className='text'>{type === 'receive-coupon' ? '暂无优惠劵可领取':null}</Text>
        </View>
      </View>
    )
  }
}

export default NoData;
