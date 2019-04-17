import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'

import { formatDate, leftTimer, leftTimerMS } from '../../utils/utils';
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
  }

  componentDidMount = () => {
    const { orderId } = this.$router.params;
    const { dispatch } = this.props;
    dispatch({
      type: 'orderDetail/selectUserOrderDetail',
      payload: { orderId },
    });
    this.countDown();
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

  render() {
    const { cancelOrderDisplay, receiveDoodsDisplay, modifySettlementDisplay, countDownStr } = this.state;
    const { cashes, product, userAddress, userOrders, loading } = this.props;
    const createTiemStr = userOrders.createTime && formatDate(new Date(userOrders.createTimeStr), 'yyyy年MM月dd hh:mm');
    const rentStartStr = userOrders.rentStart && formatDate(new Date(userOrders.rentStartStr), 'yyyy年MM月dd');
    const unrentTimeStr = userOrders.unrentTime && formatDate(new Date(userOrders.unrentTimeStr), 'yyyy年MM月dd');
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
              <View className='text'>{orderStatusInfo(userOrders.status, userOrders.subStatus)}</View>
            </View>
            <View className='midd-content'>商品租用到期归还后，冻结预授权金额将会释放</View>
            {userOrders.status === 'WAITING_PAYMENT' && (
              <View className='bott-content'>订单{countDownStr}后将自动取消，请尽快支付</View>
            )}
            {userOrders.status === 'WAITING_GIVE_BACK' && (
              <View className='bott-content'>还有{leftTimer(userOrders.unrentTimeStr)}租期结束</View>
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
          <View className='shop-info'>
            <Image className='img' mode='aspectFit' src={product.shop.logo} />
            <View className='name'>{product.shop.name}</View>
            <AtIcon value='chevron-right' size='20' color='#ccc' />
          </View>
          <View className='goods-info'>
            <Image className='img' mode='aspectFit' src={product.images[0].src} />
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
                <View className='left-text'>运费</View><View className='right-text'>￥{cashes.freightPrice ? cashes.freightPrice.toFixed(2) : '0.00'}</View>
              </View>
              <View className='gray-info margin-bottom-25'>
                <View className='left-text'>安心服务</View><View className='right-text'>￥{cashes.additionalServicesPrice ? cashes.additionalServicesPrice.toFixed(2) : '0.00'}</View>
              </View>
              <View className='black-info margin-bottom-30'>
                <View className='left-text'>首期实付款</View><View className='right-text'>￥{cashes.actualPayment ? cashes.actualPayment.toFixed(2) : '0.00'}</View>
              </View>
              <View className='gray-info margin-bottom-30'>
                <View className='left-text'>冻结押金</View>
                <View className='right-text' onClick={this.handleHelpDJ}>
                  <Text style={{ paddingRight: '5px' }}>￥{cashes.deposit ? cashes.deposit.toFixed(2) : '0.00'}</Text>
                  <am-icon type='help' size='{{18}}' color='#999' />
                </View>
              </View>
              <View className='dividing margin-bottom-30' />
              <View className='black-info'>
                <View className='left-text'>合计支付</View><View className='right-text' style={{ color: '#FC766B' }}>￥{cashes.total ? cashes.total.toFixed(2) : '0.00'}</View>
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
                          <View className='left-text'>{yqType[data.type]}</View><View className='right-text'>￥{data.amount ? data.amount.toFixed(2) : '0.00'}</View>
                        </View>
                      )}
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
              <View className='button-bar' onClick={this.handleCancel}>取消订单</View>
              <View className='button-bar-active' onClick={this.onClickFrezzAgain.bind(this, userOrders.orderId)}>去支付</View>
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
              <View className='button-bar' onClick={this.onClickBillDetail}>分期账单</View>
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
              <View className='button-bar-active' onClick={this.onClickReceiveGoods}>确认收货</View>
            </View>
          )
        }
        {
          userOrders.status === 'WAITING_GIVE_BACK' && (
            <View className='end-banner'>
              <View className='button-bar' onClick={this.onClickBillDetail}>分期账单</View>
              <View className='button-bar' onClick={this.connectService}>联系客服</View>
              <View className='button-bar-active' onClick={this.onClickSendBack}>归还</View>
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
