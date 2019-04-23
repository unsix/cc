import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Search from './component/search/index';
import Channel from './component/channel/index';
import flowImg from '../../images/home/flow.png';
// import Rolling from '../../components/rolling/rolling';
import './index.scss';

@connect(({ home, loading }) => ({
  ...home,
  loading: loading.models.home,
}))
class Home extends Component {
  config = {
    navigationBarTitleText: '惠租',
  };

  componentDidMount = () => {
    this.canIUsesc();
    this.props.dispatch({
      type: 'home/getIndexList',
    })
  };
  // 收藏
  canIUsesc = () => {
    // console.log('shou')
    my.canIUse('lifestyle');
  }


  skip = (loinBanner) => {
    // 测试跳转到账单
    if (loinBanner && loinBanner.length) {
      Taro.navigateTo({
        url: loinBanner[0].jumpUrl,
      })
    }
  }

  onGotoProduct = (itemId) => {
    Taro.navigateTo({ url: `/pages/productDetail/index?itemId=${itemId}` });
  }

  onGoToMore = (url) => {
    if (url.indexOf('alipays://') === 0) {
      const index = url.indexOf('appId=');
      const appId = url.substr(index + 6);
      my.navigateToMiniProgram({
        appId,
      });
    } else {
      Taro.navigateTo({ url });
    }
  }

  handleGotoClassify = (url) => {
    Taro.navigateTo({ url });
  }

  render() {
    const { bannerList, iconList, tabList, oldNewDegreeList, loinBanner, loading } = this.props;
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='home-page'>
        {/* <favorite>收藏小程序，下次使用更方便</favorite> */}
        <lifestyle publicId="2019011262875377" />
        <View className='home-top'>
          <Search value='' />
          <View className='swiper'>
            <swiper
              circular
              indicator-dots
              indicator-active-color='#DBDBDB'
              autoplay='{{true}}'
              interval='{{3000}}'
            >
              {!!bannerList && !!bannerList.length && bannerList.map(banner => (
                <swiper-item key={banner.id}>
                  <View className='item' onClick={this.onGoToMore.bind(this, banner.jumpUrl)}>
                    <Image className='img' mode='aspectFit' src={banner.imgSrc} />
                  </View>
                </swiper-item>
              ))}
            </swiper>
          </View>
        </View>

        <View className='home-flow'>
          <View className='home-flow-box'>
            <Image className='home-flow-box-img' mode='aspectFit' src={flowImg} />
          </View>
        </View>

        <View className='home-menu'>
          {
            iconList && iconList.length && iconList.map((menu) => {
              return (
                <View key={menu.id} className='home-menu-view' onClick={this.handleGotoClassify.bind(this, menu.jumpUrl)}>
                  <View className='home-menu-view-box'>
                    <Image className='home-menu-view-box-img' mode='aspectFit' src={menu.imgSrc} />
                  </View>
                  <Text className='home-menu-view-text'>{menu.iconName}</Text>
                </View>
              )
            })
          }
        </View>

        <View className='home-freshman' onClick={this.skip.bind(this, loinBanner)}>
          <Image className='home-freshman-img' mode='aspectFit' src={loinBanner && loinBanner.length && loinBanner[0].imgSrc} />
          {/* <View className='home-freshman-box'></View>
          <View className='home-freshman-content'>
            <View style={{ marginBottom: '5px' }}>
              <Text style={{ paddingRight: '5px' }}>新人大礼包</Text>
              <Text class='home-freshman-content-bold'>超值划算</Text>
            </View>
            <View className='home-freshman-content-new'>全新类大额优惠券等你领取</View>
          </View>
          <View className='home-freshman-button'>立即领取</View> */}
        </View>

        <View className='home-channel'>
          {tabList && tabList.length && tabList.map(info => (
            <Channel
              products={info.products}
              tab={info.tab}
              oldNewDegreeList={oldNewDegreeList}
              onGotoProduct={this.onGotoProduct}
              onGoToMore={this.onGoToMore}
            />
          ))}
        </View>

        <View className='home-bottom'>
          <Text className='text'> - 再拖就没有了 - </Text>
        </View>
      </View>
    )
  }
}

export default Home;
