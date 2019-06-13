import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components'
import { formatStrDate } from '../../../../utils/utils';
import './index.scss';

class Card extends Component {

  gotoHome(status) {
    Taro.switchTab({ url: '/pages/home/index' });
    if (status === 0) {
    }
  }

  render() {
    const { type, data } = this.props; // red, yellow
    const durationStr = `${formatStrDate(data.start, 'yyyy.MM.dd')}-${formatStrDate(data.end, 'yyyy.MM.dd')}`;
    return (
      <View className='container_coupon'>
        {/*<View className={'card ' + type}>*/}
        {/*  <View className={'card-info ' + type}>*/}
        {/*    {isNew && <View className='tag'>*/}
        {/*      <View className='arrow'></View>*/}
        {/*      <Text className='text'>新人专享</Text>*/}
        {/*    </View>}*/}
        {/*    <View className='card-info-detail'>*/}
        {/*      <View className='left'>*/}
        {/*        <Text className={'num ' + type}>{data.value}</Text>*/}
        {/*        <Text className={'text ' + type}>元</Text>*/}
        {/*      </View>*/}
        {/*      <View className='middle'>*/}
        {/*        <View className='name'>*/}
        {/*          <Text className={'text ' + type}>{type === 'red'?'平台券':'店铺券' }</Text>*/}
        {/*        </View>*/}
        {/*        <View className='name time'>*/}
        {/*          <Text className={'text ' + type}>{durationStr}</Text>*/}
        {/*        </View>*/}
        {/*      </View>*/}
        {/*      <View className='right'>*/}
        {/*        <Button className={'btn ' + type} onClick={this.gotoHome.bind(this, data.status)}>*/}
        {/*          {data.status === 0 && '去使用'}*/}
        {/*          {data.status === 1 && '已使用'}*/}
        {/*          {data.status === 2 && '已失效'}*/}
        {/*        </Button>*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*  <View className={'card-type ' + type}>*/}
        {/*    <Text className='text'>{type === 'red' ? '全平台通用' : '全店使用'}</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
        <View className='content' onClick={this.gotoHome.bind(this, data.status)}>
          <View className='num'><Text className='bol'>¥</Text>{data.value}</View>
          <View className='item'>
            <View className='item-title'>
              {data.name}
            </View>
            <View className='item-use'>
              {data.minPurchase === 0 ?'无门槛':'满' + data.minPurchase + '可用'}
            </View>
            <View className='time'>
              有效期:{durationStr}
            </View>
          </View>
          <View className='pro_img'>
            {type === 'red' ?
              (<Image className='img' src={require('../../../../images/member/platform_pro.png')} />)
              :
              (<Image className='img' src={require('../../../../images/member/shop_pro.png')} />)
            }
          </View>
        </View>
      </View>

    )
  }
}

export default Card;
