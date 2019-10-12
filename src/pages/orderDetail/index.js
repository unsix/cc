import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'

import { formatDate, leftTimer, leftTimerMS ,transdate ,addDate} from '../../utils/utils';
import { orderStatus, customerServiceTel } from '../../assets/Constant';

import CancelOrder from '../../components/cancelOrder';

import './index.scss';

@connect(({ orderDetail, loading }) => ({
  ...orderDetail,
  loading: loading.models.orderDetail,
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
    canCel:false,
    examineStatus:null,
    statusCancel:null,
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
    dispatch({
      type: 'orderDetail/selectUserOrderDetail',
      payload: { orderId },
    });
    dispatch({
      type:'orderDetail/getSysConfigByKey',
      payload:{
        configKey:'USER_CANCEL_ORDER:HOUR'
      }
    })
    this.countDown();
  };

  handleCancel = () => {
    this.setState({ cancelOrderDisplay: true });
  }

  handleModalCancel = () => {
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
      type: 'orderDetail/userConfirmReceipt',
      payload: { orderId },
    });
    this.setState({ receiveDoodsDisplay: false });
  }


  onClickFrezzAgain = (order) => {
    console.log(order)
    const { dispatch } = this.props;
    if(order.type === 2){
      dispatch({
        type: 'orderDetail/payReletAgain',
        payload: {
          orderId:order.orderId
        },
      });
    }
    else if(order.type === 3){
      dispatch({
        type: 'orderDetail/payBuyOutAgain',
        payload: {
          orderId:order.orderId
        },
      });
    }
    else {
      dispatch({
        type: 'orderDetail/userFrezzAgain',
        payload:{
          orderId:order.orderId
        },
      });
    }
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
      type: 'orderDetail/userApplicationForAmendmentOfSettlementForm',
      payload: { orderId },
    });
    this.setState({ modifySettlementDisplay: false });
  }

  onClickConfirmSettlement = (orderId, waitTotalPay) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'orderDetail/confirmOrderSettlement',
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
      content: '您的冻结押金将冻结在您的支付宝或汇租机账户中，当订单完结后，押金将立即原路退还予您的支付账户',
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
          type: 'orderDetail/selectUserOrderDetail',
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
  handleClickRenewalBefore = () => {
    const { userOrders } = this.props
    Taro.navigateTo({
      url:`/pages/express/index?orderId=${userOrders.originalOrderId}`
    })
  }
  handleClickCancelOrder = (order) => {
    console.log(order)
    if(order.examineStatus === 0 ){
      this.setState({
        cancelOrderDisplay: true,
        examineStatus:order.examineStatus,
        statusCancel:order.status
      });
    }
    else {
      this.setState({
        canCel:true
      })
    }
  }
  handleModalOk = (value) => {
    const { dispatch, userOrders } = this.props;
    const { orderId } = this.$router.params;
    const {examineStatus, statusCancel} = this.state
    console.log(this.state.examineStatus,this.state.statusCancel)
    if(examineStatus === 0 && statusCancel ==='WAITING_BUSINESS_DELIVERY'){
      dispatch({
        type: 'orderList/userCancelOrderSendMsg',
        payload: {
          reason: value,
          orderId:userOrders.orderId,
        },
        callback:()=>{
          dispatch({
            type: 'orderDetail/selectUserOrderDetail',
            payload: {
              orderId:userOrders.orderId
            },
          })
        }
        // callback:()=>{
        //   const { queryInfo } = this.props;
        //   const info = { ...queryInfo, pageNumber: 1 };
        //   this.setDispatch(info);
        // }
      });
    }
    else {
      dispatch({
        type: 'orderDetail/userCancelOrder',
        payload: {
          reason: value,
          orderId:userOrders.orderId
        },
      });
    }
    // dispatch({
    //   type: 'orderDetail/userCancelOrderSendMsg',
    //   payload: {
    //     reason: value,
    //     orderId: clickedOrderId,
    //   },
    //   callback:()=>{
    //     dispatch({
    //       type: 'orderDetail/selectUserOrderDetail',
    //       payload: { clickedOrderId },
    //     })
    //   }
    // });
    this.setState({ cancelOrderDisplay: false });
  }
  handleModalCancel = () => {
    this.setState({ cancelOrderDisplay: false });
  }
  // againBuy = (type) => {
  //   const { orderId } = this.$router.params;
  //   if(type === 'buyout'){
  //     Taro.navigateTo({
  //       url:`/pages/buyout/index?orderId=${orderId}`
  //     })
  //   }
  //   else {
  //     Taro.navigateTo({
  //       url:`/pages/renewal/index?orderId=${orderId}`
  //     })
  //   }
  // }
  //买断
  handleClickBuyout = () => {
    const { orderId } = this.$router.params;
    const { product } = this.props

    Taro.navigateTo({
      url:`/pages/buyout/confirm?orderId=${orderId}&itemId=${product.images[0].productId}`
    })
  }
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
  handleClickRenewalDetail =() => {
    const { orderId } = this.$router.params;
    Taro.redirectTo({
      url:`/pages/renewal/index?orderId=${orderId}`
    })
  }
  oncanCelModal = () => {
    this.setState({
      canCel:false
    })
  }
  handleGoRenewal = (orderId) => {
    Taro.navigateTo({
      url:`/pages/renewal/index?orderId=${orderId}`
    })
  }
  handleGoBuyout = (orderId) => {
    Taro.navigateTo({
      url:`/pages/buyout/index?orderId=${orderId}`
    })
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
    const { cancelOrderDisplay, receiveDoodsDisplay, modifySettlementDisplay, countDownStr, showServicePhone , position,  show , showMask,cancelOrderList,canCel} = this.state;
    const { cashes, product, userAddress, userOrders,reletOrders,buyOrder,loading,sysConfigValue ,status,restBuyOutPrice} = this.props;
    const createTiemStr = userOrders.createTime && formatDate(new Date(userOrders.createTimeStr), 'yyyy年MM月dd日 hh:mm');
    const rentStartStr = userOrders.rentStart && formatDate(new Date(userOrders.rentStartStr), 'yyyy年MM月dd日');
    const unrentTimeStr = userOrders.unrentTime && formatDate(new Date(userOrders.unrentTimeStr), 'yyyy年MM月dd日');
    const rentStartStrs =  formatDate(new Date(userOrders.unrentTimeStr ), 'yyyy-MM-dd hh:mm');
    const letTime =  formatDate(new Date(userOrders.createTimeStr ), 'yyyy-MM-dd hh:mm');
    const newTime  =  formatDate(new Date() , 'yyyy-MM-dd hh:mm');
    let dueTime = transdate(rentStartStrs) + 24*60*60*1000 - transdate(newTime)
    console.log(rentStartStrs , newTime)
    console.log(transdate(rentStartStrs)+ 24*60*60*10-transdate(newTime))
    console.log(leftTimer('2019-06-15 '))
    // let letTime = userOrders.createTime && formatDate(new Date(userOrders.createTimeStr), 'yyyy-MM-dd hh:mm');
    let dueTimeS = transdate(letTime) + sysConfigValue*60*60*1000  - transdate(newTime)
    // console.log(newTime,'111',dueTimeP)
    // // let dueTimeP =  transdate(userOrders.unrentTimeStr) - 30*24*60*60*1000 - transdate(newTime)
    // console.log(letTime,newTime,'111',sysConfigValue)
    let dueTimeMs = dueTimeS/1000
    console.log(dueTimeMs)
    // console.log(transdate(userOrders.rentStart) - transdate('2019-06-15'))
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
              {userOrders.type ===2 && (
                <Text  className='text'>续租</Text>
              )}
              {userOrders.type ===3 && (
                <Text  className='text'>买断</Text>
              )}
              <View className='text'>{orderStatusInfo(userOrders.status, userOrders.subStatus)}</View>
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
              <View className='price-area'>
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
                <View className='buyout'>
                  {/*<View className='item'>*/}
                  {/*  <View className='item-left frozen'>*/}
                  {/*    冻结押金*/}
                  {/*  </View>*/}
                  {/*  <View className='item-right frozen'>*/}
                  {/*    ¥1000*/}
                  {/*  </View>*/}
                  {/*</View>*/}
                  <View className='item'>
                    {Number(status) === 0 && (
                      <View className='item-left frozen'>
                        参考到期买断价
                      </View>
                    )}
                    {(Number(status) === 2 || Number(status) === 1) && (
                      <View className='item-left frozen'>
                        到期买断价
                      </View>
                    )}
                    { Number(status) === 1 ?
                      (
                        <View className='item-right'>
                          该商品暂不支持买断
                        </View>
                      )
                      :
                      (
                        <View className='item-right frozen'>
                          ¥{Number(restBuyOutPrice).toFixed(2)}
                        </View>
                      )
                    }
                  </View>
                </View>
                {Number(status) === 0 && (
                  <View className='buy-con'>
                    <View className='item'>
                      <View className='item-left frozen'>
                        规格为“租就送”，“免归还”，“一元买断”商品买断价为0元/1元
                      </View>
                    </View>
                  </View>
                )}
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
        {/*{!!reletOrders&&reletOrders?reletOrders.map(item=>(*/}
        {/*  <View className='order-info'>*/}
        {/*    <View className='gray-info margin-bottom-30'>*/}
        {/*      <View className='left-text'>续租订单编号</View>*/}
        {/*      <View className='right-text'>*/}
        {/*        {item.reletOrderId}*/}
        {/*        <Text className='copy-button' onClick={this.handleClickCopy.bind(this,item.reletOrderId)}>复制</Text>*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*    <View className='gray-info margin-bottom-30'>*/}
        {/*      <View className='left-text'>下单时间</View><View className='right-text'>{item.reletOrderTime}</View>*/}
        {/*    </View>*/}
        {/*    <View className='gray-info'>*/}
        {/*      <View className='left-text'>还租时间</View><View className='right-text'>{item.reletEnd}</View>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*)):*/}
        {/*  (*/}
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
        {/*  )*/}
        {/*}*/}
        {!!buyOrder&&buyOrder&&
        <View className='renewal-days'>
          <View className='border'></View>
          <View className='header'>
            <View className='title'>买断订单</View>
            <View className='to-see' onClick={this.handleGoBuyout.bind(this,buyOrder.buyOrderId)}>去看看 ></View>
          </View>
          {/*<View className='ren-day'>*/}
          {/*  <View className='day'>买断总额</View>*/}
          {/*  <View className='day colour'><Text className='bol'>¥</Text>{buyOrder.totalBuyPrice}</View>*/}
          {/*</View>*/}
          {/*<View className='ren-day '>*/}
          {/*  <View className='day'>已付租金</View>*/}
          {/*  <View className='day colour '><Text className='bol'>¥</Text>{buyOrder.payRent}</View>*/}
          {/*</View>*/}
          {/*<View className='ren-day '>*/}
          {/*  <View className='day black'>买断尾款</View>*/}
          {/*  <View className='day colour'><Text className='bol'>¥</Text>{buyOrder.totalBuyPriceFinal}</View>*/}
          {/*</View>*/}
          <View className='ren-day'>
            <View className='day'>买断订单编号</View>
            <View className='day'>{buyOrder.buyOrderId}</View>
          </View>
          <View className='ren-day'>
            <View className='day'>买断下单时间</View>
            <View className='day'>{formatDate(new Date(buyOrder.buyOrderTime), 'yyyy年MM月dd日  hh:mm')}</View>
          </View>
          <View className='ren-day'>
            <View className='day'>买断支付时间</View>
            <View className='day'>{formatDate(new Date(buyOrder.buyOrderPayTime), 'yyyy年MM月dd日  hh:mm')}</View>
          </View>
          {/*<View className='ren-day'>*/}
          {/*  <View className='day'>续租还租时间</View>*/}
          {/*  <View className='day'>*/}
          {/*    {formatDate(new Date(buyOrder.reletStart), 'yyyy年MM月dd日')}-{formatDate(new Date(buyOrder.reletEnd), 'yyyy年MM月dd日')}*/}
          {/*  </View>*/}
          {/*</View>*/}
        </View>
        }
        {!!reletOrders&&reletOrders &&reletOrders.map(item=>(
          <View className='renewal-days'>
            <View className='border'></View>
            <View className='header'>
              <View className='title'>续租订单</View>
              <View className='to-see' onClick={this.handleGoRenewal.bind(this,item.reletOrderId)}>去看看 ></View>
            </View>
            <View className='ren-day'>
              <View className='day'>续租订单编号</View>
              <View className='day'>{item.reletOrderId}</View>
            </View>
            <View className='ren-day'>
              <View className='day'>续租下单时间</View>
              <View className='day'>{formatDate(new Date(item.reletOrderTime), 'yyyy年MM月dd日  hh:mm')}</View>
            </View>
            <View className='ren-day'>
              <View className='day'>续租还租时间</View>
              <View className='day'>
                {formatDate(new Date(item.reletStart), 'yyyy年MM月dd日')}-{formatDate(new Date(item.reletEnd), 'yyyy年MM月dd日')}
              </View>
            </View>
          </View>
        ))
        }
        <View className='bottom-space' />
        {
          userOrders.status === 'WAITING_PAYMENT' && (
            <View className='end-banner'>
              <View className='button-bar' onClick={this.handleCancel}>取消订单</View>
              <View className='button-bar-active' onClick={this.onClickFrezzAgain.bind(this, userOrders)}>去支付</View>
            </View>
          )
        }
        {
          userOrders.status === 'USER_OVERTIME_PAYMENT_CLOSED' && (
            <View className='end-banner'>
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
            </View>
          )
        }
        {
          userOrders.status === 'WAITING_BUSINESS_DELIVERY' && (
            <View className='end-banner'>
              <View>
                <View >
                  {dueTimeMs>0?(
                    <View>
                      {userOrders.examineStatus === 0 ?
                        (
                          <View className='button-bar' onClick={this.handleClickCancelOrder.bind(this, userOrders)}>取消订单</View>
                        )
                        :
                        (
                          <View className='button-bar'  onClick={this.handleClickCancelOrder.bind(this,userOrders)}>处理中···</View>
                        )
                      }
                    </View>
                  ) :null
                  }
                </View>
              </View>
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
              {userOrders.subStatus !== 'USER_ORDER_PENDING_DEAL' && (
                <View className='button-bar-active' onClick={this.onClickBillDetail}>分期账单</View>
              )}
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
              {/*{ userOrders.type ===2 || dueTimeP<0?*/}
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
                  <popover-item  onItemClick={this.handleClickRenewal}>
                    <text>续租</text>
                  </popover-item>
                  {
                    userOrders.type === 2 && (
                      <popover-item  onItemClick={this.handleClickRenewalBefore}>
                        <text>查看原订单</text>
                      </popover-item>
                    )
                  }
                  {/*<popover-item  onItemClick={this.handleClickRenewal}>*/}
                  {/*  <text>续租</text>*/}
                  {/*</popover-item>*/}
                </View>
              </popover>
              {/*  ):null*/}
              {/*}*/}
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
              <View className='button-bar' onClick={this.onClickSendBack} >提前归还</View>
              <View className='button-bar-active' onClick={this.onClickBillDetail}>分期账单</View>
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
              <View className='button-bar' onClick={this.onClickBillDetail}>分期账单</View>
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
            </View>
          )
        }
        {userOrders.status === 'WAITING_SETTLEMENT'  && (
          <View className='end-banner'>
            {
              userOrders.type === 2 && (
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
                    {/*<popover-item  onItemClick={this.handleClickRenewal}>*/}
                    {/*  <text>续租</text>*/}
                    {/*</popover-item>*/}
                  </View>
                </popover>
              )
            }
            <View className='button-bar' onClick={this.connectService}>联系客服</View>
            <View className='button-bar' onClick={this.againBuy.bind(this,'buyout')} >买断</View>
            <View className='button-bar-active' onClick={this.handleClickRenewal}>续租</View>
            {/*{userOrders.type === 2 && (*/}
            {/*  <View className='button-bar' onClick={this.handleClickRenewalBefore}>查看原订单</View>*/}
            {/*)}*/}
            {/*<popover-item  onItemClick={this.handleClickRenewal}>*/}
            {/*  <text>续租</text>*/}
            {/*</popover-item>*/}
          </View>
        )}
        {
          userOrders.status === 'ORDER_FINISH' && userOrders.subStatus === 'USER_ORDER_PENDING_DEAL_SUCCESS' && (
            <View className='end-banner'>
              <View className='button-bar-active' onClick={this.connectService}>联系客服</View>
              {
                userOrders.type === 3 ||  userOrders.type === 2 && (
                  <View className='button-bar' onClick={this.handleClickRenewalBefore}>查看原订单</View>
                )
              }
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
        <modal
          show={canCel}
          // showClose={false}
          onModalClick={this.oncanCelModal}
          onModalClose={this.oncanCelModal}
          advice={true}
        >
          <View  className='cancel-modal'>
            <View slot='header' className='header'>温馨提示·</View>
            <View className='content'>
              退款处理中，预计24小时内操作完成，请耐心等待；
              如需加急处理，可联系客服：
              <Text style={{ color: '#51A0F9' }} onClick={this.connectServices.bind(this, customerServiceTel)}>{customerServiceTel}</Text>
            </View>
          </View>
        </modal>
      </View >
    )
  }
}

export default Orderdetail;
