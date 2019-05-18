import Taro, { Component} from '@tarojs/taro'
import { View ,Swiper, SwiperItem, Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Back from '../../../images/active_page/back.png'
import Tosee from '../../../images/active_page/tosee.png'
import Receive from '../../../images/active_page/confirm.png'
import Banner from  '../../../images/active_page/banner.png'
import BtnReport from  '../../../images/active_page/repott_go.png'
import './index.scss';
@connect(({ unclaimed }) => ({
  ...unclaimed,
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
      url:'/pages/report/home/'
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
  };
  handleGetCoupon = () => {
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
          });
        }
        });

      },
    });
  }
  render() {
    const code = this.props.unclaimed
    console.log(code,'0000000000000000000000000000000000')
    const {animationData,unclaimed} = this.state
    // const animation = Taro.createAnimation({
    //   transformOrigin: "50% 50%",
    //   duration: 1000,
    //   timingFunction: "ease",
    //   delay: 0
    // })
    return (
      <View>
        {code&&code == '2' ?
          (<View>
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
                  {/*  <SwiperItem key={index}>*/}
                  {/*    <Image className="swiper-img" mode="widthFix" src={item.image_src}></Image>*/}
                  {/*  </SwiperItem>*/}
                  {/*))}*/}


                  <SwiperItem key='1' >
                    <View className='banner'>
                      <Image className="swiper-img" mode="widthFix" src={Banner} onClick={this.toReport}></Image>
                    </View>
                  </SwiperItem>
                </Swiper>
              </View>
              <View className='red_claimed'>
                <View className='complete'>
                  <Image className='complete_img' onClick={this.toBack} src={Back}/>
                  <Image className='complete_img' onClick={this.toSee} src={Tosee}/>
                </View>
              </View>
            </View>
          ) : (
            <View className='red_unclaimed'>
              <View className='confirm'>
                <Image onClick={this.handleGetCoupon} className='confirm_img' src={Receive}/>
              </View>
            </View>
          )
        }
      </View>
    )
  }
}

export default RedCollect

// {code&&code == '2' ?
//   (
//     <View className='red_claimed'>
//       <View className='complete'>
//         <Image className='complete_img' onClick={this.toBack} src={Back}/>
//         <Image className='complete_img' onClick={this.toSee} src={Tosee}/>
//       </View>
//     </View>
//   ) : (
//     <View className='red_unclaimed'>
//       <View className='confirm'>
//         <Image onClick={this.handleGetCoupon} className='confirm_img' src={Receive}/>
//       </View>
//     </View>
//   )
// }
