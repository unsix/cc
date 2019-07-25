import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Form, ScrollView, Button } from '@tarojs/components'
import { AtModal, AtModalContent, AtTabs, AtTabsPane ,AtModalHeader} from 'taro-ui'
import { connect } from '@tarojs/redux';
import Search from './component/search/index';
import Channel from './component/channel/index';
import flowImg from '../../images/home/flow.png';
// import Rolling from '../../components/rolling/rolling';
import { debounce } from  '../../utils/utils'
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
    shopType:'手机优选',
    show: true,
    isOpened:false,
    fixTop:'',//区域离顶部的高度
    scrollTop:1,//滑动条离顶部的距离
    tabArrayList:[]

  }
  componentDidMount = () => {
    const { dispatch } = this.props
    // const { shopType } = this.state
    this.canIUsesc();
     dispatch({
        type: 'home/getIndexList',
        callback:(val)=>{
          dispatch({
            type:'home/getIndexTabAndProduct',
            payload: {
              tabId:val,
              channel:1
            },
            callback:(type)=>{
              this.setState({
                shopType:type
              })
            }
          })
        }
      })

    // my.alert({content:getCurrentPageUrlWithArgs()})
    // my.alert({content:this.$router.params.type})
    const { type } = this.$router.params
    console.log(type,'=====================')
    if(type){
      dispatch({
        type:'home/getZhifubaoFlow',
        payload:{
          type:type
        }
      })
    }
    console.log(this.$router.params.type,'==========================================')
  };

  //悬浮红包
  gotoRed = () => {
    // const { dispatch } = this.props;
    //     dispatch({
    //       type: 'productDetail/conuponSearch',
    //       payload:{
    //         couponid:'PL123AADSK'
    //       },
    //     });
    my.navigateToMiniProgram({
      appId: '2018122562686742',
      path: 'pages/index/index?originAppId=2019011162880259&newUserTemplate=20190428000000168854'
    });
  }
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
    // console.log(formId,'9999999999999999999999999999999999999999999999999')
  }
  switchTab = (item,type) => {
    const { dispatch } = this.props
    console.log(item.name)
    this.setState({ shopType: item.name });
    dispatch({
      type:'home/getIndexTabAndProduct',
      payload: {
        tabId:item.id,
        channel:1
      },
    })
    if(type === 'modal') {
      this.setState({
        isOpened: !this.state.isOpened,
      })
      my.pageScrollTo({
        scrollTop: 750
      })
    }
  }
  close = () => {
    this.setState({
      isOpened: false,
    });
  }
  handleCallBack = (data) => {
    my.alert({
      content: JSON.stringify(data)
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
  throttle(fn, gapTime) {//防止多次点击跳转
    if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
    }
    let _lastTime = null
    // 返回新的函数
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        //fn()如果直接调用，this指向会发生改变，所以用apply将this和参数传给原函数
        fn.apply(this, arguments)   //将this和参数传给原函数
        _lastTime = _nowTime
      }
    }
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
  onScroll = (e) => {

  }
  render() {
    const { bannerList, tabList, oldNewDegreeList, loinBanner, loading ,waterbanner ,products,tabArray,iconList} = this.props;
    const { shopType ,show, items, isOpened , fixTop , scrollTop,tabArrayList} = this.state
    // if(tabArray && !!tabArray.length){
    //   let  obj = {}
    //   tabArray.map(item=>(
    //     obj ={
    //       name:item.name,
    //       id:item.id
    //     },
    //     tabArrayList.push(obj)
    //   ))
    // }
    // console.log(tabArrayList,'============')
    // const navTab = [...tabArrayList];
    // navTab.unshift({
    //   id: '1',
    //   name: '手机优选',
    // });
    // console.log(iconList)
    console.log(this.state.scrollTop)
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
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
        {/*<View className='home-freshman' onClick={this.skip.bind(this, loinBanner)}>*/}
        {/*  <Image className='home-freshman-img' mode='aspectFit' src={loinBanner && loinBanner.length && loinBanner[0].imgSrc} />*/}
        {/*  /!* <View className='home-freshman-box'></View>*/}
        {/*  <View className='home-freshman-content'>*/}
        {/*    <View style={{ marginBottom: '5px' }}>*/}
        {/*      <Text style={{ paddingRight: '5px' }}>新人大礼包</Text>*/}
        {/*      <Text class='home-freshman-content-bold'>超值划算</Text>*/}
        {/*    </View>*/}
        {/*    <View className='home-freshman-content-new'>全新类大额优惠券等你领取</View>*/}
        {/*  </View>*/}
        {/*  <View className='home-freshman-button'>立即领取</View> *!/*/}
        {/*</View>*/}
        <View className='home-share ' onClick={this.skip.bind(this, loinBanner)}>
          <Image className='home-share-img' mode='aspectFit' src={loinBanner[0].imgSrc} />
        </View>
        {/*scrollWithAnimation="true" scrollTop={this.state.scrollTopValue}*/}
        {/*className={`elements-page__scroll`} scrollIntoView={this.props.root.scrollntoView}*/}
        {/*scrollWithAnimation="false" upperThreshold="-100" ontouchend={this.touchend.bind(this)}*/}
        {/*ontouchmove={this.move.bind(this)} ontouchstart={this.touchstart.bind(this)}  scrollY*/}
        {/*enableBackToTop onscroll={this.scroll.bind(this)} onscrolltolower={this.scrollDown.bind(this)}*/}
        {/*style={`padding-top:${this.props.pageConfig.fixed?0:this.state.height}px;${this.props.pageConfig.contentBgColor? */}
        {/*'background:'+this.props.pageConfig.contentBgColor+';':''}`}*/}
        <View
          className={`tabs-list ${scrollTop <= 0 && 'tabs-list-fixed' }`}
        >
          <View>
            <ScrollView
              onScroll={this.onScroll}
              scrollIntoView={shopType}
              className={`shop-list-nav ${scrollTop <= 0 && 'shop-list-nav-fixed'}`}
              // className='shop-list-nav'
              scrollWithAnimation
              scrollX
              id='id'
            >
              {/*{fixTop<scrollTop && (*/}
              {/*  <view className="news fix-news" wx:if="{{fixTop<scrollTop}}">*/}
              {/*    <text>今日新闻列表</text>*/}
              {/*  </view>*/}
              {/*)*/}
              {/*}*/}
              {
                tabArray.map(item => {
                  return (
                    <View  onClick={this.switchTab.bind(this, item)}  key={item.id} id={item.id} className='shop-nav-container'>
                      <Text
                        // className='text'
                        className={`text ${shopType === item.name && 'text-active'}`}
                      >
                        {item.name}
                      </Text>
                      {/*{shopType === item.id && <View className='border-bottom'></View>}*/}
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
            {/*{products && products.length && products.map(info => (*/}
              <Channel
                formType='submit'
                products={products}
                // tab={info.tab}
                oldNewDegreeList={oldNewDegreeList}
                onGotoProduct={this.onGotoProduct}
                onGoToMore={this.onGoToMore}
              />
            {/*))}*/}
          </View>
        </Form>
        {/*<filter className='filter' show={show} max='1' onChange={this.handleCallBack}>*/}
        {/*  /!*{items && items.map(item=>(*!/*/}
        {/*  /!*  <filter-item value={item.value} id={item.id} selected={item.selected} />*!/*/}
        {/*  /!*)}*!/*/}
        {/*  {*/}
        {/*    items && items.map(item=>(*/}
        {/*      <filter-item value={item.value} id={item.id} selected={item.selected} />*/}
        {/*    ))*/}
        {/*  }*/}
        {/*</filter>*/}
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
                tabArray.map(item => {
                  return (
                    <View  onClick={this.switchTab.bind(this, item,'modal')}  key={item.id} id={item.id} className='container'>
                      <Text
                        // className='text'
                        className={`text ${shopType === item.name && 'text-active'}`}
                      >
                        {item.name}
                      </Text>
                      {/*{shopType === item.id && <View className='border-bottom'></View>}*/}
                    </View>
                  )
                })
              }
            </AtModalContent>
          </AtModal>
        </View>
        <View className='home-bottom'>
          <Text className='text'> - 再拖就没有了 - </Text>
        </View>
      </View>
    )
  }
}

export default Home;
