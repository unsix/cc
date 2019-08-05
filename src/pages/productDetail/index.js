import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, ScrollView, Input,Button,Form} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon, AtFloatLayout } from 'taro-ui';

import { formatDate,blankSpace } from '../../utils/utils';
import { customerServiceTel } from '../../assets/Constant';

import ParseComponent from './wxParseComponent'
import NoData from '../../components/noData/index'

import './index.scss';
let  isclick = true;
@connect(({ productDetail, loading }) => ({
  ...productDetail,
  loading: loading.models.productDetail,
  orderLoading: loading.models.confirmOrder,
  mineLoading: loading.models.mine,
}))
class Productdetail extends Component {
  config = {
    navigationBarTitleText: '惠租',
    usingComponents: {
      "popup": "../../npm/mini-antui/es/popup/index",
      "modal": "../../npm/mini-antui/es/modal/index",
      "collapse": '../../npm/mini-antui/es/collapse/index',
      "collapse-item": '../../npm/mini-antui/es/collapse/collapse-item/index'
    }
  };

  state = {
    showSKUPopup: false,
    showServicePopup: false,
    showzimServicePopup: false,
    showCoupons: false,
    mainActive: 'detail',
    showServicePhone: false,
    editRentDays: false,
    daysValue: null,
    input_bottom: 0,
    display: 'block', // none -> 没数据隐藏
  }

  componentDidMount = () => {
    const { itemId } = this.$router.params;
    const { dispatch } = this.props;
    if(itemId){
      dispatch({
        type: 'productDetail/fetchProductDetail',
        payload: { itemId },
      });
      // productid就是itemid
      dispatch({
        type: 'productDetail/recommendproducts',
        payload: { productid: itemId }
      });
    }
  };
  gotoRed = () => {
    // const { dispatch } = this.props;
    //     dispatch({
    //   type: 'productDetail/conuponSearch',
    //   payload:{
    //     couponid:'PL123AADSK'
    //   },
    // });
    my.navigateToMiniProgram({
      appId: '2018122562686742',
      path: 'pages/index/index?originAppId=2019011162880259&newUserTemplate=20190428000000168854'
    });
  }
  onShowSKUClick = () => {
    this.setState({ showSKUPopup: true });
  }
  onShareMember = () => {
    if(isclick){
      isclick = false;
      const { dispatch } = this.props
      dispatch({
        type: 'members/fetchAuthCode',
        callback:()=>{
          Taro.navigateTo({
            url:`/pages/shareMember/index`
          })
        }
      })
      setTimeout(function(){
        isclick = true;
      }, 500);

    }

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
  onServicezimaPopupClose = () => {
    this.setState({ showzimServicePopup: false })
  }

  onShowAdditionalClick = () => {
    this.setState({ showAdditionalPopup: true });
  }

  onAdditionalPopupClose = () => {
    this.setState({ showAdditionalPopup: false });
  }

  onShowCoupons = () => {
    const { dispatch } = this.props
    const { itemId } = this.$router.params
    dispatch({
      type: 'mine/fetchAuthCode',
      callback:()=> {
        this.setState({ showCoupons: true });
        dispatch({
          type:'productDetail/getProductCoupon',
          payload:{
            productId:itemId
          }
        })
      }
    })
  }

  onCouponClose = () => {
    this.setState({ showCoupons: false });
  }

  onMainTabActive = (action) => {
    this.setState({ mainActive: action });
  }

  handleSkuClick = (valueId, preId) => {
    console.log(valueId,preId)
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
    console.log(days)
    const { dispatch } = this.props;
    // console.log(days)
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
    // if (ser.isMust) {
    //   return;
    // }
    const { dispatch } = this.props;
    dispatch({
      type: 'productDetail/setSaveServers',
      payload: ser.id,
    });
  }

  handleCustomBlur = () => {
    this.setState({ editRentDays: false, input_bottom: 0 });
    const { daysValue } = this.state;
    if (daysValue) {
      const { detail: { minRentCycle, maxRentCycle }, dispatch } = this.props;
      let newValue = blankSpace(daysValue);
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

  formSubmit = (e) => {
    const { dispatch, currentSku, currentDays, detail, startDay, saveServers } = this.props;
    let formId = e.detail.formId
    const obj = {
      totalRent: currentDays * currentSku.currentCyclePrice.price,
      productName: detail.name,
      skuTitle: currentSku.id,
      productId: detail.itemId,
      duration: currentDays,
      start: formatDate(new Date(startDay), 'yyyy-MM-dd'),
      end: formatDate(new Date(startDay + (currentDays - 1) * 24 * 3600 * 1000), 'yyyy-MM-dd'),
      num: 1,
      additionalServicesIds: saveServers.join(','),
      logisticId: '',
      uid: 'abc',
      logisticForm: '1',
      from: '1',
    };
    // console.log(obj)
    // return false;
    Taro.setStorageSync(`isShow`, 0);
    dispatch({
      type: 'mine/fetchAuthCode',
      callback:()=>{
        dispatch({
          type:'unclaimed/userFormIdPool',
          payload:{
            type:'1',
            userFormId:formId
          },
          callback: () => {
            dispatch({
              type: 'confirmOrder/userConfirmOrder',
              payload: obj,
              callback: () => {
                Taro.redirectTo({ url: '/pages/confirmOrder/index' });
              },
            });
          },
        })
      }
    });
  }

  gotoHome() {
    Taro.switchTab({ url: '/pages/home/index' });
  }

  handleGetCoupon = (couponId) => {
    const { dispatch } = this.props;
    const { itemId } = this.$router.params
    dispatch({
      type: 'productDetail/getCoupon',
      payload: { couponId },
      callback:()=>{
        dispatch({
          type:'productDetail/getProductCoupon',
          payload:{
            productId:itemId
          }
        })
      }
    });
  }

  onClosePhoneModal = () => {
    this.setState({ showServicePhone: false });
  }

  onShowPhoneModal = () => {
    this.setState({ showServicePhone: true });
  }
  onEnvelope = () => {
    Taro.navigateTo({
      url: '/pages/freshman/index'
    })
  }
  goInmeddiate = () => {
    Taro.switchTab({
      url: '/pages/home/index'
    })
  }
  gotodetail = (id) =>{
    // console.log(id,'shjkhd')
    
    Taro.navigateTo({
      url: `/pages/productDetail/index?itemId=${id}`
    })
  }
  connectService = (number) => {
    let num = String(number)
    // console.log(num)
    my.makePhoneCall({ number: num });
  }
  //会员
    member = () => {
      Taro.navigateTo({
        url: '/pages/member/home/index'
      })
  }
  //优惠劵更多
  GoMoreCoupon = () => {
    Taro.showToast({
      title:'更多优惠劵上架，敬请期待！',
      icon:'none'
    })
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
    const { showzimServicePopup, showSKUPopup, showServicePopup, showServicePhone, showCoupons, showAdditionalPopup, mainActive, editRentDays, daysValue ,display } = this.state;
    const { loading, orderLoading, mineLoading, detail, currentSku, oldNewDegreeList, serviceMarkList, currentDays, advancedDays, startDay, saveServers, recommendproductsList, images_ismain ,processRule,productCoupon} = this.props;

    currentSku.cyclePrices && currentSku.cyclePrices.sort(function (a, b) {
      return a.days - b.days;
    })
    let currentValidCyclePrices = [];
    if (currentSku.cyclePrices && currentSku.cyclePrices.length) {
      currentValidCyclePrices = currentSku.cyclePrices.filter(function (info) {
        return info.days >= detail.minRentCycle && info.days <= detail.maxRentCycle;
      });
    }
    // console.log(recommendproductsList,'limingsb')
    let totelRentPrice = 0
    if (currentSku.currentCyclePrice.days && currentSku.currentCyclePrice.price) {
      totelRentPrice = (currentDays * currentSku.currentCyclePrice.price).toFixed(2);
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
    (loading || orderLoading || mineLoading  ) ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='productDetail-page'>
        <View className='red_envelopes'>
          <Image onClick={this.gotoRed} className='envelopes'  src='http://oss.huizustore.com/545b093f92ad4a77b50c39358f5b8082.png' />
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
        <View className='sesame_credit'>
          <Image className='img'  src='http://oss.huizustore.com/8278306dec7b40cfb443d477b61ce2dd.png' />
        </View>
        <View className='info-area'>
          <View className='price-info'>
            <View className='price'>
              <Text className='unit'>¥</Text>
              <Text className='price-text'>{Number(currentSku.currentCyclePrice.price).toFixed(2).toString().split('.')[0]}</Text>
              <Text className='spots'>.</Text>
              <Text className='small-price'>
                {
                  Number(currentSku.currentCyclePrice.price).toFixed(2).toString().split('.')[1]
                }
              </Text>
              <Text className='unit'>/天</Text>
              <Text className='member-price'>
                <Text >¥</Text>
                {(Math.round(currentSku.currentCyclePrice.price*detail.membersDisCount * 100) / 100)}/天
                <Image className='img' src='http://oss.huizustore.com/89326548e3dd4672985b27d8434da7d3.png' />
              </Text>
            </View>
            <View>
              <View className='dec_situation'>
                <View className='volume'>{detail.minRentCycle}天起租</View>
                <View className='volume'>会员折扣</View>
              </View>
            </View>
          </View>
          <View className='volume-price'>
            <View className='price'>
              <Text className='mark'>官方售价</Text> ¥{detail.skus[0].marketPrice}起</View>
          </View>
          <View className='title'>
            <Text className='product-box'>
              <Text className={`oldNewDegree ${currentSku.oldNewDegree - 1 === 0 && 'oldNewDegree-active'} `}> {oldNewDegreeList[currentSku.oldNewDegree - 1]}</Text>
              <Text className='name'>{detail.name}</Text>
              {/*className={`text ${shopType === item.id && 'text-active'}`}*/}
            </Text>
          </View>
        </View>
        <View className='swiper-info'>
          <View className='item' onClick={this.member}>
            <Image className='img' mode='aspectFit' src='http://oss.huizustore.com/763cc18011114328986e206b649c5ef0.png' />
          </View>
        </View>
          <View className='receive-info'>
            <View className='receive-info-coupon' onClick={this.onShowCoupons}>
              <View className='receive-info-coupon-title'>
                领劵
              </View>
              <View className='receive-info-coupon-dec'>
                {detail.maxplatformCoupon && (
                  <View className='receive-info-coupon-dec-con'>
                    <View className='name'>满{detail.maxplatformCoupon.minPurchase}减{detail.maxplatformCoupon.value}</View>
                    <View className='type'>平台劵</View>
                  </View>
                )}
                {detail.maxShopCoupons && (
                  <View className='receive-info-coupon-dec-con'>
                    <View className='name'>满{detail.maxShopCoupons.minPurchase}减{detail.maxShopCoupons.value}</View>
                    <View className='type'>店铺劵</View>
                  </View>
                )}
                {!detail.maxplatformCoupon && !detail.maxShopCoupons && (
                  <View className='receive-info-coupon-dec-con'>
                    <View className='name'>暂无优惠劵</View>
                    <View className='type'>可用</View>
                  </View>
                )}
              </View>
              <View className='spot' />
            </View>
            <View className='receive-info-deliver'>
              <View className='receive-info-deliver-title'>
                发货
              </View>
              <View className='receive-info-deliver-dec'>
                运费：到付
              </View>
              <View className='receive-info-deliver-volume'>销量 {detail.salesVolume}</View>
            </View>
          </View>
          <View className='rental-procedure'>
            <View className='rental-procedure-title'>
              租赁流程
            </View>
            <View className='rental-procedure-image'>
              <Image className='img' src='http://oss.huizustore.com/b182cdb14827419982f12beaa81a727f.png' />
            </View>
            <View>
              <collapse
                className="demo-collapse"
                collapseKey="collapse2"
                activeKey="{{['item-21', 'item-23']}}"
                onChange="onChange"
                accordion="{{true}}"
              >
                <collapse-item
                  className='collapse'
                  itemKey="item-21"
                  collapseKey="collapse2"
                >
                  <view className="item-content content1">
                    <View>
                      <Image className='img_1' src='http://oss.huizustore.com/03415e9068cb48bfa87acc1060e9d26f.png' />
                    </View>
                    <View className='border'></View>
                  </view>
                </collapse-item>
                <collapse-item
                  itemKey="item-22"
                  collapseKey="collapse2"
                >
                  <View className="item-content content2">
                    <Image className='img_2' src='http://oss.huizustore.com/31f290eeb3da4fbab5b1c84b0a78d71a.png' />
                    <View className='border'></View>
                  </View>
                </collapse-item>
                <collapse-item
                  itemKey="item-23"
                  collapseKey="collapse2"
                >
                  <View className="item-content content3">
                    {detail.buyCyclePrices && !!detail.buyCyclePrices.length?
                      (
                        <View className='con'>
                          <View className='left'>
                            买断规则
                          </View>
                          <View className='right'>
                            {detail.buyCyclePrices.map(item=>(
                              <View className='text'>
                                {item.days}天内 买断价格={detail.skus[0].marketPrice + item.price}-已付租金
                              </View>
                            ))}
                          </View>
                        </View>
                      ):
                      (
                        <Image className='img_3' src='http://oss.huizustore.com/30785e4857e04fffb244dd0afda36012.png' />
                      )
                    }
                    <View className='border'></View>
                  </View>
                </collapse-item>
              </collapse>
            </View>
          </View>
        <View className='shop'>
          <View className='avatar'>
            <Image className='img' src={detail.shop.logo} />
          </View>
          <View className='dec'>
            <View className='name'>
              {detail.shop.name}
            </View>
            <View className='address'>
              <View className='content-img'>
                <Image className='img' src='http://oss.huizustore.com/042758164b734b1a8eb68c52ffb0e689.png' />
              </View>
              <View className='content-dec'>
                {detail.shop.province}
                <Text className='text'>{detail.shop.city}</Text>
              </View>
            </View>
          </View>
          <View className='edit'>
            <View className='call' onClick={this.onShowPhoneModal}>
              联系商家
            </View>
            <View className='go-shop' onClick={this.gotoWhere.bind(this, 'shop')} >
              进店看看
            </View>
          </View>
        </View>
        <View className='store-info' onClick={this.goInmeddiate.bind()}>
          <View className='channel-top'>
            <View className='channel-top-title'>
              <Text className='left-text'>为你推荐</Text>
            </View>
            <View className='channel-top-more'>
              <View>
                <Text className='right-text'>查看更多
                  <AtIcon value='chevron-right' size='15' color='#515151'></AtIcon>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className='other-commodities'>
          {
            !!recommendproductsList && (
              <View className='swipers'>
                <swiper
                  // circular
                  indicator-dots
                  indicator-active-color='#FC766B'
                  autoplay='{{true}}'
                  interval='{{6000}}'
                >
                  <swiper-item key='1' >
                    <View className='content'>
                      {recommendproductsList.slice(0,3).map(item => (
                        <View
                          className='content-view'
                          onClick={this.gotodetail.bind(this, item.productId )}
                        >
                          <View className='commodities-img'>
                            <Image className='img' mode='aspectFit' src={item.detail} />
                          </View>
                          <View className='commodities-name'>
                            {item.name}
                          </View>
                          <View className='commodities-price'>
                            <Text >¥</Text>
                            <Text >
                              {
                                Number(item.sale).toFixed(2).toString().split('.')[0]
                              }
                            </Text>
                            <Text style='font-size: 10px;margin-top:10px;'>.</Text>
                            <Text style='font-size: 10px;'>
                              {
                                Number(item.sale).toFixed(2).toString().split('.')[1]
                              }
                            </Text>
                            <Text style="font-size: 10px;"> /天</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </swiper-item>
                  <swiper-item key='2' >
                    <View className='content'>
                      {recommendproductsList.slice(3,6).map(item => (
                        <View
                          className='content-view'
                          onClick={this.gotodetail.bind(this, item.productId )}
                        >
                          <View className='commodities-img'>
                            <Image className='img' mode='aspectFit' src={item.detail} />
                          </View>
                          <View className='commodities-name'>
                            {item.name}
                          </View>
                          <View className='commodities-price'>
                            <Text >¥</Text>
                            <Text >
                              {
                                Number(item.sale).toFixed(2).toString().split('.')[0]
                              }
                            </Text>
                            <Text style='font-size: 10px;margin-top:10px;'>.</Text>
                            <Text style='font-size: 10px;'>
                              {
                                Number(item.sale).toFixed(2).toString().split('.')[1]
                              }
                            </Text>
                            <Text style="font-size: 10px;"> /天</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </swiper-item>
                  {recommendproductsList.length === 9 && (
                    <swiper-item key='3' >
                      <View className='content'>
                        {recommendproductsList.slice(6,9).map(item => (
                          <View
                            className='content-view'
                            onClick={this.gotodetail.bind(this, item.productId )}
                          >
                            <View className='commodities-img'>
                              <Image className='img' mode='aspectFit' src={item.detail} />
                            </View>
                            <View className='commodities-name'>
                              {item.name}
                            </View>
                            <View className='commodities-price'>
                              <Text >¥</Text>
                              <Text >
                                {
                                  Number(item.sale).toFixed(2).toString().split('.')[0]
                                }
                              </Text>
                              <Text style='font-size: 10px;margin-top:10px;'>.</Text>
                              <Text style='font-size: 10px;'>
                                {
                                  Number(item.sale).toFixed(2).toString().split('.')[1]
                                }
                              </Text>
                              <Text style="font-size: 10px;"> /天</Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </swiper-item>
                  )}
                </swiper>
              </View>

            )
          }
        </View>
        <View className='main-area'>
          <View className='tab'>
            <View className={`item ${mainActive === 'detail' && 'active-item'}`} onClick={this.onMainTabActive.bind(this, 'detail')}>
              <View>图文详情</View>
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
            <View className={`item ${mainActive === 'rule' && 'active-item'}`} onClick={this.onMainTabActive.bind(this, 'rule')}>
              <View>租赁规则</View>
              {mainActive === 'rule' && (
                <View className='active-line' />
              )}
            </View>
          </View>
          <View className='info'>
            {mainActive === 'detail' && (
              <ParseComponent mark={detail.detail} />
            )}
            {mainActive === 'rent' && (
              <View>
                <View className='detail-name'>{detail.rentRule.name}：</View>
                <ParseComponent mark={detail.rentRule.content} />
                <View className='detail-name'>{detail.compensateRule.name}：</View>
                <ParseComponent mark={detail.compensateRule.content} />
              </View>
            )}
            {mainActive === 'rule' && (
              <View className='rule-img'>
                <Image className='img' src={processRule} />
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
              {/*<View className='black-botton' onClick={this.onShareMember}>0元领会员</View>*/}
              <View className='red-botton'   onClick={this.onShowSKUClick}>立即租赁</View>
          </View>
        </View>
        <popup show={showServicePopup} position='bottom' zIndex={999} disableScroll onClose={this.onServicePopupClose}>
          <View className='service-popup'>
            <View className='service-popup-title'>服务说明</View>
            <View className='service-popup-content'>
              <View className='service-popup-content-item' >
                <View className='service-popup-content-item-type'>芝麻信用免押金</View>
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
        {/*<View className='popup-coupon'>*/}
        <View className='coupon-popup'>
        <AtFloatLayout
          isOpened={showCoupons}

            // show='true'
            // className='popup-coupon'
            // position='bottom'
            // zIndex={2002}
          onClose={this.onCouponClose}
            // onClose={this.onCouponClose}
          // className='product-float'
          className='product-float'
          >
              <View className='coupon-popup-close' onClick={this.onCouponClose}>
                <Image className='coupon-popup-close-img' src='http://oss.huizustore.com/04cba394b2e843dd9c067ea40156d24e.png' />
              </View>
              <View className='coupon-popup-title'>优惠券领取</View>
              <View className='coupon-popup-dec'>
                <View>
                  可领取优惠劵
                </View>
                {/*<View onClick={this.GoMoreCoupon}>*/}
                {/*  更多*/}
                {/*  <Text className='bol'>*/}
                {/*    >*/}
                {/*  </Text>*/}
                {/*</View>*/}
              </View>
              <ScrollView
                scrollY
                scrollTop='0'
                scrollWithAnimation
                className='coupon-popup-content'
              >
                {!!productCoupon && !!productCoupon.shopCoupon && !!productCoupon.shopCoupon.length>0 && productCoupon.shopCoupon.map(coupon => (
                  <View className='coupon-popup-content-item' key={coupon.id}>
                    <View className='coupon-popup-content-item-left'>
                      <View><Text className='coupon-popup-content-item-price'><Text className='bol'>¥</Text>{coupon.value}</Text></View>
                      <View>{coupon.name}</View>
                    </View>
                    <View className='coupon-popup-content-item-right'>
                      <View className='coupon-popup-content-item-right-content'>
                        <View className='coupon-popup-content-item-right-content-name'>店铺劵</View>
                        <View className='coupon-popup-content-item-right-content-dec'>满{coupon.minPurchase}-{coupon.value}</View>
                        {coupon.type===0 &&(
                          <View>
                            {!!coupon.end && (
                              <View className='coupon-popup-content-item-right-content-time'>{coupon.start.substr(0, 10)}~{coupon.end.substr(0, 10)}</View>
                            )}
                          </View>
                        )}
                      </View>
                      <View>
                        {
                          coupon.status === 0?
                            (
                              <View
                                className='coupon-popup-content-item-right-draw'
                                onClick={this.handleGetCoupon.bind(this, coupon.couponId)}
                              >
                                立即领取
                              </View>
                            ):
                            (
                              <View
                                className='coupon-popup-content-item-right-draw coupon-popup-content-item-right-draw-al'
                              >
                                已领取
                              </View>
                            )
                        }
                      </View>
                    </View>
                  </View>
                ))}
                {!!productCoupon && !!productCoupon.platformCoupon && !!productCoupon.platformCoupon.length>0 && productCoupon.platformCoupon.map(coupon => (
                  <View className='coupon-popup-content-item' key={coupon.id}>
                    <View className='coupon-popup-content-item-left'>
                      <View><Text className='coupon-popup-content-item-price'><Text className='bol'>¥</Text>{coupon.value}</Text></View>
                      <View>{coupon.name}</View>
                    </View>
                    <View className='coupon-popup-content-item-right'>
                      <View className='coupon-popup-content-item-right-content'>
                        <View className='coupon-popup-content-item-right-content-name'>平台劵</View>
                        <View className='coupon-popup-content-item-right-content-dec'>满{coupon.minPurchase}-{coupon.value}</View>
                        {coupon.type===0 &&(
                          <View>
                            {!!coupon.end && (
                              <View className='coupon-popup-content-item-right-content-time'>{coupon.start.substr(0, 10)}~{coupon.end.substr(0, 10)}</View>
                            )}
                          </View>
                        )}
                      </View>
                      <View>
                        {
                          coupon.status === 0?
                            (
                              <View
                                className='coupon-popup-content-item-right-draw'
                                onClick={this.handleGetCoupon.bind(this, coupon.couponId)}
                              >
                                立即领取
                              </View>
                            ):
                            (
                              <View
                                className='coupon-popup-content-item-right-draw coupon-popup-content-item-right-draw-al'
                              >
                                已领取
                              </View>
                            )
                        }
                      </View>
                    </View>
                  </View>
                ))}
                { productCoupon && !productCoupon.shopCoupon.length  && !productCoupon.platformCoupon.length  && (
                  <NoData className='NoData' type='receive-coupon' display={display} />
                )}
              </ScrollView>
              {/*<View className='coupon-popup-bottom'>*/}
              {/*  <View className='coupon-popup-bottom-submit' onClick={this.onCouponClose}>确定</View>*/}
              {/*</View>*/}
          </AtFloatLayout>
        </View>
        {/*</View>*/}
        <View className='popup-sku'>
          <AtFloatLayout
            isOpened={showSKUPopup}
            // isOpened='true'
            onClose={this.onSKUPopupClose}
            scrollY={false}
            className='product-float'
          >
            <View className='popup-sku-close' onClick={this.onSKUPopupClose}>
              <Image className='popup-sku-close-img' src='http://oss.huizustore.com/04cba394b2e843dd9c067ea40156d24e.png' />
            </View>
            <View className='popup-sku-header'>
              <View className='popup-sku-header-img'>
                <Image className='img' src={currentSku.values[0].image || detail.images[0].src} />
              </View>
              <View className='popup-sku-header-dec'>
                <View className='price-day'>
                  <Text className='unit'>¥</Text>
                  <Text className='price-text'>{Number(currentSku.currentCyclePrice.price && currentSku.currentCyclePrice.price).toFixed(2).toString().split('.')[0]}</Text>
                  <Text className='spots'>.</Text>
                  <Text className='small-price'>
                    {
                      Number(currentSku.currentCyclePrice.price && currentSku.currentCyclePrice.price).toFixed(2).toString().split('.')[1]
                    }
                  </Text>
                  <Text className='day-text'>/天</Text>
                </View>
                <View className='month-price'>
                  月租金
                  <Text className='text'>
                    ¥{(totelRentPrice / Math.ceil(currentDays / 31)).toFixed(2)}
                  </Text>
                </View>
                <View className='sku-info'>
                  已选 {currentSku.values && currentSku.values.map(value => `${ value.name }`)} <Text className='days-mr'>{currentDays}</Text>
                </View>
              </View>
            </View>
            <View className='popup-bottom'>
              <View className='area-scroll'>
                <ScrollView
                  scrollY
                  scrollTop='0'
                  scrollWithAnimation
                  className='content-area'
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
                        <View className='item-text'>租期
                          {/*(最少{detail.minRentCycle}天，最多{detail.maxRentCycle}天)*/}
                        </View>
                        <View className='item-tags'>
                          {currentValidCyclePrices.map(cycle => (
                            <View
                              key={cycle.id}
                              className={`tag ${cycle.days === currentDays && !editRentDays && 'tag-active'}`}
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
                              <Input className='text' type='number' value={daysValue} onInput={this.handleCustomValue} adjustPosition focus onBlur={this.handleCustomBlur} />
                            ) : daysValue ? `${daysValue}天` : '自定义'}
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                  <View className='data-item'>
                    <View className='item-text ml-30'>起租日</View>
                    <ScrollView scroll-x>
                      <View className='data-tags'>
                        {advancedDays && advancedDays.map((day, index) => (
                          <View
                            className={`tag tag-data ${startDay === day && 'tag-active'}`}
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
                          <View className='title'>
                            <View>
                              安心服务 <Text className='text'>(非必选)</Text>
                            </View>
                            <View>
                              <Image className='img'  onClick={this.onShowAdditionalClick} src='http://oss.huizustore.com/1b3fc39bc491459db22afaf4dca751cc.png' />
                            </View>
                          </View>
                          {/*<View className='server-text' onClick={this.onShowAdditionalClick}>服务介绍</View>*/}
                        </View>
                        <View className='item-tags-server'>
                          {detail.additionalServices.map((ser) => (
                            <View
                              key={ser.id}
                              className={`tag-server ${saveServers.findIndex((id) => id === ser.id) > -1 && 'tag-server-active'}`}
                              onClick={this.handleSaveServiceClick.bind(this, ser)}
                            >
                              {ser.name}
                              {/* {ser.isMust && (<Text>(必选)</Text>)} */}
                              <View className='choice'>
                                <View>
                                  {`￥${ser.price}元`}
                                </View>
                                <View>
                                  <Image className='img'  src={saveServers.findIndex((id) => id === ser.id) > -1?'http://oss.huizustore.com/8814ee100b2942fbac7a0d2cdddb8cc7.png':'http://oss.huizustore.com/1cff3f432bf84351bbd4b89abd959fe8.png'} />
                                </View>
                              </View>
                            </View>

                          ))}
                        </View>
                      </View>
                    </View>
                  )}
                </ScrollView>
              </View>
              <View className='bottom'>
                <Form report-submit='true' onSubmit={this.formSubmit}>
                  {/*<Button className='red-botton'  formType='submit' onClick={this.onShowSKUClick}>立即租用</Button>*/}
                  <Button className='submit' formType='submit' >确定</Button>
                </Form>
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
          <View style={{ textAlign: 'left',marginBottom: '10px', paddingLeft: '15px' }}>平台客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectService.bind(this, customerServiceTel)}>{customerServiceTel}</Text></View>
          <View style={{ textAlign: 'left', paddingLeft: '15px' }}>工作时间：<Text style={{ color: '#777' }} > 10:30 - 19:30</Text></View>
          <View slot='footer'>取消拨打</View>
        </modal>

        <popup show={showAdditionalPopup} position='bottom' zIndex={2003} disableScroll onClose={this.onAdditionalPopupClose}>
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
