import Taro, { Component } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux';

import NoData from '../../components/noData/index'
import Card from './component/card/index';
import './index.scss';

@connect(({ coupon }) => ({
  ...coupon,
}))
class Coupon extends Component {
  config = {
    navigationBarTitleText: '我的优惠券',
  };

  state = {
    display: 'block', // none -> 没数据隐藏
    current: 0,
  }

  componentDidMount = () => {
    const { queryInfo } = this.props;
    this.setDispatch(queryInfo);
  };

  setDispatch(queryInfo, fetchType) {
    const { dispatch } = this.props;
    const info = { ...queryInfo };
    if (fetchType === 'scroll') {
      info.pageNumber += 1;
      info.fetchType = fetchType;
    }
    dispatch({
      type: 'coupon/getAllUserCouponList',
      payload: { ...info },
    });
  }

  onScrollToLower = () => {
    const { queryInfo } = this.props;
    this.setDispatch(queryInfo, 'scroll');
  };

  handleClick (value) {
    this.setState({
      current: value
    })
    console.log(value)
  }
  render() {
    const tabList = [{ title: '卡劵' }, { title: '权益' }]
    const { userPlatformCoupon, userShopCoupon } = this.props;
    const { display } = this.state;
    const systemInfo = Taro.getSystemInfoSync();
    let fixedHeight = 0;
    if (systemInfo.model.indexOf('iPhone X') > -1) {
      fixedHeight = fixedHeight + 30;
    }
    const scrollHeight = Taro.getSystemInfoSync().windowHeight - fixedHeight;
    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <ScrollView
            className='coupon-page'
            scrollY
            scrollWithAnimation
            scrollTop='0'
            style={`height: ${scrollHeight}px;`}
            onScrollToLower={this.onScrollToLower}
          >
            {!!userPlatformCoupon && !!userPlatformCoupon.length && userPlatformCoupon.map(coupon =>
              <Card key={coupon.id} type='red' isNew={coupon.id === 1} data={coupon} />
            )}
            {!!userShopCoupon && !!userShopCoupon.length && userShopCoupon.map(coupon =>
              <Card key={coupon.id} type='yellow' isNew={coupon.id === 1} data={coupon} />
            )}
            {(!userPlatformCoupon || !userPlatformCoupon.length) && (!userShopCoupon || !userShopCoupon.length) && (
              <NoData type='coupon' display={display} />
            )}
          </ScrollView>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          123
        </AtTabsPane>
      </AtTabs>
    )
  }
}

export default Coupon;
