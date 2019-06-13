import Taro, { Component } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux';

import NoData from '../../components/noData/index'
import Card from './component/card/index';
import Equity from './component/equity/index'
import './index.scss';

@connect(({ coupon,loading }) => ({
  ...coupon,
  loading: loading.models.members,
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
    const { queryInfo ,dispatch} = this.props;
    this.setDispatch(queryInfo);
    dispatch({
      type:'coupon/getUserMembersEquitiesByUid'
    })
  };

  setDispatch(queryInfo, fetchType) {
    const { dispatch } = this.props;
    const info = { ...queryInfo };
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
  goEquityClick = (type) => {
    const { equity , dispatch } = this.props
   if(type === '4'){
     dispatch({
       type:'coupon/checkInvokeCode',
       payload: {
         invokeCode:equity.equitit.reportNo
       },
       callback:(res)=>{
         if(res && res.data === 1){
           Taro.navigateTo({
             url:`/pages/report/home/index?invokeCode=${equity.equitit.reportNo}`
           })
         }
         else if(res && res.data === 2){
           Taro.navigateTo({
             // url:`/pages/report/home/index?invokeCode=${equity.reportNo}`
             url:`/pages/report/report_results/index?reportId=${equity.equitit.reportNo}`
           })
         }
         else {
           Taro.showToast({
             title:'风控自查无法使用，已过期'
           })
         }
       }
     })
   }
   else if(type === '1'){
    Taro.navigateTo({
      url: '/' + equity.jump.jumpUrl1
    })
   }
   else if(type === '2'){
     Taro.navigateTo({
       url: '/' + equity.jump.jumpUrl2
     })
   }
   else if(type === '3'){
     Taro.navigateTo({
       url: '/' + equity.jump.jumpUrl3
     })
   }
  }
  render() {
    const tabList = [{ title: '卡劵' }, { title: '权益' }]
    const { userPlatformCoupon, userShopCoupon , equity,  loading,} = this.props;
    const { display } = this.state;
    const systemInfo = Taro.getSystemInfoSync();
    let fixedHeight = 0;
    if (systemInfo.model.indexOf('iPhone X') > -1) {
      fixedHeight = fixedHeight + 30;
    }
    const scrollHeight = Taro.getSystemInfoSync().windowHeight - fixedHeight;
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
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
          <ScrollView
            className='coupon-page'
            scrollY
            scrollWithAnimation
            scrollTop='0'
            style={`height: ${scrollHeight}px;`}
            onScrollToLower={this.onScrollToLower}
          >
            {
              equity &&  equity.status!==1?
                ( <Equity
                  data={equity}
                  onClick={this.goEquityClick}
                />
                )
                :
                (
                  <NoData type='equity' display={display} />
                )
            }
          </ScrollView>
        </AtTabsPane>
      </AtTabs>
    )
  }
}

export default Coupon;
