import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import './index.scss';
import { formatStrDate } from '../../utils/utils'
import NoData from '../../components/noData/index'

@connect(({ deposit, loading }) => ({
  ...deposit,
  loading: loading.models.deposit,
}))
class Realname extends Component {
  config = {
    navigationBarTitleText: '账单',

  };

  state = {
   display: 'block', // none -> 没数据隐藏
  }

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch({
      type:'deposit/listRechargeDepositRecordsByUid'
    })
  };

  showToast(title) {
    Taro.showToast({
      title,
      icon: 'none',
      mask: true,
    });
  }



  render() {
    const { loading , info ,} = this.props;
    const { display } = this.state;
    // console.log(this.state)
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='container-deposit'>
        <View>
          { info && !!info.length ? info.map(item=>(
              <View className='item'>
                <View>充值
                  <View>
                    {item.userRemark }
                  </View>
                </View>
                <View> {formatStrDate(item.createTime, 'yyyy-MM-dd') }
                  <View> +{item.rechargeAmount.toFixed(2)}</View>
                </View>
              </View>
            )): null
            // (
            //   <View>
            //     <NoData type='deposit' display={display} />
            //   </View>
            // )

          }
          <View className='no-data'>
            {(!info || !info.length) && (!info || !info.length) && (
              <NoData type='deposit' display={display} />
            )}
          </View>
          {/*<View className='item'>*/}
          {/*  <View>提现*/}
          {/*    <View>*/}
          {/*      余额：0.00*/}
          {/*    </View>*/}
          {/*  </View>*/}
          {/*  <View>2019-06-18*/}
          {/*    <View>+6.00</View>*/}
          {/*  </View>*/}
          {/*</View>*/}
        </View>
      </View>
    )
  }
}

export default Realname;
