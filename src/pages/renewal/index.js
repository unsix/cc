import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'

import { formatDate, getCurrentPageUrlWithArgs, leftTimer, leftTimerMS, transdate } from '../../utils/utils'
import { orderStatus, customerServiceTel } from '../../assets/Constant';

import CancelOrder from '../../components/cancelOrder';

import './index.scss';

@connect(({renewal, loading }) => ({
  ...renewal,
  loading: loading.models.renewal,
}))
class Orderdetail extends Component {
  config = {
    navigationBarTitleText: '订单详情页',
    'usingComponents': {
      "am-icon": "../../npm/mini-antui/es/am-icon/index",
      "popover": "../../npm/mini-antui/es/popover/index",
      "popover-item": "../../npm/mini-antui/es/popover/popover-item/index",
      "modal": "../../npm/mini-antui/es/modal/index"
    }
  };

  state = {
    cancelOrderDisplay: false, //取消订单模块显示
    receiveDoodsDisplay: false, // 确认收货模块显示
    modifySettlementDisplay: false, // 确认修改结算单模块显示
    showServicePhone: false,//model客服
    position: 'topLeft',
    show: false,
    showMask: true,
    cancelOrderList:[
      {
        value:'想要重新下单',
      },
      {
        value:'商品价格较贵',
      },
      {
        value:'等待时机较长',
      },
      {
        value:'是想了解流程',
      },
      {
        value:'不想要了',
      }
    ]
  }

  componentDidMount = () => {
    const { orderId } = this.$router.params;
    const { dispatch } = this.props;
    // console.log(this.$router,'================')
    dispatch({
      type: 'renewal/selectUserOrderDetail',
      payload: { orderId },
    });
    this.countDown();
    // console.log(getCurrentPageUrlWithArgs(),'======================1')
  };

  handleCancel = () => {
    this.setState({ cancelOrderDisplay: true });
  }

  handleModalCancel = () => {
    this.setState({ cancelOrderDisplay: false });
  }

  handleModalOk = (value) => {
    const { dispatch, userOrders } = this.props;
    dispatch({
      type: 'renewal/userCancelOrder',
      payload: {
        reason: value,
        orderId: userOrders.orderId,
      },
    });
    this.setState({ cancelOrderDisplay: false });
  }

  onClickReceiveGoods = () => {
    this.setState({ receiveDoodsDisplay: true });
  }

  handleCancalGoods = () => {
    this.setState({ receiveDoodsDisplay: false });
  }

  handleOkGoods = (orderId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'renewal/userConfirmReceipt',
      payload: { orderId },
    });
    this.setState({ receiveDoodsDisplay: false });
  }


  onClickFrezzAgain = (orderId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'orderDetail/payReletAgain',
      payload: { orderId },
    });
  }

  onClickBillDetail = () => {
    const { userOrders, product, dispatch } = this.props;
    dispatch({
      type: 'billDetail/saveProduct',
      payload: product,
    });
    Taro.navigateTo({ url: `/pages/billDetail/index?orderId=${userOrders.orderId}` })
  }

  onClickSendBack = () => {
    const { userOrders, product, dispatch } = this.props;
    dispatch({
      type: 'sendBack/saveProductAndOrder',
      payload: { product, userOrders },
    });
    Taro.navigateTo({ url: `/pages/sendBack/index?orderId=${userOrders.orderId}` });
  }

  onClickModifySettlement = () => {
    this.setState({ modifySettlementDisplay: true });
  }

  handleCancelModifySettlement = () => {
    this.setState({ modifySettlementDisplay: false });
  }

  handleOkModifySettlement = (orderId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'renewal/userApplicationForAmendmentOfSettlementForm',
      payload: { orderId },
    });
    this.setState({ modifySettlementDisplay: false });
  }

  onClickConfirmSettlement = (orderId, waitTotalPay) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'renewal/confirmOrderSettlement',
      payload: { orderId, amount: waitTotalPay },
    });
  }

  handleClickCopy = (orderId) => {
    // eslint-disable-next-line no-undef
    my.setClipboard({
      text: orderId,
      success: () => {
        Taro.showToast({
          title: '订单号复制成功' + orderId,
          icon: 'none',
        });
      },
    });
  }
  onMaskClick = () => {
    this.setState({
      show: false,
    })
  }
  onShowPopoverTap = () => {
    // const { onShowPopoverTap } = this.props;
    // onShowPopoverTap();
    this.setState({
      show: true,
    })
  }
  // connectService = (number) => {
  //   let { serviceTel } = this.props.data
  //   console.log(serviceTel)
  //   let num = String(serviceTel);
  //   my.makePhoneCall({ number:num });
  //   // const { connectService } = this.props;
  //   // connectService(number);
  //
  // }
  connectService = () => {
    this.setState({
      showServicePhone: true
    })
    // eslint-disable-next-line no-undef
    // console.log(customerServiceTel)
    // my.makePhoneCall({ number: customerServiceTel });
    // my.confirm({
    //   title: '联系客服',
    //   content: '服务时间9:00 - 20:00 ' + { customerServiceTel },
    //   confirmButtonText: '拨打',
    //   cancelButtonText: '取消',
    //   success: () => {
    //     my.makePhoneCall({ number: customerServiceTel });
    //   },
    // });
  }

  connectServices = (val) => {
    let num = String(val);
    my.makePhoneCall({ number: val });
  }

  handleHelpDJ = () => {
    // eslint-disable-next-line no-undef
    my.alert({
      content: '您的冻结押金将冻结在您的支付宝或刺猬优租账户中，当订单完结后，押金将立即原路退还予您的支付账户',
      buttonText: '知道了',
    });
  }

  countDown = () => {
    const { userOrders: { createTimeStr, status }, dispatch } = this.props;
    if (!createTimeStr) {
      setTimeout(this.countDown, 1000);
    } else {
      const cdStr = leftTimerMS(createTimeStr);
      if (status === 'WAITING_PAYMENT' && cdStr) {
        setTimeout(this.countDown, 1000);
        this.setState({ countDownStr: cdStr });
      } else {
        const { orderId } = this.$router.params;
        dispatch({
          type: 'renewal/selectUserOrderDetail',
          payload: { orderId },
        });
      }
    }
  }

  onClosePhoneModal = () => {
    this.setState({ showServicePhone: false });
  }
  goShop = (val) => {
    // const shopld = JSON.stringify(val)
    Taro.navigateTo({
      url:`/pages/shops/index?shopId=${val}`
    })
  }
  goProductDetails = (val) => {
    // const shopld = JSON.stringify(val)
    Taro.navigateTo({
      url:`/pages/productDetail/index?itemId=${val}`
    })
  }
  handleCancelExpress = () =>{
    const { orderId } = this.$router.params;
    Taro.navigateTo({
      url:`/pages/express/index?orderId=${orderId}`
    })
  }
  againBuy = (type) => {
    const { orderId } = this.$router.params;
    if(type === 'buyout'){
      Taro.navigateTo({
        url:`/pages/buyout/index?orderId=${orderId}`
      })
    }
    else {
      Taro.navigateTo({
        url:`/pages/renewal/index?orderId=${orderId}`
      })
    }
  }
  //买断
  handleClickBuyout = () => {
    const { userOrders ,product} = this.props
    if(userOrders.type === 2){
      Taro.navigateTo({
        url:`/pages/buyout/confirm?orderId=${userOrders.originalOrderId}&itemId=${product.images[0].productId}`
      })
    }
    else {
      Taro.navigateTo({
        url:`/pages/buyout/confirm?orderId=${userOrders.orderId}&itemId=${product.images[0].productId}`
      })
    }
  }
  // handleClickBuyout = () => {
  //   const { orderId } = this.$router.params;
  //   const { product } = this.props
  //   Taro.navigateTo({
  //     url:`/pages/buyout/confirm?orderId=${orderId}&itemId=${product.images[0].productId}`
  //   })
  // }
  //续租
  handleClickRenewal = () => {
    const { orderId } = this.$router.params;
    const { userOrders } = this.props
    const newTime  =  formatDate(new Date() , 'yyyy-MM-dd hh:mm');
    const rentStartStrs =  formatDate(new Date(userOrders.unrentTimeStr ), 'yyyy-MM-dd hh:mm');
    let dueTimeP =  transdate(rentStartStrs) - 30*24*60*60*1000 - transdate(newTime)
    Taro.navigateTo({
      url:`/pages/renewal/confirm?orderId=${orderId}&dueTimeP=${dueTimeP}`
    })
  }
  handleClickRenewalBefore = () =>{
    // const { orderId } = this.$router.params;
    const { userOrders } = this.props
    Taro.navigateTo({
      url:`/pages/orderDetail/index?orderId=${userOrders.originalOrderId}`
    })
  }
  onClickGoPay = () => {

  }
  connectBService = (number) => {
    let { serviceTel } = this.props.data
    console.log(serviceTel)
    let num = String(serviceTel);
    my.makePhoneCall({ number:num });
    // const { connectService } = this.props;
    // connectService(number);

  }
  connectPService = () =>{
    my.makePhoneCall({ number:customerServiceTel });
  }
  render() {
    const { cancelOrderDisplay, receiveDoodsDisplay, modifySettlementDisplay, countDownStr, showServicePhone , position,  show , showMask,cancelOrderList} = this.state;
    const { cashes, product, userAddress, userOrders, loading } = this.props;
    const createTiemStr = userOrders.createTime && formatDate(new Date(userOrders.createTimeStr), 'yyyy年MM月dd日 hh:mm');
    const rentStartStr = userOrders.rentStart && formatDate(new Date(userOrders.rentStartStr), 'yyyy年MM月dd日');
    const unrentTimeStr = userOrders.unrentTime && formatDate(new Date(userOrders.unrentTimeStr), 'yyyy年MM月dd日');
    const rentStartStrs =  formatDate(new Date(userOrders.unrentTimeStr ), 'yyyy-MM-dd hh:mm');
    const newTime  =  formatDate(new Date() , 'yyyy-MM-dd hh:mm');
    let dueTime = transdate(rentStartStrs)+ 24*60*60*10-transdate(newTime)
    let dueTimeP =  transdate(rentStartStrs) - 30*24*60*60*1000 - transdate(newTime)
    // console.log(newTime,'111',dueTimeP)
    // console.log(rentStartStrs , newTime)
    // console.log(transdate(rentStartStrs)+ 24*60*60*10-transdate(newTime))
    // console.log(leftTimer('2019-06-15 '))
    // console.log(transdate(userOrders.rentStart) - transdate('2019-06-15'))
    // console.log()
    // console.log(userOrders.rentStart().getTime())
    const orderStatusInfo = (str, subStr) => {
      let title = orderStatus[str];
      if (subStr === 'USER_APPLICATION_CHANGE_SETTLEMENT') {
        title = '待商家修改结算单'
      }
      return title;
    };
    const yqType = ['提前归还', '逾期归还', '不退租'];
    let waitTotalPay = cashes.damagePrice + cashes.lostPrice;
    if (cashes.userViolationRecords && cashes.userViolationRecords.length) {
      cashes.userViolationRecords.forEach(info => {
        waitTotalPay += info.amount;
      });
    }

    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='orderDetail-page'>
        <View className='order-status'>
          <View>
            <View className='status'>
              <View className='paid-img' />
              <View className='text'>
                续租
                {orderStatusInfo(userOrders.status, userOrders.subStatus)}
              </View>
            </View>
            <View className='midd-content'>商品租用到期归还后，冻结预授权金额将会释放</View>
            {userOrders.status === 'WAITING_PAYMENT' && (
              <View className='bott-content'>订单{countDownStr}后将自动取消，请尽快支付</View>
            )}
            {userOrders.status === 'WAITING_GIVE_BACK' && (
              <View className='bott-content'>
                {dueTime>0?
                  (
                    <View>
                      还有{leftTimer(userOrders.unrentTimeStr)}租期结束
                    </View>
                  ):(
                    <View>
                      租期已结束，请及时归还，如有问题请联系客服
                    </View>
                  )
                }
              </View>
            )}
          </View>
          <View><AtIcon value='chevron-right' color='#fff' /></View>
        </View>
        <View className='address-area'>
          <View className='contact-num'>
            <Text className='name'>{userAddress.realname}</Text>
            <Text>{userAddress.telephone}</Text>
          </View>
          <View className='content'>
            <View className='location-img' />
            <View>{userAddress.provinceStr}{userAddress.cityStr}{userAddress.areaStr}{userAddress.street}</View>
          </View>
        </View>
        <View className='address-bottom' />
        <View className='goods-area'>
          <View className='shop-info' onClick={this.goShop.bind(this,product.shop.shopId)}>
            <Image className='img' mode='aspectFit' src={product.shop.logo} />
            <View className='name'>{product.shop.name}</View>
            <AtIcon value='chevron-right' size='20' color='#ccc' />
          </View>
          <View className='goods-info'>
            <Image className='img'  onClick={this.goProductDetails.bind(this,product.images[0].productId)} mode='aspectFit' src={product.images[0].src} />
            <View className='goods'>
              <View className='title'>{product.productName}</View>
              <View className='spec'>规格：{product.skuTitle}</View>
              <View className='rent'> 总租金： ￥<Text className='price'>{cashes.totalRent ? cashes.totalRent.toFixed(2) : '0.00'}</Text></View>
            </View>
          </View>
        </View>
        {
          userOrders.status !== 'WAITING_SETTLEMENT' && userOrders.status !== 'WAITING_SETTLEMENT_PAYMENT' ? (
              <View className='price-area' style={{  paddingTop: '15px' }}>
                {!!cashes.couponPrice && (
                  <View className='gray-info margin-bottom-37'>
                    <View className='left-text'>优惠券</View><View className='right-text'>-￥{cashes.couponPrice.toFixed(2)}</View>
                  </View>
                )}
                <View className='black-info margin-bottom-36'>
                  <View className='left-text'>第一期租金</View><View className='right-text'>￥{cashes.firtOrderStagsPrice ? cashes.firtOrderStagsPrice.toFixed(2) : '0.00'}</View>
                </View>
                <View className='gray-info margin-bottom-30'>
                  {/*<View className='left-text'>运费</View><View className='right-text'>￥{cashes.freightPrice ? cashes.freightPrice.toFixed(2) : '0.00'}</View>*/}
                  <View className='left-text'>运费</View><View className='right-text'>到付</View>
                </View>
                <View className='gray-info margin-bottom-25'>
                  <View className='left-text'>安心服务</View><View className='right-text'>￥{cashes.additionalServicesPrice ? cashes.additionalServicesPrice.toFixed(2) : '0.00'}</View>
                </View>
                <View className='black-info margin-bottom-30'>
                  <View className='left-text'>首期实付款</View><View className='right-text'>￥{cashes.actualPayment ? cashes.actualPayment.toFixed(2) : '0.00'}</View>
                </View>
                {/*<View className='gray-info margin-bottom-30'>*/}
                {/*  <View className='left-text'>冻结押金</View>*/}
                {/*  <View className='right-text' onClick={this.handleHelpDJ}>*/}
                {/*    <Text style={{ paddingRight: '5px' }}>￥{cashes.deposit ? cashes.deposit.toFixed(2) : '0.00'}</Text>*/}
                {/*    <am-icon type='help' size='{{18}}' color='#999' />*/}
                {/*  </View>*/}
                {/*</View>*/}
                <View className='dividing margin-bottom-30' />
                <View className='black-info'>
                  <View className='left-text'>合计支付</View><View className='right-text' style={{ color: '#FC766B' }}>￥{cashes.firtOrderStagsPrice ? cashes.firtOrderStagsPrice.toFixed(2) : '0.00'}</View>
                </View>
              </View>
            ) :
            (
              <View>
                <View className='price-area'>
                  <View className='black-info margin-bottom-36'>
                    <View className='left-text'>实付租金</View><View className='right-text'>￥{cashes.realTotalRent ? cashes.realTotalRent.toFixed(2) : '0.00'}</View>
                  </View>
                  <View className='gray-info margin-bottom-30'>
                    <View className='left-text'>原租天数</View><View className='right-text'>{cashes.originalDays}</View>
                  </View>
                  <View className='gray-info margin-bottom-30'>
                    <View className='left-text'>实租天数</View><View className='right-text'>{cashes.realDays}</View>
                  </View>
                  {(userOrders.status === 'WAITING_SETTLEMENT_PAYMENT' || userOrders.subStatus === 'USER_APPLICATION_CHANGE_SETTLEMENT') && (
                    <View>
                      <View className='dividing margin-bottom-30' />
                      <View className='black-info margin-bottom-36'>
                        <View className='left-text'>待结算金额</View><View className='right-text'>￥{waitTotalPay ? waitTotalPay.toFixed(2) : '0.00'}</View>
                      </View>
                      <View className='gray-info margin-bottom-30'>
                        <View className='left-text'>损坏</View><View className='right-text'>￥{cashes.damagePrice ? cashes.damagePrice.toFixed(2) : '0.00'}</View>
                      </View>
                      <View className='gray-info margin-bottom-30'>
                        <View className='left-text'>丢失金额</View><View className='right-text'>￥{cashes.lostPrice ? cashes.lostPrice.toFixed(2) : '0.00'}</View>
                      </View>
                      {!!cashes.userViolationRecords && !!cashes.userViolationRecords.length && cashes.userViolationRecords.map(data =>
                        <View className='gray-info margin-bottom-30'>
                          <View className='left-text'>{yqType[Number(data.type)]}</View><View className='right-text'>￥{data.amount ? data.amount.toFixed(2) : '0.00'}</View>
                        </View>
                      )}
                      {/*{cashes&&cashes.userViolationRecords&&cashes.userViolationRecords.length>0?*/}
                      {/*  (cashes.userViolationRecords&&cashes.userViolationRecords.map(data =>*/}
                      {/*  <View className='gray-info margin-bottom-30'>*/}
                      {/*    <View className='left-text'>{yqType[Number(data.type)]}</View><View className='right-text'>￥{data.amount ? data.amount.toFixed(2) : '0.00'}</View>*/}
                      {/*  </View>*/}
                      {/*)):null}*/}
                    </View>
                  )}
                </View>
                <View className='price-area'>
                  <View className='gray-info'>
                    <View className='left-text'>待解冻押金</View><View className='right-text'>￥{cashes.waitDeposit ? cashes.waitDeposit.toFixed(2) : '0.00'}</View>
                  </View>
                </View>
              </View>
            )
        }
        <View className='order-info'>
          <View className='gray-info margin-bottom-30'>
            <View className='left-text'>订单编号</View>
            <View className='right-text'>
              {userOrders.orderId}
              <Text className='copy-button' onClick={this.handleClickCopy.bind(this, userOrders.orderId)}>复制</Text>
            </View>
          </View>
          <View className='gray-info margin-bottom-30'>
            <View className='left-text'>下单时间</View><View className='right-text'>{createTiemStr}</View>
          </View>
          <View className='gray-info'>
            <View className='left-text'>还租时间</View><View className='right-text'>{rentStartStr} - {unrentTimeStr}</View>
          </View>
        </View>
        <View className='bottom-space' />
        {
          userOrders.status === 'WAITING_PAYMENT' && (
            <View className='end-banner'>
              {
                userOrders.type === 2 && (
                  <View className='button-bar' onClick={this.handleClickRenewalBefore}>查看订单</View>
                  // <popover-item  onItemClick={this.handleClickRenewalBefore}>
                  //   <text>查看原订单</text>
                  // </popover-item>
                )
              }
              <View className='button-bar' onClick={this.handleCancel}>取消订单</View>
              <View className='button-bar-active' onClick={this.onClickFrezzAgain.bind(this, userOrders.orderId)}>去支付</View>
            </View>
          )
        }
        {
          userOrders.status === 'USER_OVERTIME_PAYMENT_CLOSED' && (
            <View className='end-banner'>
              <View className='button-bar' onClick={this.handleClickRenewalBefore}>查看原订单</View>
              <View className='button-bar-active' onClick={this.connectService}>联系客服</View>
            </View>
          )
        }
        {
          userOrders.status === 'WAITING_BUSINESS_DELIVERY' && (
            <View className='end-banner'>
              {userOrders.subStatus !== 'USER_ORDER_PENDING_DEAL' && (
                <View className='button-bar' onClick={this.onClickBillDetail}>分期账单</View>
              )}
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
            </View>
          )
        }
        {
          userOrders.status === 'WAITING_USER_RECEIVE_CONFIRM' && (
            <View className='end-banner'>
              <View className='button-bar' onClick={this.handleCancelExpress}>查询物流</View>
              <View className='button-bar' onClick={this.onClickBillDetail}>分期账单</View>
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
              <View className='button-bar-active' onClick={this.onClickReceiveGoods}>确认收货</View>
            </View>
          )
        }
        {
          userOrders.status === 'WAITING_GIVE_BACK' && (
            <View className='end-banner'>
              {/*{dueTimeP<0?*/}
              {/*  (*/}
                  <popover
                    className='popover'
                    position={position}
                    show={show}
                    showMask={showMask}
                    onMaskClick={this.onMaskClick}
                  >
                    <View  onClick={this.onShowPopoverTap}>
                      <Image className='img' src={require('../../images/order/popover.png')} />
                    </View>
                    <View slot='items' >
                        <popover-item onItemClick={this.handleClickBuyout}>
                          <text>买断</text>
                        </popover-item>
                        {/*{dueTimeP<0?*/}
                        {/*  (*/}
                        <popover-item  onItemClick={this.handleClickRenewal}>
                          <text>续租</text>
                        </popover-item>
                      {/*  ):null*/}
                      {/*}*/}
                      {/*<popover-item  onItemClick={this.handleClickRenewal}>*/}
                      {/*  <text>续租</text>*/}
                      {/*</popover-item>*/}
                      {/*{userOrders.type === 2 &&*/}
                      {/*(*/}
                        <popover-item  onItemClick={this.handleClickRenewalBefore}>
                          <text>查看原订单</text>
                        </popover-item>
                      {/*)*/}
                      {/*}*/}
                    </View>
                  </popover>
              {/*  ):null*/}
              {/*}*/}
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
              <View className='button-bar' onClick={this.onClickSendBack} >提前归还</View>
              <View className='button-bar-active' onClick={this.onClickBillDetail}>分期账单</View>
              {/*<View className='button-bar-active' onClick={this.onClickGoPay}>去支付</View>*/}
              {/*<View className='button-bar' onClick={this.againBuy.bind(this,'buyout')} >买断</View>*/}
              {/*<View className='button-bar-active' onClick={this.againBuy.bind(this,'renewal')} >续租</View>*/}
            </View>
          )
        }
        {
          userOrders.status === 'WAITING_SETTLEMENT' && !userOrders.subStatus && (
            <View className='end-banner'>
              {!userOrders.unrent_express_no && (
                <View className='button-bar' onClick={this.onClickSendBack}>添加物流</View>
              )}
              <View className='button-bar' onClick={this.onClickBillDetail}>分期账单</View>
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
            </View>
          )
        }
        {
          userOrders.status === 'WAITING_SETTLEMENT_PAYMENT' && (
            <View className='end-banner'>
              <View className='button-bar' onClick={this.onClickModifySettlement}>申请修改</View>
              <View className='button-bar-active' onClick={this.onClickConfirmSettlement.bind(this, userOrders.orderId, waitTotalPay)}>确认并支付</View>
            </View>
          )
        }
        {
          userOrders.status === 'WAITING_SETTLEMENT' && userOrders.subStatus === 'USER_APPLICATION_CHANGE_SETTLEMENT' && (
            <View className='end-banner'>
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
              <View className='button-bar-active' onClick={this.onClickBillDetail}>分期账单</View>
            </View>
          )
        }
        {userOrders.status === 'USER_CANCELED_CLOSED' && userOrders.type ===2 && (
          <View className='end-banner'>
            <View className='button-bar' onClick={this.handleClickRenewalBefore}>查看原订单</View>
          </View>
        )}
        {userOrders.status === 'ORDER_FINISH' && userOrders.type ===2 && (
          <View className='end-banner'>
            <View className='button-bar' onClick={this.handleClickRenewalBefore}>查看原订单</View>
          </View>
        )}
        {
          userOrders.status === 'WAITING_SETTLEMENT'  && (
            <View className='end-banner'>
              { userOrders.type === 2 && (
                <popover
                  className='popover'
                  position={position}
                  show={show}
                  showMask={showMask}
                  onMaskClick={this.onMaskClick}
                >
                  <View  onClick={this.onShowPopoverTap}>
                    <Image className='img' src={require('../../images/order/popover.png')} />
                  </View>
                  <View slot='items' >
                    <popover-item  onItemClick={this.handleClickRenewalBefore}>
                      <text>查看原订单</text>
                    </popover-item>
                    {/*)*/}
                    {/*}*/}
                  </View>
                </popover>
              ) }
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
              <View className='button-bar' onClick={this.handleClickBuyout} >买断</View>
              <View className='button-bar-active' onClick={this.handleClickRenewal}>续租</View>
            </View>
          )
        }
        <CancelOrder
          display={cancelOrderDisplay}
          onCancal={this.handleModalCancel}
          onOk={this.handleModalOk}
          cancelOrderList={cancelOrderList}
        />
        <AtModal isOpened={receiveDoodsDisplay}>
          <AtModalHeader>确认收货？</AtModalHeader>
          <AtModalContent>
            <View>收货即代表确认该商品符合订单要求</View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleCancalGoods}>取消</Button>
            <Button onClick={this.handleOkGoods.bind(this, userOrders.orderId)}>确定</Button>
          </AtModalAction>
        </AtModal>
        <AtModal isOpened={modifySettlementDisplay}>
          <AtModalContent>
            <View>是否申请商家修改结算单？</View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleCancelModifySettlement}>再想想</Button>
            <Button onClick={this.handleOkModifySettlement.bind(this, userOrders.orderId)}>确认申请</Button>
          </AtModalAction>
        </AtModal>
        <modal
          show={showServicePhone}
          showClose={false}
          onModalClick={this.onClosePhoneModal}
          onModalClose={this.onClosePhoneModal}
        >
          <View slot='header'>联系客服</View>
          <View style={{ textAlign: 'left', marginBottom: '10px', paddingLeft: '15px' }}>商家客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectServices.bind(this, product.shop.serviceTel)}>{product.shop.serviceTel}</Text></View>
          <View style={{ textAlign: 'left',marginBottom: '10px', paddingLeft: '15px' }}>平台客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectServices.bind(this, customerServiceTel)}>{customerServiceTel}</Text></View>
          <View style={{ textAlign: 'left', paddingLeft: '15px' }}>工作时间：<Text style={{ color: '#777' }} >10:30 - 19:30</Text></View>
          <View slot='footer'>取消拨打</View>
        </modal>
      </View >
    )
  }
}

export default Orderdetail;
