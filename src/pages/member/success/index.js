import Taro, { Component} from '@tarojs/taro'
import { View ,Image,Button,Text} from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'

@connect(({  members,loading}) => ({
  ...members,
  loading: loading.models.members,
}))
class paySuccess extends Component {
  config = {
    navigationBarTitleText: '开通成功',
  };
  state={

  }
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type:'members/getUserMembersEquitiesAllByUid',
    })
  }

  toBack = () => {
   Taro.navigateBack()
  }
  toSee = () => {
    Taro.redirectTo({ url: '/pages/coupon/index' })
  }


  render() {
    const { loading ,memberIfn}= this.props
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='container_success'>
        <View className='success_img'>
          <Image className='img' src='http://oss.huizustore.com/0f677c3401404571aabca146ca5478c9.png' />
        </View>
        <View className='content'>
          <View className='price'>￥<Text className='num'>{memberIfn.amount}</Text></View>
          <View className='get_equity'>
            获得权益
          </View>
          <View className='equity'>
            <View className='item'>
              <View className='item-img'>
                <Image className='img_1' src='http://oss.huizustore.com/6a5dfb28328b412d96150ad2e1c7362f.png' />
              </View>
              <View className='item-text'>
                <View className='text'>
                  获得租金豆 <Text className='num'>+{memberIfn.vip.wingNumber}金</Text>
                </View>
                <View className='word'>
                  金豆当钱花
                </View>
              </View>
              <View className='get'>
                已获得
              </View>
            </View>
            <View className='item'>
              <View className='item-img'>
                <Image className='img_2' src='http://oss.huizustore.com/d66ebdd64eb64f5fb406d9a7a7d638b5.png' />
              </View>
              <View className='item-text'>
                <View className='text'>
                  全场享折扣
                </View>
                <View className='word'>
                  会员折扣{memberIfn.vip.memberDiscount*10}折起
                </View>
              </View>
              <View className='get'>
                已获得
              </View>
            </View>
            <View className='item'>
              <View className='item-img'>
                <Image className='img_3' src='http://oss.huizustore.com/e72e849058b14cb9aa9d51e8bdb2f93b.png' />
              </View>
              <View className='item-text'>
                <View className='text'>
                  免押额度增加
                </View>
                <View className='word'>
                  免押总额度增加{memberIfn.vip.depositReduction}元
                </View>
              </View>
              <View className='get'>
                已获得
              </View>
            </View>
            <View className='item'>
              <View className='item-img'>
                <Image className='img_4' src={require('../../../images/member/ship_exc.png')} />
              </View>
              <View className='item-text'>
                <View className='text'>
                  包邮劵
                </View>
                <View className='word'>
                  回寄包邮{memberIfn.vip.packageNumber}次
                </View>
              </View>
              <View className='get'>
                已获得
              </View>
            </View>
          </View>
        </View>
        <View className='footer'>
          <Button className='back' onClick={this.toBack}>
            返回
          </Button>
          <Button className='to-see' onClick={this.toSee}>
            查看权益
          </Button>
        </View>
      </View>
    )
  }
}

export default paySuccess
