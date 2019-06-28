import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button, Form, input, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'

import { blankSpace, formatDate, leftTimer, leftTimerMS, transdate } from '../../utils/utils'
import { orderStatus, customerServiceTel } from '../../assets/Constant';

import CancelOrder from '../../components/cancelOrder';

import './index.scss';

@connect(({orderDetail,renewal, loading }) => ({
  ...renewal,
  ...orderDetail,
  loading: loading.models.renewal,
}))
class Orderdetail extends Component {
  config = {
    navigationBarTitleText: '续租确定',
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
    daysValue:null
  }

  componentDidMount = () => {
    const { orderId } = this.$router.params;
    const { dispatch } = this.props;
    dispatch({
      type: 'orderDetail/selectUserOrderDetail',
      payload: { orderId },
    });
    dispatch({
      type:'renewal/confirmRelet',
      payload:{
        orderId: orderId,
      }
    })
    this.countDown();
  };
  showToast(title) {
    Taro.showToast({
      title:title,
      icon:'none'
    })
  }
  handleCancel = () => {
    this.setState({ cancelOrderDisplay: true });
  }

  handleModalCancel = () => {
    this.setState({ cancelOrderDisplay: false });
  }

  handleModalOk = (value) => {
    const { dispatch, userOrders } = this.props;
    dispatch({
      type: 'orderDetail/userCancelOrder',
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
      type: 'orderDetail/userConfirmReceipt',
      payload: { orderId },
    });
    this.setState({ receiveDoodsDisplay: false });
  }


  onClickFrezzAgain = (orderId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'orderDetail/userFrezzAgain',
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
    const { onShowPopoverTap } = this.props;
    onShowPopoverTap();
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
  connectServices = () => {
    my.makePhoneCall({ number: customerServiceTel });
  }

  handleHelpDJ = () => {
    // eslint-disable-next-line no-undef
    my.alert({
      content: '您的冻结押金将冻结在您的支付宝或惠租账户中，当订单完结后，押金将立即原路退还予您的支付账户',
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
  handleCustomValue = (e) => {
    this.setState({ daysValue: e.target.value });
  }
  handleCustomBlur = () => {
   const { dispatch } = this.props
   const { orderId } = this.$router.params;
   const { daysValue } = this.state
    if(!daysValue){
      this.showToast('请输入天数')
      return
    }
    dispatch({
      type:'renewal/reletBuyDays',
      payload:{
        days:daysValue,
        orderId:orderId,
      }
    })
  }
  confirmPay = () => {
    const { renewalInf ,dispatch } =  this.props

    dispatch({
      type:'renewal/submitRelet',
      payload:{
          couponId: "",
          couponType: "",
          duration: 30,
          end: "2019-06-19 00:00:00",
          itemId: "1556554563291",
          message: "111",
          num: 1,
          orderId: "1000000287098113",
          serviceList: [],
          start: "2019-06-16 00:00:00",
          totalRent: 100,
      }
      // payload:{
      //   couponId: "",
      //   couponType: "",
      //   duration: 30,
      //   end: "2019-06-19 00:00:00",
      //   itemId: "1556554563291",
      //   message: "111",
      //   num: 1,
      //   orderId: "1000000287098113",
      //   serviceList: [],
      //   start: "2019-06-16 00:00:00",
      //   totalRent: 100,
      // }
    })
  }
  render() {
    const { cancelOrderDisplay, receiveDoodsDisplay, modifySettlementDisplay, countDownStr, showServicePhone , position,  show , showMask,daysValue} = this.state;
    const { cashes, product, userAddress, userOrders, loading,renewalInf,confirmInf} = this.props;
    const createTiemStr = userOrders.createTime && formatDate(new Date(userOrders.createTimeStr), 'yyyy年MM月dd hh:mm');
    const rentStartStr = userOrders.rentStart && formatDate(new Date(userOrders.rentStartStr), 'yyyy年MM月dd');
    const unrentTimeStr = userOrders.unrentTime && formatDate(new Date(userOrders.unrentTimeStr), 'yyyy年MM月dd');
    const rentStartStrs =  formatDate(new Date(userOrders.rentStartStr), 'yyyy-MM-dd hh:mm');
    let rentTime = null
    if(renewalInf && renewalInf.end){
        rentTime =  formatDate(new Date(renewalInf.end), 'yyyy/MM/dd');
    }
    console.log(leftTimer('2019-06-15 '))
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
        {/*<View className='order-status'>*/}
        {/*  <View>*/}
        {/*    <View className='status'>*/}
        {/*      <View className='paid-img' />*/}
        {/*      <View className='text'>{orderStatusInfo(userOrders.status, userOrders.subStatus)}</View>*/}
        {/*    </View>*/}
        {/*    <View className='midd-content'>商品租用到期归还后，冻结预授权金额将会释放</View>*/}
        {/*    {userOrders.status === 'WAITING_PAYMENT' && (*/}
        {/*      <View className='bott-content'>订单{countDownStr}后将自动取消，请尽快支付</View>*/}
        {/*    )}*/}
        {/*    {userOrders.status === 'WAITING_GIVE_BACK' && (*/}
        {/*      <View className='bott-content'>*/}
        {/*        {transdate(rentStartStrs)- Date.parse(new Date())>0?*/}
        {/*          (*/}
        {/*            <View>*/}
        {/*              还有{leftTimer(userOrders.unrentTimeStr)}租期结束*/}
        {/*            </View>*/}
        {/*          ):(*/}
        {/*            <View>*/}
        {/*              租期已结束，请及时归还，如有问题请联系客服*/}
        {/*            </View>*/}
        {/*          )*/}
        {/*        }*/}
        {/*      </View>*/}
        {/*    )}*/}
        {/*  </View>*/}
        {/*  <View><AtIcon value='chevron-right' color='#fff' /></View>*/}
        {/*</View>*/}
        {/*<View className='address-area'>*/}
        {/*  <View className='contact-num'>*/}
        {/*    <Text className='name'>{userAddress.realname}</Text>*/}
        {/*    <Text>{userAddress.telephone}</Text>*/}
        {/*  </View>*/}
        {/*  <View className='content'>*/}
        {/*    <View className='location-img' />*/}
        {/*    <View>{userAddress.provinceStr}{userAddress.cityStr}{userAddress.areaStr}{userAddress.street}</View>*/}
        {/*  </View>*/}
        {/*</View>*/}
        <View className='address-bottom' />
        <View className='goods-area'>
          {/*<View className='shop-info' onClick={this.goShop.bind(this,product.shop.shopId)}>*/}
          {/*  <Image className='img' mode='aspectFit' src={product.shop.logo} />*/}
          {/*  <View className='name'>{product.shop.name}</View>*/}
          {/*  <AtIcon value='chevron-right' size='20' color='#ccc' />*/}
          {/*</View>*/}
          <View className='goods-info'>
            <Image className='img'  onClick={this.goProductDetails.bind(this,product.images[0].productId)} mode='aspectFit' src={confirmInf.productImage} />
            <View className='goods'>
              <View className='title'>{confirmInf.productName}</View>
              <View className='spec'>规格：{confirmInf.spec}</View>
              <View className='rent'> 总租金： ￥<Text className='price'>{confirmInf.orderTotalRent}</Text></View>
            </View>
          </View>
        </View>
        <View className='renewal-days'>
          <View className='border'></View>
          <View className='title'>续租天数</View>
          {/*<Form >*/}
          {/*  <Input*/}
          {/*    */}
          {/*  />*/}
          {/*</Form>*/}
          <View className='ren-day'>
            <View className='day'>租用天数</View>
              <Input  type='number'   className='text' placeholder='请输入天数'  onInput={this.handleCustomValue} adjustPosition  onBlur={this.handleCustomBlur}  />
          </View>
        </View>
          {!!renewalInf && (
          <View className='renewal-details'>
            <View className='border'></View>
            <View className='title'>续租详情</View>
            <View className='price-area'>
              <View className='gray-info margin-bottom-37'>
                <View className='left-text'>还租时间</View><View className='right-text'>{rentTime}</View>
              </View>
              <View className='black-info margin-bottom-36'>
                <View className='left-text'>总租金</View><View className='right-text'>￥{renewalInf.prices.orderAmount}</View>
              </View>
              <View className='gray-info margin-bottom-30'>
                {/*<View className='left-text'>运费</View><View className='right-text'>￥{cashes.freightPrice ? cashes.freightPrice.toFixed(2) : '0.00'}</View>*/}
                <View className='left-text'>优惠</View><View className='right-text'>{renewalInf.prices.depositAmount}</View>
              </View>
              <View className='gray-info margin-bottom-25'>
                <View className='left-text'>增值服务</View><View className='right-text'>￥{renewalInf.prices.additionalServicesPrice}</View>
              </View>
              <View className='gray-info margin-bottom-25'>
                <View className='left-text'>冻结</View><View className='right-text'>￥{renewalInf.prices.depositAmount}</View>
              </View>
              <View className='gray-info margin-bottom-25'>
                <View className='left-text'>会员权益</View><View className='right-text'>暂无</View>
              </View>
              <View className='black-info margin-bottom-30'>
                <View className='left-text'>首期应付</View><View className='right-text'>￥{renewalInf.prices.firstPeriodsPrice}</View>
              </View>
              <View className='gray-info margin-bottom-25'>
                <View className='left-text'>剩余还款计划</View><View className='right-text'>￥{renewalInf.prices.originalMonthRentPrice} <Text className='xxx'>x</Text> {renewalInf.prices.totalPeriods} </View>
              </View>
              {/*<View className='gray-info margin-bottom-30'>*/}
              {/*  <View className='left-text'>剩余还款计划</View>*/}
              {/*  <View className='right-text' onClick={this.handleHelpDJ}>*/}
              {/*    <Text style={{ paddingRight: '5px' }}>￥{cashes.deposit ? cashes.deposit.toFixed(2) : '0.00'}</Text>*/}
              {/*    <am-icon type='help' size='{{18}}' color='#999' />*/}
              {/*  </View>*/}
              {/*</View>*/}
              {/*<View className='dividing margin-bottom-30' />*/}
              {/*<View className='black-info'>*/}
              {/*  <View className='left-text'>合计支付</View><View className='right-text' style={{ color: '#FC766B' }}>￥{cashes.total ? cashes.total.toFixed(2) : '0.00'}</View>*/}
              {/*</View>*/}
            </View>
          </View>
          )}
        <View className='message'>
          <View>买家留言：</View>
          <Input className='input-mess' placeholder='请在这里留下您的备注' adjustPosition onInput={this.onMessageInput} />
        </View>
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
        {!!renewalInf && (
          <View className='pay_member'>
            <View className='subtotal'>
              实付
            </View>
            <View className='price'>
              <Text className='bol'>¥</Text>{ renewalInf.prices.firstPeriodsRentPrice }
              {/*<Text className='nian'>（{memberIfn.settingList[memValue-1].validityDay}个月）</Text>*/}
              {/*<View className='agreement' onClick={this.ment}>*/}
              {/*  开通即同意《惠租会员协议》*/}
              {/*</View>*/}
            </View>
            <View className='pay'>
              <Button onClick={this.confirmPay} className='pay_btn'>确定并支付</Button>
            </View>
          </View>
        )}

        {/*{*/}
        {/*  userOrders.status === 'WAITING_PAYMENT' && (*/}
        {/*    <View className='end-banner'>*/}
        {/*      <View className='button-bar' onClick={this.handleCancel}>取消订单</View>*/}
        {/*      <View className='button-bar-active' onClick={this.onClickFrezzAgain.bind(this, userOrders.orderId)}>去支付</View>*/}
        {/*    </View>*/}
        {/*  )*/}
        {/*}*/}
        {/*{*/}
        {/*  userOrders.status === 'USER_OVERTIME_PAYMENT_CLOSED' && (*/}
        {/*    <View className='end-banner'>*/}
        {/*      <View className='button-bar' onClick={this.connectService}>联系客服</View>*/}
        {/*    </View>*/}
        {/*  )*/}
        {/*}*/}
        {/*{*/}
        {/*  userOrders.status === 'WAITING_BUSINESS_DELIVERY' && (*/}
        {/*    <View className='end-banner'>*/}
        {/*      {userOrders.subStatus !== 'USER_ORDER_PENDING_DEAL' && (*/}
        {/*        <View className='button-bar' onClick={this.onClickBillDetail}>分期账单</View>*/}
        {/*      )}*/}
        {/*      <View className='button-bar' onClick={this.connectService}>联系客服</View>*/}
        {/*    </View>*/}
        {/*  )*/}
        {/*}*/}
        {/*{*/}
        {/*  userOrders.status === 'WAITING_USER_RECEIVE_CONFIRM' && (*/}
        {/*    <View className='end-banner'>*/}
        {/*      <View className='button-bar' onClick={this.handleCancelExpress}>查询物流</View>*/}
        {/*      <View className='button-bar' onClick={this.onClickBillDetail}>分期账单</View>*/}
        {/*      <View className='button-bar' onClick={this.connectService}>联系客服</View>*/}
        {/*      <View className='button-bar-active' onClick={this.onClickReceiveGoods}>确认收货</View>*/}
        {/*    </View>*/}
        {/*  )*/}
        {/*}*/}
        {/*{*/}
        {/*  userOrders.status === 'WAITING_GIVE_BACK' && (*/}
        {/*    <View className='end-banner'>*/}
        {/*      <popover*/}
        {/*        className='popover'*/}
        {/*        position={position}*/}
        {/*        show={show}*/}
        {/*        showMask={showMask}*/}
        {/*        onMaskClick={this.onMaskClick}*/}
        {/*      >*/}
        {/*        <View  onClick={this.onShowPopoverTap}>*/}
        {/*          <Image className='img' src={require('../../images/order/popover.png')} />*/}
        {/*        </View>*/}
        {/*        <View slot='items' >*/}
        {/*          <popover-item onItemClick={this.connectService}>*/}
        {/*            <text>联系商家</text>*/}
        {/*          </popover-item>*/}
        {/*          <popover-item  onItemClick={this.onClickSendBack}>*/}
        {/*            <text>提前归还</text>*/}
        {/*          </popover-item>*/}
        {/*        </View>*/}
        {/*      </popover>*/}
        {/*      <View className='button-bar' onClick={this.onClickBillDetail}>分期账单</View>*/}
        {/*      <View className='button-bar' onClick={this.againBuy.bind(this,'buyout')} >买断</View>*/}
        {/*      <View className='button-bar-active' onClick={this.againBuy.bind(this,'renewal')} >续租</View>*/}
        {/*    </View>*/}
        {/*  )*/}
        {/*}*/}
        {/*{*/}
        {/*  userOrders.status === 'WAITING_SETTLEMENT' && !userOrders.subStatus && (*/}
        {/*    <View className='end-banner'>*/}
        {/*      {!userOrders.unrent_express_no && (*/}
        {/*        <View className='button-bar' onClick={this.onClickSendBack}>添加物流</View>*/}
        {/*      )}*/}
        {/*      <View className='button-bar' onClick={this.onClickBillDetail}>分期账单</View>*/}
        {/*      <View className='button-bar' onClick={this.connectService}>联系客服</View>*/}
        {/*    </View>*/}
        {/*  )*/}
        {/*}*/}
        {/*{*/}
        {/*  userOrders.status === 'WAITING_SETTLEMENT_PAYMENT' && (*/}
        {/*    <View className='end-banner'>*/}
        {/*      <View className='button-bar' onClick={this.onClickModifySettlement}>申请修改</View>*/}
        {/*      <View className='button-bar-active' onClick={this.onClickConfirmSettlement.bind(this, userOrders.orderId, waitTotalPay)}>确认并支付</View>*/}
        {/*    </View>*/}
        {/*  )*/}
        {/*}*/}
        {/*{*/}
        {/*  userOrders.status === 'WAITING_SETTLEMENT' && userOrders.subStatus === 'USER_APPLICATION_CHANGE_SETTLEMENT' && (*/}
        {/*    <View className='end-banner'>*/}
        {/*      <View className='button-bar' onClick={this.onClickBillDetail}>分期账单</View>*/}
        {/*      <View className='button-bar' onClick={this.connectService}>联系客服</View>*/}
        {/*    </View>*/}
        {/*  )*/}
        {/*}*/}
        <CancelOrder
          display={cancelOrderDisplay}
          onCancal={this.handleModalCancel}
          onOk={this.handleModalOk}
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
          <View style={{ textAlign: 'left', paddingLeft: '15px' }}>平台客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectServices.bind(this, customerServiceTel)}>{customerServiceTel}</Text></View>
          <View slot='footer'>取消拨打</View>
        </modal>
      </View >
    )
  }
}

export default Orderdetail;
