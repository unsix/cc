import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtCheckbox } from 'taro-ui'

import { formatStrDate } from '../../../../utils/utils';
import './index.scss';

class Payment extends Component {
  handleChange = (value) => {
    const { data, onClick } = this.props;
    if (value.length) {
      onClick({ rent: data.currentPeriodsRent, outTransNo: data.outTransNo, currentPeriods: data.currentPeriods});
    } else {
      onClick({ rent: -data.currentPeriodsRent, outTransNo: data.outTransNo, currentPeriods: data.currentPeriods });
    }
    this.setState({
      checkedList: value
    })
  }

  state = {
    checkedList: [],
  }

  checkboxOption = [
    {
      value: 'list1',
      label: ' ',
    }
  ]

  render() {
    const { data } = this.props;
    const { checkedList } = this.state;
    const statementTime = new Date(data.statementDateStr);
    const dateStr = formatStrDate(data.statementDate, 'yyyy年MM月dd日');
    const durationTime = statementTime - (new Date());
    const durationDate = parseInt(durationTime / 1000 / 60 / 60 / 24, 10) + 1;
    return (
      <View className={`payment ${durationDate <= 0 && 'notePayment'}`}>
        <View className='payment-info'>
          <View className='payment-info-num'>
            <View>
              <Text className={`num ${durationDate <= 0 && 'numNote'}`}>{data.currentPeriods}/{data.totalPeriods}期</Text>
            </View>
            <View className={`box ${durationDate <= 0 && 'boxNote'}`}>
              <Text className='text'>
                <Text className='text-symbol'>&yen;</Text>
                <Text className='text-num'>{data.currentPeriodsRent.toFixed(2)}</Text>
                {durationDate <= 3 && durationDate > 0 && (
                  <Text className='text-other'>（还有3天即将还款）</Text>
                )}
                {durationDate <= 0 && (
                  <Text className='text-other'>（已逾期）</Text>
                )}
              </Text>
            </View>
          </View>
          <AtCheckbox
            options={this.checkboxOption}
            selectedList={checkedList}
            onChange={this.handleChange}
          />
        </View>
        <View className='payment-border'></View>
        <View className='payment-time'>
          <Text className={`time ${durationDate <= 0 && 'timeNote'}`}>还款时间：{dateStr}</Text>
          <Text className={`time ${durationDate <= 0 && 'statusNote'}`}>待还款</Text>
        </View>
      </View>
    )
  }
}

export default Payment;
