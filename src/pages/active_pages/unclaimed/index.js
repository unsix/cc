import Taro, { Component} from '@tarojs/taro'
import { View ,Swiper, SwiperItem, Image,Form, Button} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Back from '../../../images/active_page/back.png'
import Tosee from '../../../images/active_page/tosee.png'
import Banner from  '../../../images/active_page/report_banner_1.png'
import './index.scss';
@connect(({ unclaimed ,loading}) => ({
  ...unclaimed,
  loading: loading.models.unclaimed,
}))
class RedCollect extends Component {
  config = {
    navigationBarTitleText: '收藏有礼',
  };
  state={
    // banner: [
    //   '../../../images/active_page/report_banner_1.png'
    // ]
    animationData:{}
  }

  toBack = () => {
    Taro.switchTab({ url: '/pages/home/index' })
  }
  toSee = () => {
    Taro.navigateTo({ url: '/pages/coupon/index' })
  }
  toReport = () =>{
    Taro.redirectTo({
      url:'/pages/report/home/index'
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.unclaimed !== nextProps.unclaimed) {
      return true;
    }
    if (this.state.unclaimed  !== nextState.unclaimed) {
      return true;
    }
    return true;
  }
  componentDidMount = () => {
    const { dispatch } = this.props;
      dispatch({
        type: 'unclaimed/conuponSearch',
        payload:{
          couponid:'PL123AADSK'
        },
      });
    dispatch({
      type: 'unclaimed/getSettingDynamic',
    });
  };
  // onGoTo = (url) =>{
  //   Taro.navigateTo({
  //     url:`/${url}`
  //   })
  // }
  handleGetCoupon = () => {
  }
  //领红包
  formSubmit = (e) =>{
    // console.log(e.detail.formId)
    let formId = e.detail.formId
    const { dispatch } = this.props;
    dispatch({
      type: 'mine/fetchAuthCode',
      callback: () => {
        dispatch({
          type: 'unclaimed/getCoupon', //领红包
          payload: { couponId:'PL123AADSK'},
          callback:()=>{
            console.log('555555555555555555555555')
            dispatch({
              type: 'unclaimed/conuponSearch',
              payload:{
                couponid:'PL123AADSK'
              },
              callback:()=>{
                dispatch({
                  type:'unclaimed/userFormIdPool',
                  payload:{
                    type:'1',
                    userFormId:formId
                  }
                })
              }
            });

          }
        });

      },
    });
  }
  render() {
    const {code,banner,loading}= this.props
    console.log(code,'0000000000000000000000000000000000')
    const {animationData,unclaimed} = this.state
    // const animation = Taro.createAnimation({
    //   transformOrigin: "50% 50%",
    //   duration: 1000,
    //   timingFunction: "ease",
    //   delay: 0
    // })
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View>
        {code&&code === '2' ?
          (<View>
              {/*{banner&&banner!=null || undefined?(*/}
                <View className='report_banner'>
                  <Swiper
                    className="swiper-container"
                    circular
                    indicatorDots
                    indicatorColor='#999'
                    indicatorActiveColor='#bf708f'
                    autoplay
                  >
                    {/*{ banner.map((item, index) => (*/}
                    {/*  <SwiperItem key={banner.id}>*/}
                    {/*    <View className='banner' onClick={this.onGoTo.bind(this,banner.jumpUrl)}>*/}
                    {/*      <Image className='swiper-img' mode='aspectFit' src={banner.imgUrl} />*/}
                    {/*    </View>*/}
                    {/*  </SwiperItem>*/}
                    {/*))}*/}


                    <SwiperItem key='1' >
                      <View className='banner'>
                        <Image className="swiper-img" mode="widthFix" src={Banner} onClick={this.toReport}></Image>
                      </View>
                    </SwiperItem>
                  </Swiper>
                </View>
              {/*):null}*/}

              <View className='red_claimed'>
                <View className='complete'>
                  <Image className='complete_img' onClick={this.toBack} src={Back}/>
                  <Image className='complete_img' onClick={this.toSee} src={Tosee}/>
                </View>
              </View>
            </View>
          ) : (
            <View className='red_unclaimed'>
              <Form report-submit='true' onSubmit={this.formSubmit}>
                <View className='confirm' >
                  <Button className='confirm_button' formType='submit'>
                    点击领取
                  </Button>
                </View>
              </Form>
            </View>
          )
        }
      </View>
    )
  }
}

export default RedCollect
