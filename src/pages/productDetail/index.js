import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, ScrollView, Input } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon, AtFloatLayout } from 'taro-ui';

import { formatDate } from '../../utils/utils';
import { customerServiceTel } from '../../assets/Constant';

import ParseComponent from './wxParseComponent'
import homeImg from '../../images/home/homeindexbanner.png';
import productRed from  '../../images/product/red_envelopes.png'
import dibanner from '../../images/home/dibanner.png';

import './index.scss';
import { func } from '_@types_prop-types@15.7.0@@types/prop-types';

@connect(({ productDetail, loading }) => ({
  ...productDetail,
  loading: loading.models.productDetail,
  orderLoading: loading.models.confirmOrder,
  mineLoading: loading.models.mine,
}))
class Productdetail extends Component {
  config = {
    navigationBarTitleText: '商品详情',
    usingComponents: {
      "popup": "../../npm/mini-antui/es/popup/index",
      "modal": "../../npm/mini-antui/es/modal/index"
    }
  };

  state = {
    showSKUPopup: false,
    showServicePopup: false,
    showzimServicePopup:false,
    showCoupons: false,
    mainActive: 'detail',
    showServicePhone: false,
    editRentDays: false,
    daysValue: null,
    input_bottom:0
  }

  componentDidMount = () => {
    const { itemId } = this.$router.params;
    const { dispatch } = this.props;
    dispatch({
      type: 'productDetail/fetchProductDetail',
      payload: { itemId },
    });
    // productid就是itemid
    dispatch({
      type: 'productDetail/recommendproducts',
      payload: { productid:this.$router.params.itemId }
    });
  };

  onShowSKUClick = () => {
    this.setState({ showSKUPopup: true });
  }

  onSKUPopupClose = () => {
    this.setState({ showSKUPopup: false });
  }

  onShowServiceClick = () => {
    this.setState({ showServicePopup: true })
  }
  onShowzimaServiceClick = () => {
    this.setState({ showzimServicePopup: true })
  }

  onServicePopupClose = () => {
    this.setState({ showServicePopup: false });
  }
  onServicezimaPopupClose = () =>{
    this.setState({showzimServicePopup:false})
  }

  onShowAdditionalClick = () => {
    this.setState({ showAdditionalPopup: true });
  }

  onAdditionalPopupClose = () => {
    this.setState({ showAdditionalPopup: false });
  }

  onShowCoupons = () => {
    this.setState({ showCoupons: true });
  }

  onCouponClose = () => {
    this.setState({ showCoupons: false });
  }

  onMainTabActive = (action) => {
    this.setState({ mainActive: action });
  }

  handleSkuClick = (valueId, preId) => {
    if (valueId === preId) {
      return 
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'productDetail/setCurrentSku',
      payload: { valueId, preId },
    });
  }

  handleDayChange = (days) => {
    const { dispatch } = this.props;
    console.log(days)
    dispatch({
      type: 'productDetail/setCurrentDays',
      payload: days,
    })
  }

  handleCustomValue = (e) => {
    this.setState({ daysValue: e.target.value });
  }

  handleCustomClick = () => {
    this.setState({ editRentDays: true });
  }

  handleAdvancedClick = (day) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productDetail/setStartDay',
      payload: day,
    })
  }

  handleSaveServiceClick = (ser) => {
    if (ser.isMust) {
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'productDetail/setSaveServers',
      payload: ser.id,
    });
  }

  handleCustomBlur = () => {
    this.setState({ editRentDays: false,input_bottom:0 });
    const { daysValue } = this.state;
    if (daysValue) {
      const { detail: { minRentCycle, maxRentCycle }, dispatch } = this.props;
      let newValue = daysValue;
      if (newValue < minRentCycle) {
        newValue = minRentCycle;
      }
      if (newValue > maxRentCycle) {
        newValue = maxRentCycle;
      }
      this.setState({ daysValue: newValue });
      dispatch({
        type: 'productDetail/setCurrentDays',
        payload: newValue,
      });
    }
  }
  // handleCustomonFocus = () =>{
  //   this.setState({ input_bottom:500 });
  // }

  gotoWhere = (where) => {
    const { detail, dispatch } = this.props;
    if (where === 'shop') {
      dispatch({
        type: 'shops/setShop',
        payload: detail.shop,
      });
      Taro.navigateTo({ url: `/pages/shops/index?shopId=${detail.shop.shopId}` });
    }
  }

  onSubmit = () => {
    const { dispatch, currentSku, currentDays, detail, startDay, saveServers,minRentCycleday } = this.props;
    const obj = {
      totalRent: currentDays * currentSku.currentCyclePrice.price,
      productName: detail.name,
      skuTitle: currentSku.id,
      productId: detail.itemId,
      duration: minRentCycleday,
      start: formatDate(new Date(startDay), 'yyyy-MM-dd'),
      end: formatDate(new Date(startDay + (minRentCycleday - 1) * 24 * 3600 * 1000), 'yyyy-MM-dd'),
      num: 1,
      additionalServicesIds: saveServers.join(','),
      logisticId: '',
      uid: 'abc',
      logisticForm: '1',
      from: '1',
    };
    console.log(obj)
    // return false;
    Taro.setStorageSync(`isShow`, 0);
    dispatch({
      type: 'mine/fetchAuthCode',
      callback: () => {
        dispatch({
          type: 'confirmOrder/userConfirmOrder',
          payload: obj,
          callback: () => {
            Taro.redirectTo({ url: '/pages/confirmOrder/index' });
          },
        });
      },
    });
  }

  gotoHome() {
    Taro.switchTab({ url: '/pages/home/index' });
  }

  handleGetCoupon = (couponId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productDetail/getCoupon',
      payload: { couponId },
    });
  }

  onClosePhoneModal = () => {
    this.setState({ showServicePhone: false });
  }

  onShowPhoneModal = () => {
    this.setState({ showServicePhone: true });
  }
  onEnvelope = () =>{
    Taro.navigateTo({
      url:'/pages/freshman/index'
    })
  }
  goInmeddiate = () =>{
    Taro.switchTab({
      url:'/pages/home/index'
    })
  }
  gotodetail = (id) =>{
    console.log(id,'shjkhd')
    
    Taro.navigateTo({
      url:`/pages/productDetail/index?itemId=${id}`
    })
  }
  connectService = (number) => {
    let num = String(number)
    // console.log(num)
    my.makePhoneCall({ number: num });
  }


  onShareAppMessage() {
    const { detail } = this.props;
    return {
      title: '分享商品',
      desc: detail.name,
      path: `pages/productDetail/index?itemId=${detail.itemId}`,
    };
  }
  // 根据用户芝麻信用情况给予押金减免。
  render() {
    const { showzimServicePopup, showSKUPopup, showServicePopup, showServicePhone, showCoupons, showAdditionalPopup, mainActive, editRentDays, daysValue } = this.state;
    const { loading, orderLoading, mineLoading, detail, currentSku, oldNewDegreeList, serviceMarkList, currentDays, advancedDays, startDay, saveServers,recommendproductsList,images_ismain,minRentCycleday } = this.props;

    // console.log(currentSku.cyclePrices,'sos===========w43234================================sos',currentDays,minRentCycleday)
    currentSku.cyclePrices && currentSku.cyclePrices.sort(function(a,b){
      return  a.days -b.days;
    })
    // console.log(recommendproductsList,'limingsb')
    let totelRentPrice = 0
    if (currentSku.currentCyclePrice.days && currentSku.currentCyclePrice.price) {
      totelRentPrice = (minRentCycleday * currentSku.currentCyclePrice.price).toFixed(2);
    }
    // console.log(totelRentPrice)
    let couponValue = 0;
    if (detail.allCoupons && detail.allCoupons.length) {
      couponValue = detail.allCoupons[0].value.toFixed(2);
    } else if (detail.platformCoupon && detail.platformCoupon.length) {
      couponValue = detail.platformCoupon[0].value.toFixed(2);
    }
    let input_bottom = this.state.input_bottom;
    // eslint-disable-next-line no-undef
    (loading || orderLoading || mineLoading) ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='productDetail-page'>
        <View className='red_envelopes'>
          <Image  className='envelopes'  src={productRed} />
        </View>
        <View className='swiper'>
          <swiper
            circular
            indicator-dots
            indicator-active-color='#DBDBDB'
          >
            {!!images_ismain && !!images_ismain.length && images_ismain.map(img => (
              <swiper-item key={img.src}>
                <View className='item'>
                  <Image className='img' mode='aspectFit' src={img.src} />
                </View>
              </swiper-item>
            ))}
          </swiper>
        </View>
        <View className='zima-Xy'>
            <Image style='width:750rpx;height:88rpx;' mode='aspectFit' src={homeImg} />
        </View>
        <View className='swiper-space' />
        <View className='info-area'>
          <View className='title'>
            <Text className='right'>{oldNewDegreeList[currentSku.oldNewDegree - 1]}</Text>|<Text className='content'>{detail.name}</Text>
          </View>
          <View className='price-info'>
            <View className='price'>
              <Text className='unit'>￥</Text>
              <Text className='price-text'>{currentSku.currentCyclePrice.price}</Text>
              <Text className='unit'> 元/天</Text>
            </View>
            <View>
              <View className='volume'>官方售价：¥{detail.salesVolume}笔</View>
              <View className='volume'>月销：{detail.salesVolume}笔</View>
            </View>
          </View>
        </View>
        <View className='integral'>
          <View className='grade'>
            600分
            <Text className='grade_price'>免¥1500</Text>
          </View>
          <View className='grade'>
            650分
            <Text className='grade_price'>免¥5000</Text>
          </View>
          <View className='grade'>
            700分
            <Text className='grade_price'>有机会全免</Text>
          </View>
        </View>
        {/* <View className='zima-Xy' style='background:#fff;'>
            <Image style='width:200rpx;height:27rpx;margin-left:30rpx;' mode='aspectFit' src={dibanner} />
        </View> */}
        {(
          // !!detail.serviceMarks && !!detail.serviceMarks.length && 
          <View className='service-info' onClick={this.onShowServiceClick}  >
            <View className='services'>
              <View className='item' ><View className='item-img' />芝麻信用免押金</View>
              {
               !!detail.serviceMarks && !!detail.serviceMarks.length &&  detail.serviceMarks.map(service => (
                <View className='item'  key={service.id}><View className='item-img' />{serviceMarkList[service.type]}</View>
              )
              )}
              <View className='item' ><View className='item-img' />正品保证</View>
              {
                !!detail.serviceMarks && !!detail.serviceMarks.length &&  detail.serviceMarks.map(service => (
                    <View className='item'  key={service.id}><View className='item-img' />{serviceMarkList[service.type]}</View>
                  )
                )}
              <View className='item' ><View className='item-img' />7天无理由退货</View>
              {
                !!detail.serviceMarks && !!detail.serviceMarks.length &&  detail.serviceMarks.map(service => (
                    <View className='item'  key={service.id}><View className='item-img' />{serviceMarkList[service.type]}</View>
                  )
                )}
              <View className='item' ><View className='item-img' />赠送免修服务</View>
              {
                !!detail.serviceMarks && !!detail.serviceMarks.length &&  detail.serviceMarks.map(service => (
                    <View className='item'  key={service.id}><View className='item-img' />{serviceMarkList[service.type]}</View>
                  )
                )}
              </View>
            <View className='spot' />
          </View>
        )}
        {((!!detail.allCoupons && !!detail.allCoupons.length) ||
          (!!detail.platformCoupon && !!detail.platformCoupon.length)) && (
            <View className='choose-info' onClick={this.onShowCoupons}>
              <View className='content'><Text className='front'>优惠</Text>领券至少可减 ¥<Text className='price'>{couponValue}</Text></View>
              <View className='spot' />
            </View>
          )}
        <View className='choose-info' onClick={this.onShowSKUClick}>
          <View className='content'>
            <Text className='front'>选择</Text>
            <Text>
              已选择：{currentSku.values && currentSku.values.map(v => `${v.name} `)}
              {minRentCycleday && `${minRentCycleday}天`}
            </Text>
          </View>
          <View className='spot' />
        </View>
        <View className='swiper-info'>
            {/* <swiper
              indicator-dots
              indicator-active-color='#DBDBDB'
            >
                <swiper-item >
                  <View className='item' onClick={this.onEnvelope.bind()}>
                    <Image className='img' mode='aspectFit' src='http://jbkj-res.oss-cn-hangzhou.aliyuncs.com/79249b80547a4d9e9a8519ec47d420cf.png' />
                  </View>
                </swiper-item>
            </swiper> */}
             <View className='item' onClick={this.onEnvelope.bind()}>
                <Image className='img' mode='aspectFit' src='http://jbkj-res.oss-cn-hangzhou.aliyuncs.com/79249b80547a4d9e9a8519ec47d420cf.png' />
              </View>
        </View>
        <View className='store-info' onClick={this.goInmeddiate.bind()}>
            <View className='channel-top'>
              <View className='channel-top-title'>
                <Text className='left-text'>为你推荐</Text>
              </View>
              <View className='channel-top-more'>
                <Text className='right-text'>查看全部</Text>
                <AtIcon value='chevron-right' size='20' color='#ec2111c4'></AtIcon>
              </View>
            </View> 
        </View>
        <View className='other-commodities'>
        {
          !!recommendproductsList && recommendproductsList.map(item =>(
                <View onClick={this.gotodetail.bind(this,item.productId||item.itemId)}>
                  <View className="commodities-img">
                    <Image style="width:100%;height:100%;" mode='aspectFit' src={item.detail||item.image} />
                  </View>
                  <View className="commodities-name">
                    {item.name}
                  </View>
                  <View className="commodities-price">
                    <Text style="font-size: 12px;">¥</Text>
                    <Text style="font-size: 17px;line-height: 30px;">
                    {
                      Number(item.sale).toFixed(2).toString().split('.')[0]  
                    }
                    </Text>
                    <Text style="font-size: 10px;margin-top:10px;">
                    .
                    </Text>
                    <Text style="font-size: 10px;">
                    {
                      Number(item.sale).toFixed(2).toString().split('.')[1]  
                    }
                    </Text>
                    <Text style="font-size: 10px;"> /天</Text>
                  </View>
                </View>
          ))
        }
          {/* {
          !!recommendproductsList && recommendproductsList.map(item =>(
                <View onClick={this.gotodetail.bind(this,item.itemId)}>
                  <View className="commodities-img">
                    <Image style="width:100%;height:100%;" mode='aspectFit' src={item.image} />
                  </View>
                  <View className="commodities-name">
                    {item.name}
                  </View>
                  <View className="commodities-price">
                    <Text style="font-size: 12px;">¥</Text>
                    <Text style="font-size: 17px;line-height: 30px;">
                    {
                      Number(item.sale).toFixed(2).toString().split('.')[0]  
                    }
                    </Text>
                    <Text style="font-size: 10px;margin-top:10px;">
                    .
                    </Text>
                    <Text style="font-size: 10px;">
                    {
                      Number(item.sale).toFixed(2).toString().split('.')[1]  
                    }
                    </Text>
                    <Text style="font-size: 10px;"> /天</Text>
                  </View>
                </View>
          ))
        } */}
         </View>
        <View className='main-area'>
          <View className='tab'>
            <View className={`item ${mainActive === 'detail' && 'active-item'}`} onClick={this.onMainTabActive.bind(this, 'detail')}>
              <View>商品介绍</View>
              {mainActive === 'detail' && (
                <View className='active-line' />
              )}
            </View>
            <View className='dividing' />
            <View className={`item ${mainActive === 'rent' && 'active-item'}`} onClick={this.onMainTabActive.bind(this, 'rent')}>
              <View>租赁说明</View>
              {mainActive === 'rent' && (
                <View className='active-line' />
              )}
            </View>
          </View>
          <View className='info'>
            {mainActive === 'detail' ? (
              <ParseComponent mark={detail.detail} />
            ) :
              (
                <View>
                  <View className='detail-name'>{detail.rentRule.name}：</View>
                  <ParseComponent mark={detail.rentRule.content} />
                  <View className='detail-name'>{detail.compensateRule.name}：</View>
                  <ParseComponent mark={detail.compensateRule.content} />
                </View>
              )}
          </View>
        </View>
        <View className='footer-area'>
          <View className='left-area'>
            <View className='item' onClick={this.gotoHome}>
              <View className='home-img' />
              <View>首页</View>
            </View>
            <View className='item' onClick={this.gotoWhere.bind(this, 'shop')}>
              <View className='shop-img' />
              <View>店铺</View>
            </View>
            <View className='item' onClick={this.onShowPhoneModal}>
              <View className='message-img' />
              <View>客服</View>
            </View>
          </View>
          <View className='right-area'>
            <View className='red-botton' onClick={this.onShowSKUClick}>立即租用</View>
          </View>
        </View>

        <popup show={showServicePopup} position='bottom' zIndex={999} disableScroll onClose={this.onServicePopupClose}>
          <View className='service-popup'>
            <View className='service-popup-title'>服务说明</View>
            <View className='service-popup-content'>
                <View className='service-popup-content-item' >
                  <View className='service-po·  pup-content-item-type'>芝麻信用免押金</View>
                  <View>根据用户芝麻信用情况给予押金减免</View>
                </View>
              {!!detail.serviceMarks && !!detail.serviceMarks.length && detail.serviceMarks.map(service => (
                <View className='service-popup-content-item' key={service.id}>
                  <View className='service-popup-content-item-type'>{serviceMarkList[service.type]}</View>
                  <View>{service.description}</View>
                </View>
              ))}
            </View>
            <View className='service-popup-content'>
              <View className='service-popup-content-item' >
                <View className='service-po·  pup-content-item-type'>芝麻信用免押金</View>
                <View>根据用户芝麻信用情况给予押金减免</View>
              </View>
              {!!detail.serviceMarks && !!detail.serviceMarks.length && detail.serviceMarks.map(service => (
                <View className='service-popup-content-item' key={service.id}>
                  <View className='service-popup-content-item-type'>{serviceMarkList[service.type]}</View>
                  <View>{service.description}</View>
                </View>
              ))}
            </View>
            <View className='service-popup-close' onClick={this.onServicePopupClose}>关闭</View>
          </View>
        </popup>
       
        <popup show={showCoupons} position='bottom' zIndex={999} disableScroll onClose={this.onCouponClose}>
          <View className='coupon-popup'>
            <View className='coupon-popup-title'>优惠券</View>
            <ScrollView
              scrollY
              scrollTop='0'
              style='height: 5.5rem'
              className='coupon-popup-content'
            >
              {!!detail.allCoupons && !!detail.allCoupons.length && detail.allCoupons.map(coupon => (
                <View className='coupon-popup-content-item' key={coupon.id}>
                  <View className='coupon-popup-content-item-left'>
                    <View><Text className='coupon-popup-content-item-price'>{coupon.value}</Text> 元</View>
                    <View>（店铺券）</View>
                  </View>
                  <View className='coupon-popup-content-item-right'>
                    <View>
                      <View className='coupon-popup-content-item-right-name'>{coupon.name}</View>
                      {!!coupon.end && (
                        <View>{coupon.start.substr(0, 10)}~{coupon.end.substr(0, 10)}</View>
                      )}
                    </View>
                    <View>
                      <View className='coupon-popup-content-item-right-draw' onClick={this.handleGetCoupon.bind(this, coupon.couponId)}>立即领取</View>
                    </View>
                  </View>
                </View>
              ))}
              {!!detail.platformCoupon && !!detail.platformCoupon.length && detail.platformCoupon.map(coupon => (
                <View className='coupon-popup-content-item' key={coupon.id}>
                  <View className='coupon-popup-content-item-left'>
                    <View><Text className='coupon-popup-content-item-price'>{coupon.value}</Text> 元</View>
                    <View>（平台券）</View>
                  </View>
                  <View className='coupon-popup-content-item-right'>
                    <View>
                      <View className='coupon-popup-content-item-right-name'>{coupon.name}</View>
                      {!!coupon.end && (
                        <View>{coupon.start.substr(0, 10)}~{coupon.end.substr(0, 10)}</View>
                      )}
                    </View>
                    <View>
                      <View
                        className='coupon-popup-content-item-right-draw'
                        onClick={this.handleGetCoupon.bind(this, coupon.couponId)}
                      >
                        立即领取
                     </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View className='coupon-popup-bottom'>
              <View className='coupon-popup-bottom-submit' onClick={this.onCouponClose}>确定</View>
            </View>
          </View>
        </popup>
        <View >             
            <AtFloatLayout  isOpened={showSKUPopup} onClose={this.onSKUPopupClose} scrollY={false} className='product-float'>
              <View className='popup-bottom'>
                <View className='top'>
                  <View className='top-item'>
                    <View className='price'>{totelRentPrice || ''}</View>
                    <View className='text'>总租金</View>
                  </View>
                  <View className='dividing' />
                  {!!totelRentPrice && !!minRentCycleday && minRentCycleday > 30 && (
                    <View className='top-item'>
                      <View className='price month-price'>{(totelRentPrice / Math.ceil(minRentCycleday / 31)).toFixed(2)}</View>
                      <View className='text'>月租金(元/月)</View>
                    </View>
                  )}
                </View>
                <View className='product-main'>
                  <View className='info'>
                    <View>
                      <Image className='img' mode='aspectFit' src={currentSku.values[0].image || detail.images[0].src} />
                    </View>
                    <View className='item'>
                      <View className='price'>
                        <Text className='font'>￥</Text><Text>{currentSku.currentCyclePrice.price && currentSku.currentCyclePrice.price.toFixed(2)} </Text><Text className='font'>元/天</Text>
                      </View>
                      <View className='old'>{oldNewDegreeList[currentSku.oldNewDegree - 1]}</View>
                      <View className='sku-info'>已选:“{currentSku.values && currentSku.values.map(value => `${value.name};`)}{minRentCycleday}天”</View>
                    </View>
                  </View>
                  <View className='close' onClick={this.onSKUPopupClose}><AtIcon value='close' size='18' color='#888' /></View>
                </View>
                <View className='area-scroll'>
                  <ScrollView
                    scrollY
                    scrollTop='0'
                    scrollWithAnimation
                    className='content-area'
                    style='height: 5.5rem'
                  >
                    <View className='sku-area'>
                      {!!detail.specs && !!detail.specs.length && detail.specs.map((spec, i) => (
                        <View className='item' key={spec.id}>
                          <View className='item-text'>{spec.name}</View>
                          <View className='item-tags'>
                            {!!spec.values && !!spec.values.length && spec.values.map((value) => (
                              <View
                                onClick={this.handleSkuClick.bind(this, value.id, currentSku.values[i].id)}
                                className={`tag ${!!currentSku.values && currentSku.values[i].id === value.id && 'tag-active'}`}
                                key={value.id}
                              >
                                {value.name}
                              </View>
                            ))}
                          </View>
                        </View>
                      ))}
                      {currentSku.cyclePrices && currentSku.cyclePrices.length && (
                        <View className='item'>
                          <View className='item-text'>租用天数(最少{detail.minRentCycle}天，最多{detail.maxRentCycle}天)</View>
                          <View className='item-tags'>
                            {currentSku.cyclePrices.map(cycle => (
                              <View
                                key={cycle.id}
                                className={`tag ${cycle.days === minRentCycleday && !editRentDays && 'tag-active'}`}
                                onClick={this.handleDayChange.bind(this, cycle.days)}
                              >
                                {cycle.days}天
                            </View>
                            ))}
                            <View
                              // style={{'position':'relative','bottom':input_bottom+'px'}}
                              className={`tag ${(editRentDays || currentDays === daysValue) && 'tag-active'}`}
                              onClick={this.handleCustomClick}
                            >
                              {editRentDays ? (
                                // cursorSpacing="80"
                                <Input className='text' value={daysValue} onInput={this.handleCustomValue} adjustPosition focus onBlur={this.handleCustomBlur} />
                              ) : daysValue ? `${daysValue}天` : '自定义'}
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                    <View className='data-item'>
                      <View className='item-text ml-30'>起租日期</View>
                      <ScrollView scroll-x>
                        <View className='data-tags'>
                          {advancedDays && advancedDays.map((day, index) => (
                            <View
                              className={`tag ${startDay === day && 'tag-active'}`}
                              onClick={this.handleAdvancedClick.bind(this, day)}
                            >
                              {(index === 0 || new Date(day).getDate() === 1) ?
                                `${new Date(day).getMonth() + 1}月${new Date(day).getDate()}号` : `${new Date(day).getDate()}号`}
                            </View>
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                    {!!detail.additionalServices && !!detail.additionalServices.length && (
                      <View className='sku-area'>
                        <View className='item'>
                          <View className='item-text save-server'>
                            <View>安心服务(多选)</View>
                            <View className='server-text' onClick={this.onShowAdditionalClick}>服务介绍</View>
                          </View>
                          <View className='item-tags'>
                            {detail.additionalServices.map((ser) => (
                              <View
                                key={ser.id}
                                className={`tag ${saveServers.findIndex((id) => id === ser.id) > -1 && 'tag-active'}`}
                                onClick={this.handleSaveServiceClick.bind(this, ser)}
                              >
                                {ser.name} {` ￥${ser.price}元`}{ser.isMust && (<Text>(必选)</Text>)}
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    )}
                  </ScrollView>
                </View>
                <View className='bottom'>
                  <View className='submit' onClick={this.onSubmit}>确定</View>
                </View>
              </View>
            </AtFloatLayout>
          </View>  
        <modal
          show={showServicePhone}
          showClose={false}
          onModalClick={this.onClosePhoneModal}
          onModalClose={this.onClosePhoneModal}
        >
          <View slot='header'>联系客服</View>
          <View style={{ textAlign: 'left', marginBottom: '10px', paddingLeft: '15px' }}>商家客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectService.bind(this, detail.shop.serviceTel)}>{detail.shop.serviceTel}</Text></View>
          <View style={{ textAlign: 'left', paddingLeft: '15px' }}>平台客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectService.bind(this, customerServiceTel)}>{customerServiceTel}</Text></View>
          <View slot='footer'>取消拨打</View>
        </modal>

        <popup show={showAdditionalPopup} position='bottom' zIndex={999} disableScroll onClose={this.onAdditionalPopupClose}>
          <View className='service-popup'>
            <View className='service-popup-title'>服务介绍</View>
            <View className='service-popup-content'>
              {!!detail.additionalServices && !!detail.additionalServices.length && detail.additionalServices.map(service => (
                <View className='service-popup-content-item' key={service.id}>
                  <View className='service-popup-content-item-type'>{service.name}</View>
                  <View>{service.content}</View>
                </View>
              ))}
            </View>
            <View className='service-popup-close' onClick={this.onAdditionalPopupClose}>关闭</View>
          </View>
        </popup>
      </View>
    )
  }
}

export default Productdetail;
