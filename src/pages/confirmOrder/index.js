import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Input } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({ confirmOrder, loading }) => ({
  confirmOrder,
  loading: loading.models.confirmOrder,
}))
class Confirmorder extends Component {
  config = {
    navigationBarTitleText: '确认订单', 
    usingComponents: {
      "notice": "../../npm/mini-antui/es/notice/index"
    }
  };

  state = { 
    message: null,
    isshow:true,
    marquee:{loop: true, leading: 2000, trailing: 100, fps: 18 }
   }
  componentDidShow () {
    // console.log(Taro.getStorageSync(`isShow`),'dehkuiwhfi')
    const { dispatch, confirmOrder } = this.props;
    let saveServer = [];
    if(confirmOrder.additionalServices && confirmOrder.additionalServices.length){
      saveServer = confirmOrder.additionalServices.map(ser=>ser.id);
    }
    const obj = {
      totalRent: confirmOrder.priceList &&  confirmOrder.priceList.totalRent,
      productName: confirmOrder.product && confirmOrder.product.name,
      skuTitle: confirmOrder.sku && confirmOrder.sku.skuId,
      productId: confirmOrder.product && confirmOrder.product.productId,
      duration: confirmOrder.duration,
      start: confirmOrder.start,
      end: confirmOrder.end,
      num: confirmOrder.num,
      additionalServicesIds: saveServer.join(','),
      logisticId: '',
      uid: 'abc',
      logisticForm: '1',
      from: '1',
    };
    if(Taro.getStorageSync(`isShow`) == 1){
      dispatch({
        type: 'confirmOrder/userConfirmOrder',
        payload: obj,
        callback: () => {
        },
      });
    }
  }
  componentDidMount = () => {
  };

  gotoRealName = () => {
    Taro.navigateTo({ url: '/pages/realName/index' });
  }

  gotoAddress = () => {
    Taro.navigateTo({ url: '/pages/address/index?type=select' });
  }

  gotoProtocol = () => {
    Taro.navigateTo({ url: '/pages/serviceProtocol/index' });
  }

  onMessageInput = (e) => {
    this.setState({ message: e.detail.value });
  }
  ddOrder = ()=>{
    this.setState({ isshow: false });
  }

  submitOrder = () => {
    const { dispatch, confirmOrder } = this.props;
    let saveServer = [];
    if(confirmOrder.additionalServices && confirmOrder.additionalServices.length){
      saveServer = confirmOrder.additionalServices.map(ser=>ser.id);
    }
    const { message } = this.state;
    if (confirmOrder.realNameStatus && confirmOrder.defaultUserAddress) {
      dispatch({
        type: 'confirmOrder/userSubmitOrder',
        payload: {
          orderId: confirmOrder.orderId,
          address: confirmOrder.defaultUserAddress.id,
          itemId: confirmOrder.product.productId,
          start: confirmOrder.start,
          end: confirmOrder.end,
          duration: confirmOrder.duration,
          num: confirmOrder.num,
          skuId: confirmOrder.sku.skuId,
          from: confirmOrder.from,
          amount: confirmOrder.priceList.originalMonthRentPrice,
          deposit: confirmOrder.priceList.depositAmount,
          rentAmount: confirmOrder.priceList.rentPrice,
          installmentCount: confirmOrder.priceList.totalPeriods,
          client: 1,
          logisticType: 0,
          creditAmount: 0,
          couponType: confirmOrder.coupons.defaultCoupon.type,
          couponId: confirmOrder.coupons.defaultCoupon.couponId,
          additionalServicesIds: saveServer.join(','),
          message,
        },
        callback: (orderId, type) => {
          if (type === 'detail') {
            Taro.redirectTo({ url: `/pages/orderDetail/index?orderId=${orderId}` });
          } else {
            Taro.redirectTo({ url: '/pages/orderList/index?type=all' });

          }
        },
      });
    }
  }

  render() {
    // console.log(this.state.isshow,'===>')
    const { confirmOrder, loading } = this.props;
    const { defaultUserAddress, sku, product, priceList, additionalServices } = confirmOrder;
    // eslint-disable-next-line no-undef
    (loading) ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='confirmOrder-page'>
      {/* {this.state.isshow && (
          <View onClick={this.ddOrder} className='bill-detail-broadcast tip-wx'>
          <Text style="position: absolute;left: 19px;bottom: 0.05rem;">
            <AtIcon value='volume-plus' size='15' color='#FFFFFF' />
          </Text>
            <Text className='text' >温馨提示:请确保账户金额大于实付款,确保下单成功</Text>
          <Text  style="position: absolute;right: 19px;bottom: 0.05rem;">
            <AtIcon value='close' size='14' color='#FFFFFF' />
          </Text>
          </View>
        )} */}
        <View onClick={this.ddOrder}> 
          <notice show={isshow} class="loslos" marqueeProps={marquee} enableMarquee={true} actionCls="closeable" mode="closable">温馨提示:请确保账户金额大于实付款,确保下单成功!!!</notice>
        </View>
       <View className='' style="height:0.1rem;background:#f0f0f080;" ></View>
        <View className='top'>
          {defaultUserAddress ? (
            <View className='address' onClick={this.gotoAddress}>
              <View className='contact-num'>
                <Text className='name'>{defaultUserAddress.realname}</Text>
                <Text>{defaultUserAddress.telephone}</Text>
              </View>
              <View className='content'>
                <View className='location-img' />
                <View>
                  {defaultUserAddress.provinceStr}{defaultUserAddress.cityStr}{defaultUserAddress.areaStr}{defaultUserAddress.street}
                </View>
              </View>
            </View>
          ) :
            (
              <View className='empty-address' onClick={this.gotoAddress}>
                <View className='location'>请填写收货地址</View>
                <AtIcon value='chevron-right' size='20' color='#ccc' />
              </View>
            )}
        </View>
        <View className='goods-info'>
          <Image className='img' mode='aspectFit' src={sku.image} />
          <View className='goods'>
            <View className='title'>{product.name}</View>
            <View className='spec'>规格：{sku.spec}</View>
            <View className='rent'> 总租金： ￥<Text className='price'>{priceList.rentPrice}</Text></View>
            <View><Text className='deposit-free'>芝麻信用·免押金</Text></View>
          </View>
        </View>
        <View className='order-info'>
          <View className='item'>
            <View className='text'>优惠券</View>
            <View className='price'>-￥{priceList.couponPrice}</View>
          </View>
          <View className='item'>
            <View className='text'>第一期租金</View>
            <View className='price'>￥{priceList.firstPeriodsRentPrice}</View>
          </View>
          {!!priceList.restPeriods && (
            <View className='item'>
              <View className='text'>剩余还款计划</View>
              <View className='price'>￥{priceList.otherPeriodsPrice} * {priceList.restPeriods}期</View>
            </View>
          )}
          <View className='item'>
            <View className='text'>运费</View>
            <View className='price'>￥{priceList.logisticPrice}</View>
          </View>
          {additionalServices && additionalServices.length && (
            <View>
              <View className='item'>
                <View className='text'>安心服务</View>
                <View className='price'>￥{priceList.additionalServicesPrice}</View>
              </View>
              <View className='save-server'>
                {additionalServices.map(ser => (
                  <View className='server-item'>{ser.name}￥{ser.price}</View>
                ))}
              </View>
            </View>
          )}
        </View>
        <View className='deposit-info'>
          <View className='item'>
            <View>商品总押金</View>
            <View className='price'>¥{priceList.depositAmount}</View>
          </View>
        </View>
        <View className='deposit-des'>提交订单，基于您的信用免除 <Text style={{ color: 'red' }}>¥0-{priceList.depositAmount}</Text>押金</View>
        {!confirmOrder.realNameStatus && (
          <View className='real-name' onClick={this.gotoRealName}>
            <View>实名认证</View>
            <View className='auth'>
              <Text>去认证</Text>
              <AtIcon value='chevron-right' size='20' color='#FF6262' />
            </View>
          </View>
        )}
        <View className='message'>
          <View>买家留言：</View>
          <Input className='input-mess' placeholder='请在这里留下您的备注' onInput={this.onMessageInput} />
        </View>
        <View className='protocol' onClick={this.gotoProtocol}>
          支付即同意<Text className='text'>《惠租用户交易服务协议》</Text>
        </View>
        <View className='bottom-space' />
        <View className='bottom-info'>
          <View className='info'>
            <View className='info-item'>
              <Text className='text'>实付</Text>
              ￥<Text className='price'>{String(priceList.firstPeriodsPrice).split('.')[0]}</Text>
              {String(priceList.firstPeriodsPrice).split('.')[1] ? '.' + String(priceList.firstPeriodsPrice).split('.')[1] : '.00'}
            </View>
            {/* <View className='info-text'>可减免押金 ¥0-{priceList.depositAmount}</View> */}
          </View>
          <View className={(!confirmOrder.realNameStatus || !confirmOrder.defaultUserAddress) ? 'pay-button disabled' : 'pay-button'} onClick={this.submitOrder}>信用授权支付</View>
        </View>
      </View>
    )
  }
}

export default Confirmorder;
