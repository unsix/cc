import Taro, { Component} from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
// import Ticket from './component/ticket/index';
import Receive from '../../../images/active_page/confirm.png'
import './index.scss';
@connect(({ unclaimed }) => ({
  ...unclaimed,
}))
class RedCollect extends Component {
  config = {
    navigationBarTitleText: '收藏有礼',
  };

  handleGetCoupon = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'mine/fetchAuthCode',
      callback: () => {
        dispatch({
          type: 'unclaimed/getCoupon', //领红包
          payload: { couponId:'PL123AADSK'},
        });
      },
    });
  }
  render() {
    return (
      <View className='red_unclaimed'>
        <View className='red_bg'>
          <View className='confirm'>
            <Image onClick={this.handleGetCoupon} className='confirm_img' src={Receive} />
          </View>
        </View>
      </View>
    )
  }
}

export default RedCollect
