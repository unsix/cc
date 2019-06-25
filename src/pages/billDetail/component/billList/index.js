import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { formatStrDate } from '../../../../utils/utils';
import './index.scss';

class BillList extends Component {
  handleClick = (item) => {
    // console.log('click->', item, this.props);
  }

  render() {
    const { data } = this.props;
    let  dateStr =null
    if(data.repaymentDate){
       dateStr = formatStrDate(data.repaymentDate, 'yyyy年MM月dd日');
    }
    const dateStrS = formatStrDate(data.statementDate, 'yyyy年MM月dd日');
    // console.log(data,'shuigsfieugrfiue')
    return (
      <View className='bill'>
        <View className='bill-list'>
          <View className='bill-list-num'>
            <View>
              <Text className='num'>{data.currentPeriods}/{data.totalPeriods}期</Text>
            </View>
            <View className='box'>
              <Text className='text'>
                <Text className='text-symbol'>&yen;</Text>
                <Text className='text-num'>{data.currentPeriodsRent}</Text>
              </Text>
            </View>
          </View>
          <View className='bill-list-num'>
            <View className='right-text'>
              <Text className='num'>已还款</Text>
            </View>
            {
              dateStr && !! dateStr?
                (
                  <View className='time'>
                    <Text className='num text'>{dateStr}</Text>
                  </View>
                )
                :
                (
                  <View className='time'>
                    <Text className='num text'>{dateStrS}</Text>
                  </View>
                )
            }
          </View>
        </View>
        <View className='bill-border'></View>
      </View>
    )
  }
}

export default BillList;
