import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from "taro-ui"
import './index.scss';

class ListType extends Component {
  render() {
    const { title, display, iconShow, subText, desc } = this.props;
    return (
      <View className='list-type'>
        <View className='list-type-left'>
          <View>
            <Text className='title'>{title}</Text>
          </View>
          <View style={{display}} className='info'>
            <Text className='text'>{desc}</Text>
          </View>
        </View>
        <View className='list-type-right'>
          <View className='title'>
            <Text className='text'>{subText}</Text>
          </View>
          {
          iconShow &&
          <AtIcon value='chevron-right' size='20' color='#ccc' />
          }
        </View>
      </View>
    )
  }
}

export default ListType;
