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
  componentDidShow () {
    Taro.setStorageSync(`isShow_s`, 1);
  }
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'address/getUserAllAddressList',
    });
  };
  componentWillUnmount  () {
    if(Taro.getStorageSync(`isShow_s`) == 1 ){
      Taro.setStorageSync(`isShow`, 1);//1为显示
    }
  }
  gotoAdd = () => {
    Taro.navigateTo({ url: '/pages/addAddress/index' });
  }

  onEditAddress = (id) => {

  }

  onDelete = (id) => {
    const { dispatch ,list } = this.props;
    // console.log(list,'listshangchu')
    if(list.length==1){
      Taro.setStorageSync(`isShow_s`,1)
      Taro.setStorageSync(`isShow`, 1);
    }else{
      Taro.setStorageSync(`isShow_s`, 2);
      Taro.setStorageSync(`isShow`, 0);//1为显示
    }
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

    // console.log(list,'dewrf')
    if(list.length==1){
      Taro.setStorageSync(`isShow_s`,1)
      Taro.setStorageSync(`isShow`, 1);
    }else{
      Taro.setStorageSync(`isShow_s`, 2);
      Taro.setStorageSync(`isShow`, 0);//1为显示
    }
    if (type === 'select') {
      dispatch({
        type: 'confirmOrder/setDefaultUserAddress',
        payload: list[index],
      });
      Taro.navigateBack();
    }
  }
  alipayAddress = () => {
    const { dispatch } = this.props
    my.getAddress({
      success: (res) => {
        const obj = res.result
        if(res.result){
          dispatch({
            type:'address/saveZhifubaoAddress',
            payload:{
              areaStr: obj.area,
              cityStr: obj.city,
              // id: 0,
              isDefault: 0,
              provinceStr: obj.prov,
              realname: obj.fullname,
              street: obj.address,
              telephone: obj.mobilePhone,
            },
            callback:()=>{
              dispatch({
                type: 'address/getUserAllAddressList',
              });
            }
          })
        }
      }
    });
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
          <Button className='btn btn_auth' onClick={this.alipayAddress}>获取支付宝收货地址</Button>
          <Button className='btn btn_add' onClick={this.gotoAdd}> + 新增地址</Button>
        </View>
      </View>
    )
  }
}

export default Address;

