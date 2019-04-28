import Taro, { Component} from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
// import Ticket from './component/ticket/index';
import Receive from '../../../images/active_page/confirm.png'
import Back from '../../../images/active_page/back.png'
import ToSee from '../../../images/active_page/tosee.png'
import './index.scss';
@connect(({ unclaimed }) => ({
  ...unclaimed,
}))
class RedCollect extends Component {
  config = {
    navigationBarTitleText: '收藏有礼',
  };

  componentDidMount = () => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'freshman/selectNewPackageList',
    // });
  };
  handleGetCoupon = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'unclaimed/getCoupon',
      payload: { couponId:'PL123AADSK'},
    });
  }
  // gotoAdd = () => {
  //   Taro.navigateTo({ url: '/pages/addAddress/index' });
  // }
  submit() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'mine/fetchAuthCode',
    //   callback: () => {
    //     dispatch({
    //       type: 'freshman/getNewPackage', //领红包
    //       payload: { type: 1 },
    //     });
    //   },
    // });
  }
  // confirm = () => {
  //   Taro.showToast({
  //     title: '恭喜你活动劵领取成功',
  //     icon: 'none',
  //   });
  // }
  render() {
    return (
      <View className='red_unclaimed'>
        <View className='red_bg'>
          <View className='confirm'>
            <Image onClick={this.handleGetCoupon} className='confirm_img' src={Receive} />
          </View>
        </View>
      </View>
      //  <View className='red_claimed'>
      //   <View className='red_bg'>
      //     <View className='complete'>
      //       <Image className='complete_img' src={Back} />
      //       <Image className='complete_img' src={ToSee} />
      //     </View>
      //   </View>
      // </View>
    )
  }
}

export default RedCollect
