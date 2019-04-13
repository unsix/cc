import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { formatStrDate } from '../../../../utils/utils';
import './index.scss';


class Ticket extends Component {

  render() {
    const xzList = [null, '限分类', '限品牌', '限单品', '限店铺', '全品类'];
    const { data } = this.props;
    let duration = null;
    if (data.type !== 1 && data.start && data.end) {
      duration = `${formatStrDate(data.start, 'yyyy.MM.dd')}-${formatStrDate(data.end, 'yyyy.MM.dd')}`;
    }
    return (
      <View className='ticket'>
        <View className='ticket-money'>
          <Text className='num'>
            <Text>&yen;</Text>
            <Text className='big'>{data.value}</Text>
          </Text>
          <Text className='text'>满{data.minPurchase}元可用</Text>
        </View>
        <View className='ticket-border'></View>
        <View className='ticket-title'>
          <View className='title'>
            <View>
              <Text className='name'>[{xzList[data.newPackageType]}] {data.name}</Text>
            </View>
            <View className='time'>
              {data.type === 1 ? (
                <Text className='content'>自{data.duration}天后失效</Text>
              ) :
                (
                  <Text className='content'>{duration}</Text>
                )}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Ticket;
