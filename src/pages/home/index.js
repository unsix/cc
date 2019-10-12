import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Form, ScrollView, Button } from '@tarojs/components'
import { AtModal, AtModalContent, AtTabs, AtTabsPane ,AtModalHeader} from 'taro-ui'
import { connect } from '@tarojs/redux';
import Search from './component/search/index';
import Channel from './component/channel/index';
import TagPage from './component/curtain/index'
import flowImg from '../../images/home/flow.png';
import './index.scss';

let timer
@connect(({ home, loading }) => ({
  ...home,
  loading: loading.models.home,
}))
class Home extends Component {
  config = {
    navigationBarTitleText: '惠租',
    "usingComponents": {
      "filter": "../../npm/mini-antui/es/filter/index",
      "filter-item": "../../npm/mini-antui/es/filter/filter-item/index"
    }
  };
  state = {
    shopType:null,
    show: true,
    isOpened:false,
    fixTop:'',//区域离顶部的高度
    scrollTop:1,//滑动条离顶部的距离
    tabArrayList:[],
    isTagOpened:false
  }

  componentDidMount = () => {
    const { dispatch } = this.props
    // const { shopType } = this.state
    this.canIUsesc();
    dispatch({
      type: 'home/getIndexActionListByPage',
      payload:{
        pageNum: 1,
        pageSize: 6,
      },
      callback:(type)=>{
        this.setState({
          shopType:type
        })
      }
    })
    // dispatch({
    //    type: 'home/getIndexList',
    //    callback:(val)=>{
    //      dispatch({
    //        type:'home/getIndexTabAndProduct',
    //        payload: {
    //          tabId:val,
    //          channel:1
    //        },
    //        callback:(type)=>{
    //          this.setState({
    //            shopType:type
    //          })
    //        }
    //      })
    //    }
    //  })
  };

  componentDidHide () {
    // this.setState({
    //   isTagOpened:false
    // })
  }
  setDispatch(queryInfo, fetchType) {
    const { dispatch } = this.props;
    const { shopType } = this.state
    const info = { ...queryInfo};
    if (fetchType === 'scroll') {
      info.pageNum += 1;
      info.fetchType = fetchType;
    }
    dispatch({
      type: 'home/getIndexTabAndProduct',
      payload: { ...info ,tabId:shopType},
    });
  }
  onScrollToLower = () => {
    // const { queryInfo } = this.props;
    const { total, queryInfo, queryInfo: { pageNum, pageSize } } = this.props;
    if (pageNum * pageSize - total >= 0) {
      Taro.showToast({
        title: '更多商品，敬请期待！',
        icon: 'none',
        duration: 1000,
      });
      return;
    }
    this.setDispatch(queryInfo, 'scroll');
  };
  //悬浮红包
  gotoRed = () => {
    my.navigateToMiniProgram({
      appId: '2018122562686742',
      path: 'pages/index/index?originAppId=2019011162880259&newUserTemplate=20190428000000168854'
    });
  }
  // 收藏
  canIUsesc = () => {
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
      const appId = url.substr(index + 6,16);
      const from = url.substr(54,4)
      // console.log('================',url.substpagesr(54,4))
      console.log(appId)
      if(from === 'page'){
        console.log(url,'456')
        my.navigateToMiniProgram({
          appId,
          extraData:{
            "query":"authorizedKey%3D45afea2d1e2b48cfb9e6d3d3563e18c7"
          },
        });
      }
      else {
        console.log(url,'88888888')
        my.navigateToMiniProgram({
          appId,
        });
      }
    }
    else {
      console.log(url,'789')
      Taro.navigateTo({ url });
    }
  }

  handleGotoClassify = (url) => {
    if (url.indexOf('alipays://') === 0) {
      const index = url.indexOf('appId=');
      const appId = url.substr(index + 6,16);
      const from = url.substr(54,4)
      // console.log('================',url.substpagesr(54,4))
      console.log(appId)
      if(from === 'page'){
        console.log(url,'456')
        my.navigateToMiniProgram({
          appId,
          extraData:{
            "query":"authorizedKey%3D45afea2d1e2b48cfb9e6d3d3563e18c7"
          },
        });
      }
      else {
        console.log(url,'88888888')
        my.navigateToMiniProgram({
          appId,
        });
      }
    }
    else {
      console.log(url,'789')
      Taro.navigateTo({ url });
    }
  }
  formSubmit = (e) => {
    let formId = e.detail.formId
  }
  switchTab = (item,type) => {
    const { dispatch ,} = this.props
    this.setState({ shopType: item.id });
    const info = {
      pageNum: 1,
      pageSize: 10,
    };
    dispatch({
      type: 'home/getIndexTabAndProduct',
      payload: { ...info ,tabId:item.id},
    });
    // dispatch({
    //   type:'home/getIndexTabAndProduct',
    //   payload: {
    //     tabId:item.id,
    //     channel:4
    //   },
    // })
    if(type === 'modal') {
      this.setState({
        isOpened: !this.state.isOpened,
      })
      // my.pageScrollTo({
      //   scrollTop: 750
      // })
    }
  }
  close = () => {
    this.setState({
      isOpened: false,
    });
  }
  onGoWater = (id) => {
    Taro.navigateTo({
      url:`/pages/productDetail/index?itemId=${id}`
    })
  }
  toggleFilter = () =>{
    my.pageScrollTo({
      scrollTop: 550
    })

    this.setState({
      isOpened: !this.state.isOpened,
    });
  }

  onPageScroll (e) {
    let query = my.createSelectorQuery();
    const { scrollTop } = this.state
    query.select('#id').boundingClientRect();
    query.exec(res=> {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if(scrollTop!==0 || res[0].top >=0 ){
          this.setState({
            scrollTop:res[0].top
          })
        }
      }, 100);
    });
  }
  render() {
    const { bannerList,  oldNewDegreeList, loinBanner, loading ,waterbanner ,products,tabList,iconList,
      total, queryInfo: { pageNum, pageSize }} = this.props;
    const { shopType , isOpened ,  scrollTop,isTagOpened} = this.state
    const systemInfo = Taro.getSystemInfoSync();
    let fixedHeight = 0;
    if (systemInfo.model.indexOf('iPhone X') > -1) {
      fixedHeight = fixedHeight + 30;
    }
    const scrollHeight = Taro.getSystemInfoSync().windowHeight - fixedHeight;
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View>
        <ScrollView
          className='products'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style={`height: ${scrollHeight}px;`}
          onScrollToLower={this.onScrollToLower}
        >
          <View className='home-page'>
            <View className='red_envelopes'>
              <Image onClick={this.gotoRed} className='envelopes'  src='http://oss.huizustore.com/545b093f92ad4a77b50c39358f5b8082.png' />
            </View>
            {/* <favorite>收藏小程序，下次使用更方便</favorite> */}
            <lifestyle publicId="2019011262875377" />
            <View className='home-top'>
              <Search
                value=''
              />
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
            { waterbanner && waterbanner.length &&(
              <View className='extension'>
                <View className='item-view-spe' onClick={this.onGoWater.bind(this,waterbanner[0].jumpUrl)} >
                  <Image className='item-img' src={waterbanner[0].imgUrl} />
                </View>
                <View className='item'>
                  <View className='item-view' onClick={this.onGoWater.bind(this,waterbanner[1].jumpUrl)} >
                    <Image className='item-img' src={waterbanner[1].imgUrl} />
                  </View>
                  <View className='item-view mt15' onClick={this.onGoWater.bind(this,waterbanner[2].jumpUrl)}>
                    <Image  className='item-img' src={waterbanner[2].imgUrl} />
                  </View>
                </View>
              </View>
            )}
            <View className='home-share ' onClick={this.skip.bind(this, loinBanner)}>
              <Image className='home-share-img' mode='aspectFit' src={loinBanner[0].imgSrc} />
            </View>
            <View
              className={`tabs-list ${scrollTop <= 0 && 'tabs-list-fixed' }`}
            >
              <View>
                <ScrollView
                  // scrollIntoView={shopType}
                  className={`shop-list-nav ${scrollTop <= 0 && 'shop-list-nav-fixed'}`}
                  // scrollWithAnimation
                  scrollX
                  id='id'
                >
                  {
                    tabList.map(item => {
                      return (
                        <View  onClick={this.switchTab.bind(this, item)}  key={item.id} id={item.id} className='shop-nav-container'>
                          <Text
                            // className='text'
                            className={`text ${shopType === item.id  && 'text-active'}`}
                          >
                            {item.name}
                          </Text>
                        </View>
                      )
                    })
                  }
                </ScrollView>
              </View>
              {scrollTop<=0?
                (
                  <View>
                    <View className='switch' onClick={this.toggleFilter}>
                      <Image  className='switch-img' src='http://oss.huizustore.com/d2493a3b85424499843739321575ea3b.png' />
                    </View>
                  </View>
                ):
                (
                  <View>
                    <View className='switch' onClick={this.toggleFilter}>
                      <Image  className='switch-img' src='http://oss.huizustore.com/4ed0cb1f26f1493e9be616631da3a3f9.png' />
                    </View>
                  </View>
                )
              }
            </View>
            <Form report-submit='true' onSubmit={this.formSubmit}>
              <View className='home-channel' >
                <Channel
                  formType='submit'
                  products={products}
                  // tab={info.tab}
                  oldNewDegreeList={oldNewDegreeList}
                  onGotoProduct={this.onGotoProduct}
                  onGoToMore={this.onGoToMore}
                />
                {/*))}*/}
                {pageNum * pageSize - total >= 0 && (
                  <View className='home-bottom'>
                    <Text className='text'> - 我们是有底线的 - </Text>
                  </View>
                )}
              </View>
            </Form>
            <View className='query_modal'>
              <AtModal isOpened={isOpened} className='content'>
                <AtModalHeader>
                  <View className='title'>分类
                    <View className='close' onClick={this.close}>
                      <Image className='close-img' src={require('../../images/home/close.png')} />
                    </View>
                  </View>
                </AtModalHeader>
                <AtModalContent>
                  {
                    tabList.map(item => {
                      return (
                        <View  onClick={this.switchTab.bind(this, item,'modal')}  key={item.id} id={item.id} className='container'>
                          <Text
                            // className='text'
                            className={`text ${shopType === item.id && 'text-active'}`}
                          >
                            {item.name}
                          </Text>
                        </View>
                      )
                    })
                  }
                </AtModalContent>
              </AtModal>
            </View>
            {/*<View className='home-bottom'>*/}
            {/*  <Text className='text'> -  - </Text>*/}
            {/*</View>*/}
            {/*<TagPage*/}
            {/*  onClick={this.shareFetchAuth}*/}
            {/*  onClose={this.shareOnClose}*/}
            {/*  isOpened={isTagOpened}*/}
            {/*  data='http://oss.huizustore.com/09ed26c0f6e543e8b15578c44a121b93.png'*/}
            {/*/>*/}
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Home;
