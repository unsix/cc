import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { customerServiceTel } from '../../assets/Constant';
import './index.scss';

@connect(({ shops }) => ({
  ...shops,
}))
class Shops extends Component {
  config = {
    navigationBarTitleText: '店铺',
    usingComponents: {
      "modal": "../../npm/mini-antui/es/modal/index"
    }
  };

  state = {
    showServicePhone: false,
  }

  componentDidMount = () => {
    const { queryInfo } = this.props;
    this.setDispatch({ ...queryInfo, pageNumber: 1 });
  };

  setDispatch(queryInfo, fetchType) {
    const { shopId } = this.$router.params;
    const { dispatch } = this.props;
    const info = { ...queryInfo, shopId };
    if (fetchType === 'scroll') {
      info.pageNumber += 1;
      info.fetchType = fetchType;
    }
    dispatch({
      type: 'shops/selectShopProductList',
      payload: { ...info },
    });
  }

  onScrollToLower = () => {
    const { total, queryInfo, queryInfo: { pageNumber, pageSize } } = this.props;
    if (pageNumber * pageSize - total >= 0) {
      Taro.showToast({
        title: '没有更多商品了',
        icon: 'none',
        duration: 500,
      });
      return;
    }
    this.setDispatch(queryInfo, 'scroll');
  };

  gotoProductDetail = (productId) => {
    Taro.navigateTo({ url: `/pages/productDetail/index?itemId=${productId}` });
  }

  onClosePhoneModal = () => {
    this.setState({ showServicePhone: false });
  }

  onShowPhoneModal = () => {
    this.setState({ showServicePhone: true });
  }

  connectService = (number) => {
    let num = String(number);
    my.makePhoneCall({ number:num });
  }


  render() {
    const { list, shop } = this.props;
    const { showServicePhone } = this.state;
    const systemInfo = Taro.getSystemInfoSync();
    let fixedHeight = 115;
    if (systemInfo.model.indexOf('iPhone X') > -1) {
      fixedHeight = fixedHeight + 30;
    }
    const scrollHeight = Taro.getSystemInfoSync().windowHeight - fixedHeight;
    return (
      <View className='shops-page'>

        <View className='banner'>
          <Image className='background-img' mode='aspectFill' src={shop.background} />
          <View className='info'>
            <View className='shop-info'>
              <Image className='header-img' mode='aspectFit' src={shop.logo} />
              <View>
                <View>{shop.name}</View>
                <View className='text'><View className='text-img' /><View className='text-content'>已缴纳保证金</View></View>
              </View>
            </View>
            <View className='contact' onClick={this.onShowPhoneModal} />
          </View>
        </View>
        <ScrollView
          className='products-area'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style={`height: ${scrollHeight}px;`}
          onScrollToLower={this.onScrollToLower}
        >
          {!!list && !!list.length && list.map(data =>
            <View key={data.productId} className='itme' onClick={this.gotoProductDetail.bind(this, data.productId)}>
              <Image className='img' mode='aspectFit' src={data.image} />
              <View className='info'>
                <View className='title'>{data.name}</View>
                <View className='rent-info'>{data.oldNewDegreeAndPrice.oldNewDegree} | {data.minRentCycle}天起租</View>
                <View className='price-info'>
                  <Text className='unit'>￥</Text>
                  <Text>{data.oldNewDegreeAndPrice.price.split('.')[0]}.</Text>
                  <Text className='decimal'>{data.oldNewDegreeAndPrice.price.split('.')[1]}</Text>
                  <Text className='unit'> /天</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        <modal
          show={showServicePhone}
          showClose={false}
          onModalClick={this.onClosePhoneModal}
          onModalClose={this.onClosePhoneModal}
        >
          <View slot='header'>联系客服</View>
          <View style={{ textAlign: 'left', marginBottom: '10px', paddingLeft: '15px' }}>商家客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectService.bind(this, shop.serviceTel)}>{shop.serviceTel}</Text></View>
          <View style={{ textAlign: 'left',marginBottom: '10px', paddingLeft: '15px' }}>平台客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectService.bind(this,customerServiceTel )}>{customerServiceTel}</Text></View>
          <View style={{ textAlign: 'left', paddingLeft: '15px' }}>工作时间：<Text style={{ color: '#777' }} >10:30 - 19:30</Text></View>
          <View slot='footer'>取消拨打</View>
        </modal>
      </View>
    )
  }
}

export default Shops;
