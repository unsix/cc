import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { AtIcon, AtBadge ,AtToast} from 'taro-ui'
import Card from './components/card/index';
import menuList from './menu.js';
import './index.scss';
import { customerServiceTel } from '../../assets/Constant';
import {  getUid ,getAvatar} from '../../utils/localStorage';
import TagPage from '../home/component/curtain/index'
import { timer } from 'redux-logger/src/helpers'
@connect(({unclaimed, mine, loading }) => ({
  ...mine,
  ...unclaimed,
  loading: loading.models.mine,
}))
class Mine extends Component {
  config = {
    navigationBarTitleText: '我的',
    usingComponents: {
      "modal": "../../npm/mini-antui/es/modal/index"
    }
  };
  state = {
    showServicePhone: false,
    isTagOpened:false,
    AtToastIsOpened:false
  }
  //联系客服弹窗
  onClosePhoneModal = () => {
    this.setState({ showServicePhone: false });
  }

  onShowPhoneModal = () => {
    this.setState({ showServicePhone: true });
  }
  componentDidShow = () => {
    const { dispatch } = this.props;
    dispatch({
      type:'unclaimed/getSettingDynamic'
    })
    if(getUid() && getAvatar()){
      dispatch({
        type: 'mine/fetchAuthCode',
        callback: () => {
          dispatch({
            type: 'mine/userOrderStatusCount'
          });
        },
      });
    }
    else {
      this.setState({
        isTagOpened:true
      })
    }
  };

  onGetAuthorize = () => {
    const   {  dispatch } = this.props
    dispatch({
      type: 'mine/fetchAuthCode',
      callback: () => {
        dispatch({
          type: 'mine/userOrderStatusCount'
        });
        this.setState({
          isTagOpened:false
        })
      },
    });
  }
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

  //客服
  connectService = (number) => {
    let num = String(number);
    my.makePhoneCall({ number:num });
  }

  authOnClose = (val) => {
    this.setState({
      isTagOpened: val,
      AtToastIsOpened: true
    },()=>{
      setTimeout(function(){
        Taro.switchTab({
          url: `/pages/home/index`
        })
      }, 1000) //停1秒
    })
  }

  onGetAuthorize = () => {
    const   {  dispatch } = this.props
    dispatch({
      type: 'mine/fetchAuthCode',
      callback: () => {
        this.setState({
          isTagOpened:false
        })
        dispatch({
          type: 'mine/userOrderStatusCount'
        });
      },
    });
  }

  componentDidHide () {
    this.setState({
      AtToastIsOpened: false
    })
  }

  render() {
    const { nickName, avatar, isCertified, loading, productList, statusNumInfo ,idCardPhotoStatus,banner} = this.props;
    const { showServicePhone , isTagOpened ,AtToastIsOpened} = this.state;
    console.log(this.props)
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
    console.log(idCardPhotoStatus)
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='mine-page'>
        <View className='mine-page-info'>
          <View className='box'>
            {/*{avatar?*/}
              <Image src={avatar} className='mine-page-info-img' mode='aspectFit' />
            {/*  :*/}
            {/*  (*/}
            {/*    <View>*/}
            {/*      <Button*/}
            {/*        open-type="getAuthorize"*/}
            {/*        scope='userInfo'*/}
            {/*        onClick={this.onGetAuthorize}*/}
            {/*      >*/}
            {/*      </Button>*/}
            {/*      登录*/}
            {/*    </View>*/}
            {/*  )*/}
            {/*}*/}
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
          {
            banner.updateTime && (
              <View onClick={this.skipOtherPage.bind(this, 'realName')} className='mine-page-order-other'>
                <Text className='text'>实名认证</Text>
                {isCertified === 'F' ? (
                    <AtIcon value='chevron-right' size='18' color='#cccccc' />
                  ) :
                  (
                    <Text className='text' style={{ color: '#999999' }}>已实名</Text>
                  )}
              </View>
            )
          }
          <View  onClick={this.onShowPhoneModal} className='mine-page-order-other' >
            <Text className='text'>联系客服</Text>
            <AtIcon value='chevron-right' size='18' color='#cccccc' />
          </View>
          {banner.updateTime && (
            <View onClick={this.skipOtherPage.bind(this, 'Certificates')} className='mine-page-order-other'>
              <Text className='text'>身份信息</Text>
              {idCardPhotoStatus === 0? (
                  <AtIcon value='chevron-right' size='18' color='#cccccc' />
                ) :
                (
                  <Text className='text' style={{ color: '#999999' }}>已上传</Text>
                )}
            </View>
          )}
          <View onClick={this.skipOtherPage.bind(this, 'recharge')} className='mine-page-order-other'>
            <Text className='text'>押金充值</Text>
            <AtIcon value='chevron-right' size='18' color='#cccccc' />
          </View>
          <View onClick={this.skipOtherPage.bind(this, 'address')} className='mine-page-order-other'>
            <Text className='text'>收货地址</Text>
            <AtIcon value='chevron-right' size='18' color='#cccccc' />
          </View>
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
        {/*<View className='member_card' onClick={this.member}>*/}
        {/*  <Image  className='img' src={MemberCard} />*/}
        {/*</View>*/}
        <modal
          show={showServicePhone}
          showClose={false}
          onModalClick={this.onClosePhoneModal}
          onModalClose={this.onClosePhoneModal}
        >
          <View slot='header'>联系客服</View>
          <View style={{ textAlign: 'left', paddingLeft: '15px',marginBottom: '10px',marginTop: '10px' }}>平台客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectService.bind(this,customerServiceTel )}>{customerServiceTel}</Text></View>
          <View style={{ textAlign: 'left', paddingLeft: '15px' }}>工作时间：<Text style={{ color: '#777' }} >10:30 - 19:30</Text></View>
          <View slot='footer'>取消拨打</View>
        </modal>
        <TagPage
          onClick={this.onGetAuthorize}
          onClose={this.authOnClose}
          isOpened={isTagOpened}
          open-type="getAuthorize"
          scope='userInfo'
          data='http://oss.huizustore.com/9d9dbab9d4a7456c9bd38ef45c4a8df9.png'
        />
        <AtToast isOpened={AtToastIsOpened} hasMask='false' text='授权失败'  status='error' />
      </View>
    )
  }
}

export default Mine;
