import Taro, { Component} from '@tarojs/taro'
import { View, Image, Form, Swiper, SwiperItem, Button, Text } from '@tarojs/components'
import { AtModal,  AtModalContent } from 'taro-ui';
import { connect } from '@tarojs/redux'
import './index.scss'
// import {formatStrDate} from '../../utils/utils'
//img
import VipYes from  '../../../images/member/vip-yes.png'
import VipNo from  '../../../images/member/vip-no.png'

@connect(({ mine, members,loading}) => ({
  ...mine,
  ...members,
  loading: loading.models.members,
}))
class Member extends Component{
  config = {
    navigationBarTitleText: '会员中心',
  };
  state = {
    isOpened:false
  }
  componentDidMount () {


  }
  componentDidShow = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'mine/fetchAuthCode',
      // callback: () => {
      //   dispatch({
      //     type:'members/getMember'
      //   })
      // },
    });
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.memberIfn.userMembers !== nextProps.memberIfn.userMembers) {
  //     return true;
  //   }
  //   return true;
  // }
  //弹窗
  details = () => {
    this.setState({
      isOpened:true
    })
  }
  //ment
  ment = () =>{
    Taro.navigateTo({
      url:'/pages/webview/vipment'
    })
  }
  //确定
  confirm = () => {
    this.setState({
      isOpened:false
    })
  }
  //跳转报告
  toReport = () => {
    Taro.navigateTo({
      url:'/pages/report/home/index'
    })
  }
  //支付
  memberPay = () => {
    const { dispatch } = this.props
      dispatch({
        type:'members/userMember',
        payload:{
          type: '1'
        },
        callback:()=>{
          dispatch({
            type:'members/getMember'
          })
        }
      })
  }

  render () {
    // console.log(this.props,'99999999999999')
    const { nickName, avatar , memberIfn,loading} = this.props
    // const { isOpened } = this.state
    // let date = null
    // // const date = memberIfn.userMembers &&  formatDate(new Date(memberIfn.userMembers[0].dueTime), 'yyyy年MM月dd')
    // if (memberIfn.userMembers && !!memberIfn.userMembers.length) {
    //    date = `${formatStrDate(memberIfn.userMembers[0].dueTime, 'yyyy-MM-dd')}`
    // }
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return(
      <View className='container container_member'>
        <View className='header'>
          <View className='person_inf'>
            <View className='doubt'>
              <Image className='img' src={require('../../../images/member/doubt.png')} />
            </View>
            <View className='inf'>
              <View className='avatar'>
                <Image className='img' src={avatar} />
              </View>
              <View className='name'>
                <View className='name_text'>UnWelt</View>
                <View className='text'>
                  <Image className='img' src={VipYes} />
                  <View>普通用户</View>
                </View>
              </View>
              <View className='time'>
                有效期
                <Text className='text'>
                  2019-10-25
                </Text>
              </View>
            </View>
            <View className='have'>
              <View className='bean'>
                <View className='text'>
                  <Image className='img' src={require('../../../images/member/beans.png')} />
                  <Text className='word'>金豆</Text>
                </View>
                <View className='text'>
                  <View className='num'>0</View>
                  <View className='word'>账户</View>
                </View>
              </View>
              <View className='bill'>
                <Image className='img' src={require('../../../images/member/bill.png')} />
                <View  className='text'>
                  账单
                </View>
              </View>
              <View className='card'>
                <Image className='img' src={require('../../../images/member/card.png')} />
                <View className='text'>
                  卡包
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='content'>
          <View className='member_price'>
            <View className='title'>
              <Image className='img' src={require('../../../images/member/member_price.png')} />
            </View>
            <View className='opt_price ' >
              <View className='item_opt'>
                <View className='num'>￥<Text className='text'>168</Text></View>
                <View className='time'>会员期3个月</View>
              </View>
              <View className='item_opt'>
                <View className='num'>￥<Text className='text'>168</Text></View>
                <View className='time'>会员期3个月</View>
              </View>
              <View className='item_opt'>
                <View className='num'>￥<Text className='text'>168</Text></View>
                <View className='time'>会员期3个月</View>
              </View>
              <View className='item_opt'>
                <View className='num'>￥<Text className='text'>168</Text></View>
                <View className='time'>会员期3个月</View>
              </View>
              <View className='item_opt'>
                <View className='num'>￥<Text className='text'>168</Text></View>
                <View className='time'>会员期3个月</View>
              </View>
              <View className='item_opt'>
                <View className='num'>￥<Text className='text'>168</Text></View>
                <View className='time'>会员期3个月</View>
              </View>
            </View>
          </View>
          <View className='member_exc '>
            <View className='title'>
              <Image className='img' src={require('../../../images/member/title_exc.png')} />
            </View>
            <View className='exclusive'>
              <View className='sive'>
                <View className='text'>
                  <View>
                    <Image className='img_1 img' src={require('../../../images/member/beans_exc.png')} />
                  </View>
                  <View className='word'>
                    <View>获得租金豆</View>
                    <View className='bold'>5000金豆=50元</View>
                    <View className='shallow'>金豆当前花</View>
                  </View>
                </View>
              </View>
              <View className='sive'>
                <View className='text'>
                  <View>
                    <Image className='img_1 img' src={require('../../../images/member/price_exc.png')} />
                  </View>
                  <View className='word'>
                    <View>免押额度增加</View>
                    <View className='bold'>336元</View>
                    <View className='shallow'>总额度增加336元</View>
                  </View>
                </View>
              </View>
              <View className='sive'>
                <View className='text'>
                  <View>
                    <Image className='img_1 img' src={require('../../../images/member/discount_exc.png')} />
                  </View>
                  <View className='word'>
                    <View>全程折扣</View>
                    <View className='bold'>9折起</View>
                    <View className='shallow'>全场商品享折扣</View>
                  </View>
                </View>
              </View>
              <View className='sive'>
                <View className='text'>
                  <View>
                    <Image className='img_1 img' src={require('../../../images/member/ship_exc.png')} />
                  </View>
                  <View className='word'>
                    <View>包邮卷</View>
                    <View className='bold'>1次</View>
                    <View className='shallow'>回寄包邮</View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className='privilege'>
            <View className='title'>
              专属特权
            </View>
            <View className='item'>
              <View className='item-content'>
                <View>
                  <Image className='img' src={require('../../../images/member/query_no.png')} />
                </View>
                <View>赠风控查询</View>
              </View>
              <View className='item-content'>
                <View>
                  <Image className='img' src={require('../../../images/member/service_no.png')} />
                </View>
                <View>专属客服</View>
              </View>
              <View className='item-content'>
                <View>
                  <Image className='img' src={require('../../../images/member/fist_ship_no.png')} />
                </View>
                <View>优先发货</View>
              </View>
              <View className='item-content'>
                <View>
                  <Image className='img' src={require('../../../images/member/guard_no.png')} />
                </View>
                <View>信用守护</View>
              </View>
            </View>
          </View>
        </View>
        <View className='member_shop'>
          <View className='shop'>
            <View className='title'>
                会员商城
            </View>
            <View className='shop-list'>
              <View className='item'>
                <View className='item-img'>

                </View>
                <View className='item-text'>
                  <View className='text-bold'>分期租金60元折扣卷</View>
                  <View className='text-shallow'>副标题副标题副标题</View>
                  <View className='text-time'>30天有效</View>
                  <View className='text-beans'>6000金</View>
                  <View className='text-sales'>
                    <View className='sales'>
                      已售21324份
                    </View>
                    <View className='exchange'>
                      <View className='exchange_btn'>立即兑换</View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='pay_member'>
            <View className='subtotal'>
              小计
            </View>
            <View className='price'>
              <Text className='bol'>¥</Text>399
              <Text className='nian'>（一年）</Text>
              <View className='agreement' onClick={this.ment}>
                开通即同意《惠租会员协议》
              </View>
            </View>
            <View className='pay'>
              <Button onClick={this.memberPay} className='pay_btn'>去支付</Button>
            </View>
          </View>
        <View className='query_modal'>
          <AtModal isOpened={isOpened}>
            <AtModalContent>
              <View className='title'>
                温馨提示
              </View>
              <View className='online titles'>
                将于
                <Text className='time'>
                  2019.6.6
                </Text>
              </View>
              <View className='titles'>会员商品正式上架</View>
              <View className='titles'>敬请期待</View>
              <View className='con'>
                <Button className='confirm' onClick={this.confirm}>确定</Button>
              </View>
            </AtModalContent>
          </AtModal>
        </View>
      </View>
    )
  }
}

export default Member
