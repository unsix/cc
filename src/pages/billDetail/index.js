import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon } from 'taro-ui';

import BillTitle from './component/billTitle/index';
import Payment from './component/payment/index';
import BillList from './component/billList/index';
import './index.scss';

@connect(({ billDetail, loading }) => ({
  ...billDetail,
  loading: loading.models.billDetail,
}))
class BillDetail extends Component {
  config = {
    navigationBarTitleText: '账单详情',
  };

  state = {
    payTotal: 0,
    selectedTransNos: [],
  }

  componentDidMount = () => {
    const { orderId } = this.$router.params;
    const { dispatch } = this.props;
    dispatch({
      type: 'billDetail/selectOrderByStagesList',
      payload: { orderId },
    });
  };

  selectPayment = (info) => {
    const { payTotal, selectedTransNos } = this.state;
    const index = selectedTransNos.indexOf(info.outTransNo);
    const newSelectedTransNos = [...selectedTransNos];
    if (index > -1) {
      newSelectedTransNos.splice(index, 1);
    } else {
      newSelectedTransNos.push(info.outTransNo);
    }
    this.setState({
      payTotal: (payTotal + info.rent),
      selectedTransNos: newSelectedTransNos,
    });
  }

  submit = () => {
    const { payTotal, selectedTransNos } = this.state;
    const { unpaidList } = this.props;
    let isSubmit = false;
    if (selectedTransNos.length) {
      isSubmit = selectedTransNos.every((_, index) => selectedTransNos.indexOf(unpaidList[index].outTransNo) > -1);
    }
    if (!isSubmit) {
      Taro.showToast({
        title: '请按照分期账单的顺序进行支付',
        icon: 'none',
        duration: 1000,
      });
      return;
    }
    const { orderId } = this.$router.params;
    const outTradeNo = selectedTransNos.join('_');
    const { dispatch } = this.props;
    dispatch({
      type: 'billDetail/orderbyStagesPay',
      payload: { payTotal, outTradeNo, orderId },
    });
  }

  render() {
    const { loading, totalRent, repaidRent, repaidList, unpaidList, product } = this.props;
    // console.log(product,'sos',unpaidList)
    const { payTotal, selectedTransNos } = this.state;
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    const payTotalStr = payTotal.toFixed(2);
    let noteStr = null;
    if (unpaidList.length) {
      if (unpaidList[0].status === 4) {
        noteStr = '您已逾期，请尽快还款，以免影响信用';
      } else { 
        const leftTime = new Date(unpaidList[0].statementDateStr) - (new Date());
        // my.alert({
        //   buttonText:leftTime
        // })
        const days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);
        noteStr = `您的还款日还有${days + 1}天，请注意还款时间，以免逾期`
      }
    }
    return (
      <View className='bill-detail'>
        {!!noteStr && (
          <View className='bill-detail-broadcast'>
            <AtIcon value='volume-plus' size='18' color='#FFFFFF' />
            <Text className='text'>{noteStr}</Text>
            <AtIcon value='close' size='18' color='#FFFFFF' />
          </View>
        )}

        <View className='bill-detail-goods'>
          <View className='bill-detail-goods-info'>
            <Image className='img' mode='aspectFit' src={product.images[0].src} />
            <View className='bill-detail-goods-info-box'>
              <View className='title-info'>
                <View>
                  <Text className='name'>{product.productName}</Text>
                </View>
                <View className='device-type'>
                  <Text className='name type'>规格：{product.skuTitle}</Text>
                </View>
                <View>
                  <Text className='name'>总租金：<Text>&yen; {totalRent.toFixed(2)}</Text> </Text>
                </View>
              </View>
            </View>
          </View>
          <View className='bill-detail-goods-border'></View>
          <View className='bill-detail-goods-account'>

            <View className='account-info'>
              <View className='info-num'>
                <Text className='text'>{totalRent.toFixed(2)}</Text>
              </View>
              <View className='info-num desc'>
                <Text className='text desc'>应还租金(元)</Text>
              </View>
            </View>
            <View className='account-info'>
              <View className='info-num'>
                <Text className='text'>{repaidRent.toFixed(2)}</Text>
              </View>
              <View className='info-num desc'>
                <Text className='text desc'>已还租金(元)</Text>
              </View>
            </View>
            <View className='account-info'>
              <View className='info-num'>
                <Text className='text'>{(totalRent - repaidRent).toFixed(2)}</Text>
              </View>
              <View className='info-num desc'>
                <Text className='text desc'>未还租金(元)</Text>
              </View>
            </View>
          </View>
          {/* <View className='bill-detail-goods-tips'>
            <AtIcon value='alert-circle' size='15' color='#999999' />
            <View className='tips'>
              <Text className='text'>账单到期将通过支付宝免密支付方式还款，请注意查收信息</Text>
            </View>
          </View> */}
        </View>
        {!!unpaidList && !!unpaidList.length && (
          <BillTitle title='可提前归还本金' />
        )}
        {!!unpaidList && !!unpaidList.length && unpaidList.map(data =>
          <Payment data={data} onClick={this.selectPayment} />
        )}
        {!!repaidList && !!repaidList.length && (
          <BillTitle last='last' title='已还本金' />
        )}
        {!!repaidList && !!repaidList.length && repaidList.map(data =>
          <BillList data={data} />
        )}

        {!!selectedTransNos && !!selectedTransNos.length && (
          <View className='bill-detail-bottom'>
            <View className='bill-detail-bottom-bill'>
              <Text className='sum'>总计</Text>
              <Text className='num'>
                <Text className='symbol'>&yen;</Text>
                <Text className='symbol money'>{payTotalStr.split('.')[0]}</Text>
                <Text className='symbol'>.{payTotalStr.split('.')[1]}</Text>
              </Text>
            </View>
            <Button className={`btn ${!selectedTransNos.length && 'disabled'}`} disabled={!selectedTransNos.length} onClick={this.submit}>去支付</Button>
          </View>
        )}
      </View>
    );
  }
}

export default BillDetail;