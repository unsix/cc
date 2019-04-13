import Taro, { Component } from '@tarojs/taro';
import { Picker, View, Image, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon, AtInput } from "taro-ui"

import ListType from './component/listType/index';
import './index.scss';

@connect(({ sendBack, loading }) => ({
  ...sendBack,
  loading: loading.models.sendBack,
}))
class SendBack extends Component {
  config = {
    navigationBarTitleText: '归还',
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    const { orderId } = this.$router.params;
    dispatch({
      type: 'sendBack/fetchExpressList',
    });
    dispatch({
      type: 'sendBack/getOrderGiveBackAddress',
      payload: { orderId },
    });
  };

  handleChangeExpressIdAndName = e => {
    const { expressList, dispatch } = this.props;
    const express = expressList[e.detail.value];
    dispatch({
      type: 'sendBack/setExpressIdAndName',
      payload: { expressId: express.id, expressName: express.name },
    });
  }
  handleChangeExpressNo(value) {
    const { dispatch } = this.props;
    dispatch({
      type: 'sendBack/setExpressNo',
      payload: value,
    });
  }

  gotoAddressList = () => {
    Taro.redirectTo({ url: '/pages/selAddress/index' });
  }

  submit = () => {
    const { orderId } = this.$router.params;
    const { expressNo, expressId, currentGiveBackIndex, giveBackAddressList, dispatch } = this.props;
    const addressId = giveBackAddressList[currentGiveBackIndex].id;
    dispatch({
      type: 'sendBack/userOrderBackSubmitConfirm',
      payload: { addressId, expressId, expressNo, orderId },
      callback: () => {
        Taro.navigateBack();
      },
    });
  }

  render() {
    const { product, loading, currentGiveBackIndex, giveBackAddressList, expressList, expressNo, expressName } = this.props;
    const expressNames = expressList.map(exp => exp.name);

    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='send-back'>
        <View className='send-back-phone'>
          <Image mode='aspectFit' src={product.images[0].src} className='img' />
          <View className='send-back-phone-title'>
            <View>
              <Text className='title'>{product.productName} </Text>
            </View>
            <View className='title-margin'>
              <Text className='title text'>规格：{product.skuTitle}</Text>
            </View>
          </View>

        </View>

        <View className='send-back-type'>
          <ListType title='归还方式' sub-text='快递归还' display='none' icon-show={false} />
        </View>

        <View className='send-back-info' onClick={this.gotoAddressList}>
          {(!!currentGiveBackIndex || currentGiveBackIndex === 0) ? (
            <ListType title='归还地址' display='block' sub-text={`${giveBackAddressList[0].name}; ${giveBackAddressList[0].telephone}`} icon-show />
          ) :
            (
              <ListType title='归还地址' display='block' desc='请选择归还地址' icon-show />
            )}
        </View>

        <View className='send-back-sel'>
          <Picker mode='selector' range={expressNames} onChange={this.handleChangeExpressIdAndName}>
            <View className='send-back-sel-picker'>
              <Text className='title'>物流公司</Text>
              <View className='sel-text'>
                <Text className='text'>{expressName}</Text>
                <AtIcon value='chevron-right' size='20' color='#ccc' />
              </View>
            </View>
          </Picker>
        </View>

        <View className='send-back-input'>
          <AtInput
            name='value'
            title='物流单号'
            type='text'
            value={expressNo}
            placeholder='请输入'
            onChange={this.handleChangeExpressNo.bind(this)}
          />
        </View>

        <View className='send-back-footer'>
          <Text>
            以商家提供的实际租用清单为准，归还物品不完整会影响归还进度。商家收到货物后会提供结算单，请及时确认结算单。
          </Text>
        </View>
        <View className='send-back-bottom'>
          <Button
            className='send-back-bottom-btn'
            disabled={(!currentGiveBackIndex && currentGiveBackIndex !== 0) || !expressNo}
            onClick={this.submit}
          >
            提交
          </Button>
        </View>
      </View>
    )
  }
}

export default SendBack;
