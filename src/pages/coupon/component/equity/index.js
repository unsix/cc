import Taro, { Component } from '@tarojs/taro';
import { Image, View, } from '@tarojs/components'
import { formatStrDate } from '../../../../utils/utils';
import './index.scss';

class Equity extends Component {

  gotoHome(status) {
    Taro.switchTab({ url: '/pages/home/index' });
    if (status === 0) {
    }
  }
  goEquity (value) {
    const { onClick } = this.props;
    onClick(value)
  }
  render() {
    const {  data ,} = this.props; // red, yellow
    let durationStr = null
    if(data && data.equitit && data.equitit.startTime) {
       durationStr = `${formatStrDate(data.equitit.startTime, 'yyyy.MM.dd')}-${formatStrDate(data.equitit.dueTime, 'yyyy.MM.dd')}`;
    }
    return (
      <View className='equity'>
        <View className='container_equity bg_1' onClick={this.goEquity.bind(this,'1')}>
          <View className='item'>
            <View className='title'>
              会员折扣卡
            </View>
          </View>
          <View className='title-dec'>
            { data && data.jump.remark1 }
          </View>
          <View className='time'>
            有效期：{ durationStr }
          </View>
        </View>
        <View className='container_equity bg_2' onClick={this.goEquity.bind(this,'2')}>
          <View className='item'>
            <View className='title'>
              免押增额卡
            </View>
            <View className='num'>
              {data && data.equitit.depositReduction?data.equitit.depositReduction:0}元
            </View>
          </View>
          <View className='title-dec'>
            { data && data.jump.remark2 }
          </View>
          <View className='time'>
            有效期：{ durationStr }
          </View>
        </View>
        <View className='container_equity bg_3' onClick={this.goEquity.bind(this,'3')}>
          <View className='item'>
            <View className='title'>
              回寄包邮卡
            </View>
            <View className='num'>
              {data && data.equitit.packageNumber?data.equitit.packageNumber:0}次
            </View>
          </View>
          <View className='title-dec'>
            { data && data.jump.remark3 }
          </View>
          <View className='time'>
            有效期：{  durationStr }
          </View>
        </View>
        <View className='container_equity bg_4' onClick={this.goEquity.bind(this,'4')}>
          <View className='item'>
            <View className='title'>
              风控自查卡
            </View>
            <View className='title-dec'>
              { data && data.jump.remark4 }
            </View>
            <View className='num num_report'>
              {data && data.equitit.reportNo?data.equitit.reportNo:'无'}
            </View>
          </View>
          <View className='time'>
            有效期：{  durationStr }
          </View>
        </View>
      </View>
    )
  }
}

export default Equity;
