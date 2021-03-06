import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button, Form, input, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction, } from 'taro-ui'

import { formatDate,  leftTimerMS,dateDiff } from '../../utils/utils'
import {  customerServiceTel } from '../../assets/Constant';

import CancelOrder from '../../components/cancelOrder';

import './index.scss';

@connect(({orderDetail,renewal, loading }) => ({
  ...renewal,
  ...orderDetail,
  loading: loading.models.renewal,
}))
class Orderdetail extends Component {
  config = {
    navigationBarTitleText: '续租确认',
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
    daysValue:null,
    stageBillModal:false,
    message:null,
    renewalInf:null
  }

  componentDidMount = () => {
    const { orderId , dueTimeP} = this.$router.params;
    const { dispatch } = this.props;
    // console.log(dueTimeP,'=============================================',this.$router.params)
    if(dueTimeP>0){
      my.alert({
        title: '亲',
        content: '当前时间距租期结束日超过30天，暂不支持续租，请在租期临近结束30天内发起续租',
        buttonText: '我知道了',
        // cancelButtonText: 'none',
        success: (result) => {
          Taro.navigateBack()
        },
      });
    }
    else {
      dispatch({
        type:'renewal/confirmRelet',
        payload:{
          orderId:orderId,
        },
        callback:(val)=>{
          if(val === 1){
            this.setState({
              stageBillModal:true
            })
          }
        }
      })
      this.countDown();
    }
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
    // const { onShowPopoverTap } = this.props;
    // onShowPopoverTap();
    this.setState({
      show: true,
    })
  }
  connectService = () => {
    this.setState({
      showServicePhone: true
    })
  }
  connectServices = () => {
    my.makePhoneCall({ number: customerServiceTel });
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
   const { dispatch ,confirmInf } = this.props
   const { orderId } = this.$router.params;
   const { daysValue } = this.state
    if(!daysValue){
      this.showToast('请输入天数')
      return
    }
    if(daysValue>365){
      this.showToast('最大租用天数为365天')
      return
    }
    dispatch({
      type:'renewal/reletBuyDays',
      payload:{
        days:daysValue,
        orderId:orderId,
        serviceList: confirmInf.serviceList?confirmInf.serviceList:'',
      },
      callback:(data)=>{
        this.setState({
          renewalInf:data
        })
      }
    })
  }
  confirmPay = () => {
    const { confirmInf ,dispatch } =  this.props
    const { message , daysValue ,renewalInf} = this.state
    const { orderId } = this.$router.params;
    dispatch({
      type:'renewal/submitRelet',
      payload:{
          couponId:renewalInf.defaultCoupon.couponId?renewalInf.defaultCoupon.couponId:'',
          couponType: renewalInf.defaultCoupon.type?renewalInf.defaultCoupon.type:'',
          duration:  daysValue,
          end: renewalInf.end,
          itemId:confirmInf.productId,
          message: message?message:"",
          num: 1,
          orderId: orderId,
          serviceList: confirmInf.serviceList?confirmInf.serviceList:[],
          start: renewalInf.start,
          totalRent: confirmInf.orderTotalRent,
      },
      callback:(type)=>{
        if(type === 'suc'){
          Taro.redirectTo({
            url:`/pages/orderList/index`
          })
        }
        else {
          Taro.redirectTo({
            url:`/pages/orderList/index`
          })
        }
      }
    })
  }
  stageBack = () => {
    Taro.navigateBack()
  }
  confirmStage = (val) => {
    const { dispatch , } = this.props
    dispatch({
      type:'renewal/allOrderStages',
      payload:{
        stageMoney:val.stageMoney,
        orderId:val.orderId
      },

      callback:(type)=>{
        if(type === 'suc'){
          this.setState({
            stageBillModal:false
          })
        }
      }
    })
  }

  gotoProtocol = () => {
    Taro.navigateTo({ url: '/pages/webview/xieyi' });
  }
  onMessageInput = (e) => {
    this.setState({ message: e.detail.value });
  }
  render() {
    const { cancelOrderDisplay, receiveDoodsDisplay, modifySettlementDisplay,  showServicePhone ,stageBillModal,renewalInf} = this.state;
    const { product, userOrders, loading,confirmInf} = this.props;
    let startTime = null
    if(renewalInf && renewalInf.end){
      startTime =  formatDate(new Date(dateDiff(renewalInf.start)), 'yyyy/MM/dd');
    }
    let endTime = null
    if(renewalInf && renewalInf.end){
        endTime =  formatDate(new Date(dateDiff(renewalInf.end)), 'yyyy/MM/dd');
    }
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='orderDetail-page'>
        <View className='address-bottom' />
        <View className='goods-area'>
          <View className='goods-info'>
            <Image className='img'  onClick={this.goProductDetails.bind(this,confirmInf.images[0].productId)} mode='aspectFit' src={confirmInf.productImage} />
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
          <View className='ren-day'>
            <View className='day'>租用天数</View>
              <Input  type='number'  className='text' placeholder='请输入天数'  onInput={this.handleCustomValue} adjustPosition  onBlur={this.handleCustomBlur}  />
          </View>
        </View>
          {!!renewalInf && (
          <View className='renewal-details'>
            <View className='border'></View>
            <View className='title'>续租订单详情</View>
            <View className='price-area' >
              <View className='gray-info margin-bottom-37'>
                <View className='left-text'>还租时间</View><View className='right-text'>{startTime} - {endTime}</View>
              </View>
              <View className='black-info margin-bottom-36'>
                <View className='left-text'>总租金</View><View className='right-text'>￥{renewalInf.prices.totalRent}</View>
              </View>
              <View className='gray-info margin-bottom-30'>
                {/*<View className='left-text'>运费</View><View className='right-text'>￥{cashes.freightPrice ? cashes.freightPrice.toFixed(2) : '0.00'}</View>*/}
                <View className='left-text'>优惠劵</View><View className='right-text'>{renewalInf.prices.couponPrice}</View>
              </View>
              <View className='gray-info margin-bottom-30'>
                {/*<View className='left-text'>运费</View><View className='right-text'>￥{cashes.freightPrice ? cashes.freightPrice.toFixed(2) : '0.00'}</View>*/}
                <View className='left-text member'>会员权益</View><View className='right-text member'>{renewalInf.prices.vipEquity}</View>
              </View>
              <View className='gray-info margin-bottom-25'>
                <View className='left-text'>增值服务</View><View className='right-text'>￥{renewalInf.prices.additionalServicesPrice}</View>
              </View>
              <View className='black-info margin-bottom-30'>
                <View className='left-text'>首期应付</View><View className='right-text'>￥{renewalInf.prices.firstPeriodsPrice}</View>
              </View>
              <View className='gray-info margin-bottom-25'>
                <View className='left-text'>剩余还款计划</View><View className='right-text'>￥{renewalInf.prices.otherPeriodsPrice} <Text className='xxx'>x</Text> {renewalInf.prices.restPeriods} </View>
              </View>
            </View>
          </View>
          )}
        <View className='message'>
          <View>买家留言：</View>
          <Input className='input-mess'  type='text' placeholder='请在这里留下您的备注'  onInput={this.onMessageInput} />
        </View>
        <View className='protocol' onClick={this.gotoProtocol}>
          支付即同意<Text className='text'>《刺猬优租用户交易服务协议》</Text>
        </View>
        <View className='bottom-space' />
        {!!renewalInf && (
          <View className='pay_member'>
            <View className='subtotal'>
              实付
            </View>
            <View className='price'>
              <Text className='bol'>¥</Text>{ renewalInf.prices.firstPeriodsPrice }
            </View>
            <View className='pay'>
              <Button onClick={this.confirmPay} className='pay_btn'>确定并支付</Button>
            </View>
          </View>
        )}
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
        <modal
          className='stage-modal'
          show={stageBillModal}
          showClose={false}
          onModalClick={this.onClosePhoneModal}
          onModalClose={this.onClosePhoneModal}
        >
          <View >
            <View className='content'>
              您该笔订单有未支付的分期账单总金额
              <Text className='bol'>¥</Text>
              <Text className='price'>{confirmInf.stageMoney}</Text>
            </View>
            <View className='footer'>
             <View className='btn' onClick={this.stageBack}>
               再想想
             </View>
              <View className='btn btn-c' onClick={this.confirmStage.bind(this,confirmInf)}>
                确认支付
              </View>
            </View>
          </View>
        </modal>
      </View >
    )
  }
}

export default Orderdetail;
