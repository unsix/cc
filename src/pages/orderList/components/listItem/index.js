import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import { orderStatus } from '../../../../assets/Constant';
import './index.scss';

class ListItem extends Component {

  handleClickItem = (orderId) => {
    const { onClickItem } = this.props;
    onClickItem(orderId);
  }

  handleClickCancelOrder = (orderId) => {
    const { onClickCancelOrder } = this.props;
    onClickCancelOrder(orderId);
  }

  handleClickBillDetail = (order) => {
    const { onClickBillDetail } = this.props;
    onClickBillDetail(order);
  }

  handleClickFrezzAgain = (orderId) => {
    const { onClickFrezzAgain } = this.props;
    onClickFrezzAgain(orderId);
  }

  handleClickReceiveGoods = (orderId) => {
    const { onClickReceiveGoods } = this.props;
    onClickReceiveGoods(orderId);
  }

  handleClickSendBack = (order) => {
    const { onClickSendBack } = this.props;
    onClickSendBack(order);
  }

  render() {
    const { data } = this.props;
    return (
      <View className='list-item'>
        <View className='list-item-header'>
          <View>
            <Text className='text'>{data.createTime}</Text>
          </View>
          <View>
            <Text className='text'>{orderStatus[data.status]}</Text>
          </View>
        </View>
        <View className='list-item-content'>
          <View className='list-item-content-info' onClick={this.handleClickItem.bind(this, data.orderId)}>
            <Image className='img' mode='aspectFit' src={data.images[0].src} />
            <View className='list-item-content-info-box'>
              <View className='title-info'>
                <View>
                  <Text className='name'>{data.productName}</Text>
                </View>
                <View className='device-type'>
                  <Text className='name type'>规格：{data.skuTitle}</Text>
                </View>
                <View>
                  <Text className='name'>总租金：<Text>&yen; {data.totalRent}</Text> </Text>
                </View>
              </View>
              <AtIcon value='chevron-right' size='18' color='#d8d8d8' />
            </View>
          </View>
          {data.status === 'WAITING_PAYMENT' && (
            <View className='list-item-content-btn'>
              <Button className='btn' onClick={this.handleClickCancelOrder.bind(this, data.orderId)}>取消订单</Button>
              <Button className='btn careful' onClick={this.handleClickFrezzAgain.bind(this, data.orderId)}>去支付</Button>
            </View>
          )}
          {data.status === 'WAITING_BUSINESS_DELIVERY' && (
            <View className='list-item-content-btn'>
              <Button className='btn' onClick={this.handleClickBillDetail.bind(this, data)}>分期账单</Button>
            </View>
          )}
          {data.status === 'WAITING_USER_RECEIVE_CONFIRM' && (
            <View className='list-item-content-btn'>
              <Button className='btn' onClick={this.handleClickBillDetail.bind(this, data)}>分期账单</Button>
              <Button className='btn careful' onClick={this.handleClickReceiveGoods.bind(this, data.orderId)}>确认收货</Button>
            </View>
          )}
          {data.status === 'WAITING_GIVE_BACK' && (
            <View className='list-item-content-btn'>
              <Button className='btn' onClick={this.handleClickBillDetail.bind(this, data)}>分期账单</Button>
              <Button className='btn careful' onClick={this.handleClickSendBack.bind(this, data)}>归还</Button>
            </View>
          )}
          {data.status === 'SETTLEMENT_RETURN_CONFIRM_PAY' && (
            <View className='list-item-content-btn'>
              <Button className='btn' onClick={this.handleClickBillDetail.bind(this, data)}>分期账单</Button>
              <Button className='btn careful' onClick={this.handleClickFrezzAgain.bind(this, data.orderId)}>去支付</Button>
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default ListItem;
