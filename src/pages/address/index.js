import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import AddressItem from './component/addressItem/index'
import './index.scss';

@connect(({ address, loading }) => ({
  ...address,
  loading: loading.models.address,
}))
class Address extends Component {
  config = {
    navigationBarTitleText: '收货地址',
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'address/getUserAllAddressList',
    });
  };

  gotoAdd = () => {
    Taro.navigateTo({ url: '/pages/addAddress/index' });
  }

  onEditAddress = (id) => {
    Taro.navigateTo({ url: `/pages/addAddress/index?id=${id}` });
  }

  onDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addAddress/deleteAddress',
      payload: { id },
    });
  }

  onDefault = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addAddress/subAddress',
      payload: { id, isDefault: 1 },
    });
  }

  handleSelect = (index) => {
    const { dispatch, list } = this.props;
    const { type } = this.$router.params;
    if (type === 'select') {
      dispatch({
        type: 'confirmOrder/setDefaultUserAddress',
        payload: list[index],
      });
      Taro.navigateBack();
    }
  }

  render() {
    const { list, loading } = this.props;

    // eslint-disable-next-line no-undef
    (loading) ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='address-page'>
        {list && list.length && list.map((data, index) => (
          <View onClick={this.handleSelect.bind(this, index)}>
            <AddressItem
              data={data}
              onEditAddress={this.onEditAddress}
              onDefault={this.onDefault}
              onDelete={this.onDelete}
            />
          </View>
        ))}
        <View className='address-page-btn'>
          <Button className='btn' onClick={this.gotoAdd}>新增地址</Button>
        </View>
      </View>
    )
  }
}

export default Address;
