import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon, AtBadge } from 'taro-ui'
import Card from './components/card/index';
import menuList from './menu.js';
import './index.scss';
import MemberCard from '../../images/mine/member_card.png'
@connect(({ mine, loading }) => ({
  ...mine,
  loading: loading.models.mine,
}))
class Mine extends Component {
  config = {
    navigationBarTitleText: '我的',
  };

  componentDidShow = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'mine/recommendPoductList'
    });
    dispatch({
      type: 'mine/fetchAuthCode',
      callback: () => {
        dispatch({
          type: 'mine/userOrderStatusCount'
        });
      },
    });
  };

  handleOrderStatus = (id) => {
    Taro.navigateTo({
      url: `/pages/orderList/index?type=${id}`
    })
  }

  skipToOrder = () => {
    Taro.navigateTo({
      url: '/pages/orderList/index?type=all'
    })
  }

  skipOtherPage = (id) => {
    const { isCertified } = this.props;
    if ((id === 'realName' && isCertified === 'F') || id !== 'realName') {
      Taro.navigateTo({
        url: `/pages/${id}/index`
      })
    }
  }

  gotoProductDetail = (itemId) => {
    Taro.navigateTo({ url: `/pages/productDetail/index?itemId=${itemId}` });
  }

  //会员
  member = () => {
    Taro.navigateTo({
      url: '/pages/member/index'
    })
  }
  render() {
    const { nickName, avatar, isCertified, loading, productList, statusNumInfo } = this.props;
    const menuNumList = menuList.map(menu => {
      const newMenu = { ...menu };
      if (menu.cname === 'settle') {
        newMenu.num = statusNumInfo['WAITING_CONFIRM_SETTLEMENT'] +
          statusNumInfo['WAITING_SETTLEMENT'] +
          statusNumInfo['WAITING_SETTLEMENT_PAYMENT'] +
          statusNumInfo['SETTLEMENT_RETURN_CONFIRM_PAY'];
      } else if (menu.cname === 'SETTLEMENT_RETURN_CONFIRM_PAY') {
        newMenu.num = statusNumInfo['SETTLEMENT_RETURN_CONFIRM_PAY'] + statusNumInfo['ORDER_VERDUE'];
      } else {
        newMenu.num = statusNumInfo[menu.cname];
      }
      return newMenu;
    });
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='mine-page'>
        <View className='mine-page-info'>
          <View className='box'>
            <Image src={avatar} className='mine-page-info-img' mode='aspectFit' />
            <Text className='text'>{nickName}</Text>
          </View>
        </View>
        <View className='mine-page-order'>
          <View className='mine-page-order-info'>
            <View className='title' onClick={this.skipToOrder}>
              <Text className='text'>我的订单</Text>
              <View className='right'>
                <Text className='right-text'>查看全部订单</Text>
                <AtIcon value='chevron-right' size='18' color='#d8d8d8' />
              </View>
            </View>
            <View className='menu'>
              {
                menuNumList.map((menu) => {
                  return (
                    <View onClick={this.handleOrderStatus.bind(this, menu.id)} key={menu.id} className={'menu-view ' + menu.cname}>
                      {!!menu.num ? (
                        <AtBadge value={menu.num} maxValue={99}>
                          <Image className='menu-view-img' mode='aspectFit' src={menu.iconUrl} />
                        </AtBadge>
                      ) :
                        (
                          <Image className='menu-view-img' mode='aspectFit' src={menu.iconUrl} />
                        )}
                      <Text className='menu-view-text'>{menu.text}</Text>
                    </View>
                  )
                })
              }
            </View>
          </View>
          <View onClick={this.skipOtherPage.bind(this, 'coupon')} className='mine-page-order-other'>
            <Text className='text'>红包卡券</Text>
            <AtIcon value='chevron-right' size='18' color='#cccccc' />
          </View>
          <View onClick={this.skipOtherPage.bind(this, 'realName')} className='mine-page-order-other'>
            <Text className='text'>实名认证</Text>
            {isCertified === 'F' ? (
              <AtIcon value='chevron-right' size='18' color='#cccccc' />
            ) :
              (
                <Text className='text' style={{ color: '#999999' }}>已实名</Text>
              )}
          </View>
          <View onClick={this.skipOtherPage.bind(this, 'address')} className='mine-page-order-other'>
            <Text className='text'>收货地址</Text>
            <AtIcon value='chevron-right' size='18' color='#cccccc' />
          </View>
          {/*<View onClick={this.member} className='mine-page-order-other'>*/}
          {/*  <Text className='text'>开通会员</Text>*/}
          {/*  <AtIcon value='chevron-right' size='18' color='#cccccc' />*/}
          {/*</View>*/}
        </View>
        <View className='mine-page-recommend'>
          <View className='header'>
            <Text className='text'>为你推荐</Text>
          </View>
          <View className='subhead'>
            <Text className='text'>精选好物 为你推荐</Text>
          </View>
          <View className='container'>
            {!!productList && !!productList.length && productList.map(data =>
              <View key={data.id} onClick={this.gotoProductDetail.bind(this, data.product_id)}>
                <Card data={data} />
              </View>
            )}
          </View>
        </View>
        <View className='mine-page-bottom'>
          <Text className='text'> - 不要扯了，已经到底了 -  </Text>
        </View>
        <View className='member_card' onClick={this.member}>
          <Image  className='img' src={MemberCard} />
        </View>
      </View>
    )
  }
}

export default Mine;
