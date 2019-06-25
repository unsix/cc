import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'

import ListItem from './components/listItem/index'
import NoData from '../../components/noData/index'
import CancelOrder from '../../components/cancelOrder';

import nav from './nav';
import './index.scss';
import { customerServiceTel } from '../../assets/Constant'

@connect(({ orderList, loading }) => ({
  ...orderList,
  loading: loading.models.orderList,
}))
class Orderlist extends Component {
  config = {
    navigationBarTitleText: '全部订单',
    usingComponents: {
      "modal": "../../npm/mini-antui/es/modal/index"
    }
  };

  state = {
    type: 'all',
    display: 'block', // none -> 没数据隐藏
    cancelOrderDisplay: false,
    receiveDoodsDisplay: false,
    showServicePhone:false
    // position: 'bottomLeft',
    // show: false,
    // showMask: true,
  }

  componentDidMount = () => {
    const { type } = this.$router.params;
    const currentMenu = nav.find(info => info.id === type);
    let status = null;
    if (currentMenu) {
      status = [currentMenu.cname];
      if (currentMenu.id === 'settle') {
        status = ['WAITING_SETTLEMENT', 'WAITING_CONFIRM_SETTLEMENT', 'WAITING_SETTLEMENT_PAYMENT'];
      }
      if (currentMenu.id === 'overdue') {
        status = ['SETTLEMENT_RETURN_CONFIRM_PAY', 'ORDER_VERDUE'];
      }
    }
    this.setState({ type })
    const { queryInfo } = this.props;
    const info = { ...queryInfo, pageNumber: 1 };
    if (type === 'all') {
      delete info.status;
    } else {
      info.status = status;
    }
    this.setDispatch(info);
  };

  setDispatch(queryInfo, fetchType) {
    const { dispatch } = this.props;
    const info = { ...queryInfo };
    if (fetchType === 'scroll') {
      info.pageNumber += 1;
      info.fetchType = fetchType;
    }
    dispatch({
      type: 'orderList/fetchUserOrderList',
      payload: { ...info },
    });
  }

  switchTab = (item) => {
    this.setState({ type: item.id });
    let status = [item.cname];
    if (item.id === 'settle') {
      status = ['WAITING_SETTLEMENT', 'WAITING_CONFIRM_SETTLEMENT', 'WAITING_SETTLEMENT_PAYMENT'];
    }
    if (item.id === 'overdue') {
      status = ['SETTLEMENT_RETURN_CONFIRM_PAY', 'ORDER_VERDUE'];
    }
    console.log('=====', item, status);
    const info = {
      status,
      pageNumber: 1,
      pageSize: 10,
    };
    if (item.id === 'all') {
      delete info.status;
    }
    this.setDispatch(info);
  }

  onScrollToLower = () => {
    const { total, queryInfo, queryInfo: { pageNumber, pageSize } } = this.props;
    if (pageNumber * pageSize - total >= 0) {
      Taro.showToast({
        title: '没有更多订单了',
        icon: 'none',
        duration: 1000,
      });
      return;
    }
    this.setDispatch(queryInfo, 'scroll');
  };

  onClickItem = (orderId) => {
    Taro.navigateTo({ url: `/pages/orderDetail/index?orderId=${orderId}` });
  }

  onClickCancelOrder = (orderId) => {
    this.setState({
      cancelOrderDisplay: true,
      clickedOrderId: orderId,
    });
  }

  handleModalOk = (value) => {
    const { clickedOrderId } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'orderDetail/userCancelOrder',
      payload: {
        reason: value,
        orderId: clickedOrderId,
      },
    });
    this.setState({ cancelOrderDisplay: false });

  }

  handleModalCancel = () => {
    this.setState({ cancelOrderDisplay: false });
  }

  onClickBillDetail = (order) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'billDetail/saveProduct',
      payload: order,
    });
    Taro.navigateTo({ url: `/pages/billDetail/index?orderId=${order.orderId}` });
  }

  onClickFrezzAgain = (orderId) => {
    Taro.navigateTo({ url: `/pages/orderDetail/index?orderId=${orderId}` });
  }

  onClickReceiveGoods = (orderId) => {
    this.setState({
      receiveDoodsDisplay: true,
      clickedOrderId: orderId,
    });
  }

  onClickSendBack = (order) => {
    const { dispatch } = this.props;
    const product = {
      ...order,
    };
    const userOrders = {
      orderId: order.orderId,
    };
    dispatch({
      type: 'sendBack/saveProductAndOrder',
      payload: { product, userOrders },
    });
    Taro.navigateTo({ url: `/pages/sendBack/index?orderId=${order.orderId}` });
  }

  handleCancalGoods = () => {
    this.setState({ receiveDoodsDisplay: false });
  }

  handleOkGoods = () => {
    const { clickedOrderId } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'orderDetail/userConfirmReceipt',
      payload: { orderId: clickedOrderId },
    });
    this.setState({ receiveDoodsDisplay: false, clickedOrderId: null });
  }

  connectService = (val) => {
    if(val.business){
      this.setState({
        serviceTel:val.business,
        showServicePhone:true
      }
      // ,()=>{
      //   let num = String(val);
      //   if (val === 'business'){
      //     my.makePhoneCall({ number:serviceTel });
      //   }
      //   else {
      //     my.makePhoneCall({ number:num });
      //   }
      // }
      )
    }
    // const { serviceTel } = this.state
  }
  connectServices = (val) => {
      const { serviceTel } = this.state
      let num = String(val);
      if (val === 'business'){
        my.makePhoneCall({ number:serviceTel });
      }
      else {
        my.makePhoneCall({ number:num });
      }
  }
  // onMaskClick = () => {
  //   this.setState({
  //     show: false,
  //   })
  // }
  onShowPopoverTap = () => {
    this.setState({
      show: true,
    })
  }
  onClosePhoneModal = () => {
    this.setState({ showServicePhone: false });
  }
  render() {
    const { type, display, cancelOrderDisplay, receiveDoodsDisplay,showServicePhone ,serviceTel} = this.state;
    const { list, loading } = this.props;
    const systemInfo = Taro.getSystemInfoSync();
    let fixedHeight = 43;
    if (systemInfo.model.indexOf('iPhone X') > -1) {
      fixedHeight = fixedHeight + 30;
    }
    const scrollHeight = Taro.getSystemInfoSync().windowHeight - fixedHeight;
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='order-list'>
        <ScrollView scrollIntoView={type} className='order-list-nav' scrollWithAnimation scrollX>
          {
            nav.map(item => {
              return (
                <View onClick={this.switchTab.bind(this, item)} key={item.id} id={item.id} className='order-list-nav-container'>
                  <Text
                    // className='text'
                    className={`text ${type === item.id && 'text-active'}`}
                  >
                    {item.text}
                  </Text>
                  {type === item.id && <View className='border-bottom'></View>}
                </View>
              )
            })
          }
        </ScrollView>
        {!list.length ? (
            <NoData type='order' display={display} />
          ) :
          (
            <ScrollView
              scrollY
              scrollWithAnimation
              scrollTop='0'
              style={`height: ${scrollHeight}px;`}
              onScrollToLower={this.onScrollToLower}
            >
              {list.map((data,show) => (
                <ListItem
                  key={data.orderId}
                  data={data}
                  show={show}
                  onClickItem={this.onClickItem}
                  onClickCancelOrder={this.onClickCancelOrder}
                  onClickBillDetail={this.onClickBillDetail}
                  onClickFrezzAgain={this.onClickFrezzAgain}
                  onClickReceiveGoods={this.onClickReceiveGoods}
                  onClickSendBack={this.onClickSendBack}
                  onClickService={this.connectService}
                />
              ))}
            </ScrollView>
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
          <AtModalAction className='modailAction'>
            <Button onClick={this.handleCancalGoods}>取消</Button>
            <Button className='conform' onClick={this.handleOkGoods}>确定</Button>
          </AtModalAction>
        </AtModal>
        <modal
          show={showServicePhone}
          showClose={false}
          onModalClick={this.onClosePhoneModal}
          onModalClose={this.onClosePhoneModal}
        >
          <View slot='header'>联系客服</View>
          <View style={{ textAlign: 'left', marginBottom: '10px', paddingLeft: '15px' }}>商家客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectServices.bind(this,'business')}>{serviceTel}</Text></View>
          <View style={{ textAlign: 'left', marginBottom: '10px', paddingLeft: '15px' }}>平台客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectServices.bind(this, customerServiceTel)}>{customerServiceTel}</Text></View>
          <View style={{ textAlign: 'left', paddingLeft: '15px' }}>工作时间：<Text style={{ color: '#777' }} >10:30 - 19:30</Text></View>
          <View slot='footer'>取消拨打</View>
        </modal>
      </View>
    )
  }
}

export default Orderlist;
