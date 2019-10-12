import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';
import { orderStatus ,customerServiceTel} from '../../../../assets/Constant';
import './index.scss';
import { formatDate, leftTimer, transdate,formatSeconds } from '../../../../utils/utils'
class ListItem extends Component {
  config = {
    usingComponents: {
      "popover": "/npm/mini-antui/es/popover/index",
      "popover-item": "/npm/mini-antui/es/popover/popover-item/index",
      // "modal": "../../npm/mini-antui/es/modal/index"
    }
  };
  state = {
    position: 'bottomLeft',
    show: false,
    showMask: true,
    showServicePhone:false
  }
  handleClickItem = (order) => {
    let obj = {
      orderId:order.orderId,
      type:order.type
    }
    // console.log(obj)
    const { onClickItem } = this.props;
    onClickItem(obj);
  }

  handleClickCancelOrder = (order) => {
    let obj = {
      orderId:order.orderId,
      examineStatus:order.examineStatus,
      statusCancel:order.status
    }
    console.log(obj)
    const { onClickCancelOrder } = this.props;
    onClickCancelOrder(obj);
  }

  handleClickBillDetail = (order) => {
    const { onClickBillDetail } = this.props;
    onClickBillDetail(order);
  }

  handleClickFrezzAgain = (order) => {
    const { onClickFrezzAgain } = this.props;
    onClickFrezzAgain(order);
  }

  handleClickReceiveGoods = (orderId) => {
    const { onClickReceiveGoods } = this.props;
    onClickReceiveGoods(orderId);
  }

  handleClickSendBack = () => {
    const { onClickSendBack,data } = this.props;
    onClickSendBack(data);
    // const { dispatch , data} = this.props;
    // const product = {
    //   ...data,
    // };
    // const userOrders = {
    //   orderId: data.orderId,
    // };
    // dispatch({
    //   type: 'sendBack/saveProductAndOrder',
    //   payload: { product, userOrders },
    // });
    // Taro.navigateTo({ url: `/pages/sendBack/index?orderId=${data.orderId}` });
  }

  handleClickExpress = (order) =>{
   Taro.navigateTo({
     url:`/pages/express/index?orderId=${order}`
   })
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
  connectService = (val) => {
    let obj = {
      business:val
    }
    // let business = val
    const { onClickService } = this.props;
    onClickService(obj)
    // this.setState({
    //   showServicePhone: true
    // })
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
  connectCService = (number) => {
    let { serviceTel } = this.props.data
    // console.log(serviceTel)
    let num = String(serviceTel);
    my.makePhoneCall({ number:num });
    // const { connectService } = this.props;
    // connectService(number);

  }
  connectPService = () =>{
    my.makePhoneCall({ number:customerServiceTel });
  }
  //买断
  handleClickBuyout = () => {
    const { data } = this.props
    if(data.type === 2){
      Taro.navigateTo({
        url:`/pages/buyout/confirm?orderId=${data.originalOrderId}&itemId=${data.images[0].productId}`
      })
    }
    else {
      Taro.navigateTo({
        url:`/pages/buyout/confirm?orderId=${data.orderId}&itemId=${data.images[0].productId}`
      })
    }
  }
  //续租
  handleClickRenewal = () => {
    const { data } = this.props
    const letTimP =  data.createTime && formatDate(new Date(data.unrentTimeStr), 'yyyy-MM-dd hh:mm');
    const newTime  =  formatDate(new Date() , 'yyyy-MM-dd hh:mm');
    let dueTimeP =  transdate(letTimP) - 30*24*60*60*1000 - transdate(newTime)
      Taro.navigateTo({
        url:`/pages/renewal/confirm?orderId=${data.orderId}&dueTimeP=${dueTimeP}`
      })
  }
  handleClickRenewalBefore = () =>{
    // const { orderId } = this.$router.params;
    const { data } = this.props
    Taro.navigateTo({
      url:`/pages/orderDetail/index?orderId=${data.originalOrderId}`
    })
  }
  render() {
    const { data  } = this.props;
    const { showServicePhone , position, show, showMask,} = this.state
    // console.log(data.serviceTel)
    const letTime =  data.createTime && formatDate(new Date(data.createTimeStr), 'yyyy-MM-dd hh:mm');
    const newTime  =  formatDate(new Date() , 'yyyy-MM-dd hh:mm');
    let dueTime = transdate(letTime) + data.sysConfigValue*60*60*1000 - transdate(newTime)
    // console.log(dueTimeP,letTimP)
    // console.log(rentStartStrs , newTime)
    // console.log(transdate(rentStartStrs)+ 24*60*60*10-transdate(newTime))
    // console.log(this.props)
    // console.log(formatDate(new Date(dueTime), 'yyyy-MM-dd hh:mm'))
    // console.log(formatSeconds(dueTime/1000))
    // console.log('1')
    let dueTimeMs = dueTime/1000
    // console.log(dueTimeMs)
    return (
      <View className='list-item'>
        <View className='list-item-header'>
          <View className='top'>
            <Image className='img' src={require('../../../../images/order/time.png')} />
            <Text className='text'>{data.createTime}</Text>
          </View>
          <View className='top'>
            <Text className='text text-status'>{orderStatus[data.status]}
              {data.type === 2 &&
              (<Text className='text text-status'>续租</Text>)
              }
              {data.type === 3 &&
              (<Text className='text text-status'>买断</Text>)
              }
              {data.status === 'WAITING_GIVE_BACK' &&
                (<Text>（租用中）</Text>)
              }
            </Text>
          </View>
        </View>
        <View className='list-item-content'>
          <View className='list-item-content-info' onClick={this.handleClickItem.bind(this, data)}>
            <Image className='img' mode='aspectFit' src={data.images[0].src} />
            <View className='list-item-content-info-box'>
              <View className='title-info'>
                <View className='title name'>
                 {data.productName}
                </View>
                <View className='device-type '>
                 规格：{data.skuTitle}
                </View>
                {data.type === 3?
                  (
                    <View className='price name'>
                     买断尾款 ：¥{data.totalRent}
                    </View>
                  ):
                  (
                    <View className='price name'>
                      总租金：¥{data.totalRent}
                    </View>
                  )
                }
              </View>
              {/*<AtIcon value='chevron-right' size='18' color='#d8d8d8' />*/}
            </View>
          </View>
          {data.status === 'WAITING_PAYMENT' && (
            <View className='list-item-content-btn'>
              {/*{data.examineStatus === 0 ?*/}
              {/*  (*/}
              {/*    <Button className='btn' onClick={this.handleClickCancelOrder.bind(this, data)}>取消订单</Button>*/}
              {/*    )*/}
              {/*  :*/}
              {/*  (*/}
              {/*    <Button className='btn'  onClick={this.handleClickCancelOrder.bind(this, data)}>处理中。。。</Button>*/}
              {/*  )*/}
              {/*}*/}
              {data.type === 2 && (
                <Button className='btn' onClick={this.handleClickRenewalBefore}>查看原订单</Button>
                // <popover-item  onItemClick={this.handleClickRenewalBefore}>
                //   <text>查看原订单</text>
                // </popover-item>
              )}
              {data.type === 3 && (
                <Button className='btn' onClick={this.handleClickRenewalBefore}>查看原订单</Button>
                // <popover-item  onItemClick={this.handleClickRenewalBefore}>
                //   <text>查看原订单</text>
                // </popover-item>
              )}
              <Button className='btn' onClick={this.handleClickCancelOrder.bind(this, data)}>取消订单</Button>
              <Button className='btn careful' onClick={this.handleClickFrezzAgain.bind(this, data)}>去支付</Button>
            </View>
          )}
          {data.status === 'WAITING_BUSINESS_DELIVERY' && (
            <View>
                <View className='list-item-content-btn'>
                  {dueTimeMs>0?(
                  <View>
                    {data.examineStatus === 0 ?
                      (
                        <Button className='btn' onClick={this.handleClickCancelOrder.bind(this, data)}>取消订单</Button>
                      )
                      :
                      (
                        <Button className='btn'  onClick={this.handleClickCancelOrder.bind(this, data)}>处理中···</Button>
                      )
                    }
                  </View>
                  ) :null
                  }
                  <Button className='btn careful' onClick={this.handleClickBillDetail.bind(this, data)}>分期账单</Button>
                </View>
            </View>
          )}
          {data.status === 'WAITING_USER_RECEIVE_CONFIRM' && (
            <View className='list-item-content-btn'>
              <Button className='btn'  onClick={this.handleClickExpress.bind(this, data.orderId)} >查询物流</Button>
              <Button className='btn' onClick={this.handleClickBillDetail.bind(this, data)}>分期账单</Button>
              <Button className='btn careful' onClick={this.handleClickReceiveGoods.bind(this, data.orderId)}>确认收货</Button>
            </View>
          )}
          {data.status === 'WAITING_GIVE_BACK' && (
            <View className='list-item-content-btn'>
                <popover
                  className='popover'
                  position={position}
                  show={show}
                  showMask={showMask}
                  onMaskClick={this.onMaskClick}
                >
                  <View  onClick={this.onShowPopoverTap}>
                    <Image className='img' src={require('../../../../images/order/popover.png')} />
                  </View>
                  <View slot='items' >
                      <popover-item  onItemClick={this.handleClickRenewal}>
                        <text>续租</text>
                      </popover-item>
                      <popover-item  onItemClick={this.handleClickBuyout}>
                        <text>买断</text>
                      </popover-item>
                    {data.type === 2 && (
                      <popover-item  onItemClick={this.handleClickRenewalBefore}>
                        <text>查看原订单</text>
                      </popover-item>
                    )}
                  </View>
                </popover>
              {/*):null}*/}
              {/*<Button className='btn ' onClick={this.handleClickSendBack}>买断</Button>*/}
              {/*<Button className='btn ' onClick={this.handleClickFrezzAgain.bind(this, data.orderId)}>买断</Button>*/}
              {/*<Button className='btn ' onClick={this.handleClickRenewal.bind(this, 'renewal')}>续租</Button>*/}
              <Button className='btn ' onClick={this.connectService.bind(this,data.serviceTel)}>联系客服</Button>
              <Button className='btn ' onClick={this.handleClickSendBack}>提前归还</Button>
              <Button className='btn careful' onClick={this.handleClickBillDetail.bind(this, data)}>分期账单</Button>
            </View>
          )}
          {data.status === 'SETTLEMENT_RETURN_CONFIRM_PAY' && (
            <View className='list-item-content-btn'>
              <Button className='btn' onClick={this.handleClickBillDetail.bind(this, data)}>分期账单</Button>
              <Button className='btn careful' onClick={this.handleClickFrezzAgain.bind(this, data.orderId)}>去支付</Button>
            </View>
          )}
          {data.status === 'WAITING_SETTLEMENT'  && (
            <View className='list-item-content-btn'>
              {data.type === 2 && (
                <popover
                  className='popover'
                  position={position}
                  show={show}
                  showMask={showMask}
                  onMaskClick={this.onMaskClick}
                >
                  <View  onClick={this.onShowPopoverTap} style={{ marginRight:45 }} >
                    <Image className='img' src={require('../../../../images/order/popover.png')} />
                  </View>
                  <View slot='items' >
                    <popover-item  onItemClick={this.handleClickRenewalBefore}>
                      <text>查看原订单</text>
                    </popover-item>
                  </View>
                </popover>
              )}
              <Button className='btn ' onClick={this.connectService.bind(this,data.serviceTel)}>联系客服</Button>
              <Button className='btn' onClick={this.handleClickBuyout}>买断</Button>
              <Button className='btn careful' onClick={this.handleClickRenewal}>续租</Button>
              {/*<popover-item  onItemClick={this.handleClickRenewal}>*/}
              {/*  <text>续租</text>*/}
              {/*</popover-item>*/}
            </View>
          )}
          {data.status === 'USER_CANCELED_CLOSED' && data.type === 2 &&(
            <View className='list-item-content-btn'>
              <Button className='btn' onClick={this.handleClickRenewalBefore}>查看原订单</Button>
              <Button className='btn careful ' onClick={this.connectService.bind(this,data.serviceTel)}>联系客服</Button>
            </View>
          )}
          {data.status === 'USER_CANCELED_CLOSED' && data.type === 3 &&(
            <View className='list-item-content-btn'>
              <Button className='btn' onClick={this.handleClickRenewalBefore}>查看原订单</Button>
              <Button className='btn careful ' onClick={this.connectService.bind(this,data.serviceTel)}>联系客服</Button>
            </View>
          )}
          {data.status === 'ORDER_FINISH' && data.type !==0  &&(
            <View className='list-item-content-btn'>
              <Button className='btn' onClick={this.handleClickRenewalBefore}>查看原订单</Button>
              <Button className='btn careful ' onClick={this.connectService.bind(this,data.serviceTel)}>联系客服</Button>
            </View>
          )}
          {data.status === 'USER_OVERTIME_PAYMENT_CLOSED' && data.type !==0  &&(
            <View className='list-item-content-btn'>
              <Button className='btn' onClick={this.handleClickRenewalBefore}>查看原订单</Button>
              <Button className='btn careful ' onClick={this.connectService.bind(this,data.serviceTel)}>联系客服</Button>
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default ListItem;
