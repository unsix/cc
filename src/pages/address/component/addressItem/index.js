import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtSwipeAction } from "taro-ui"

import './index.scss';

class AddressItem extends Component {
  config = {
    'usingComponents': {
      "swipe-action": "../../../../npm/mini-antui/es/swipe-action/index"
    }
  };

  state = {
    swipeIndex: null,
  }

  right = [
    {
      text: '设为默认',
      type: 'edit',
      style: {
        backgroundColor: '#F6F6F6',
        color: '#333333',
      }
    },
    {
      text: '删除',
      type: 'delete',
      style: {
        backgroundColor: '#FC766B'
      }
    }
  ]

  handleClick = (id) => {
    const { onEditAddress } = this.props;
    onEditAddress(id);
  }

  handleSwipeClick = (e) => {
    const { onDefault, onDelete, data } = this.props;
    if (e.detail.type === 'edit') {
      onDefault(data.id);
    } else {
      onDelete(data.id);
    }
  }

  render() {
    const { data } = this.props;
    return (
      <View className='address-item'>
        <swipe-action
          index={this.state.swipeIndex}
          onRightItemClick={this.handleSwipeClick.bind(this)}
          right={this.right}
        >
          <View className='address-item-normal'>
            <View className='addr-user'>
              <View className='top'>
                <Text className='text'>{data.realname}</Text>
                <Text className='text num'>{data.telephone}</Text>
                {data.isDefault && (
                  <Text className='tag'>默认</Text>
                )}
              </View>
              <View className='bottom'>
                <Text className='text'>{data.provinceStr}{data.cityStr}{data.areaStr}{data.street}</Text>
              </View>
            </View>
            <View onClick={this.handleClick.bind(this, data.id)} className='addr-info'>
              <Text>编辑</Text>
            </View>
            <View className='border-bottom'></View>
          </View>
        </swipe-action>
      </View>
    )
  }
}

export default AddressItem;
