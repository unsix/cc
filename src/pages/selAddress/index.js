import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import AddressItem from './component/addressItem/index';
import './index.scss';

@connect(({ sendBack }) => ({
  ...sendBack,
}))
class SelAddress extends Component {
  config = {
    navigationBarTitleText: '选择地址',
  };

  componentDidMount = () => {

  };

  handleClick = (index) => {
    const { dispatch, userOrders } = this.props;
    dispatch({
      type: 'sendBack/saveGiveBackIndex',
      payload: index,
    });
    Taro.redirectTo({ url: `/pages/sendBack/index?orderId=${userOrders.orderId}` });
  }

  render() {
    const { giveBackAddressList } = this.props;

    return (
      <View className='selAddress-page'>
        {!!giveBackAddressList && !!giveBackAddressList.length && giveBackAddressList.map((data, index) =>
          <View onClick={this.handleClick.bind(this, index)}>
            <AddressItem data={data} />
          </View>
        )}
      </View>
    )
  }
}

export default SelAddress;
