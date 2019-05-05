import Taro, { Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Back from '../../../images/active_page/back.png'
import Tosee from '../../../images/active_page/tosee.png'
import Receive from '../../../images/active_page/confirm.png'
import './index.scss';
@connect(({ unclaimed }) => ({
  ...unclaimed,
}))
class RedCollect extends Component {
  config = {
    navigationBarTitleText: '收藏有礼',
  };

  toBack = () => {
    Taro.switchTab({ url: '/pages/home/index' })
  }
  toSee = () => {
    Taro.navigateTo({ url: '/pages/coupon/index' })
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
          // callback:() => {
          //
          // }
        });
      },
    });
  }
  render() {
    console.log(this.props,'1231231231231232')
    const code = this.props.unclaimed
    return (
      <View>
        {code&&code == '2' ?
          (
            <View className='red_claimed'>
              <View className='complete'>
                <Image className='complete_img' onClick={this.toBack} src={Back}/>
                <Image className='complete_img' onClick={this.toSee} src={Tosee}/>
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
