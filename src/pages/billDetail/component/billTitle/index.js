import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

class BillList extends Component {

  render() {
    const {title, last} = this.props;
    return (
      <View className={'bill-title '+last}>
        <Text className='text'>{title}</Text>
      </View>
    )
  }
}

export default BillList;
