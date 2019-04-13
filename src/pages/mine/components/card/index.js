import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

class Card extends Component {

  render() {
    const { data } = this.props;
    return (
      <View className='card'>
        <View className='card-img'>
          <Image className='img' mode='aspectFit' src={data.images} />
        </View>
        <View className='card-title'>
          <View className='title'>
            <Text className='name'>{data.name}</Text>
          </View>
          <View className='other'>
            <Text className='text'>{data.oldNewDegree} <Text style={{ padding: '0 5px' }}>|</Text> {data.min_rent_cycle}天起租</Text>
          </View>
          <View className='price'>
            <Text className='box'>&yen; <Text className='num'>{data.price.split('.')[0]}</Text>.{data.price.split('.')[1]} /天</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Card;
