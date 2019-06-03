import Taro, { Component} from '@tarojs/taro'
import { View, Image, Form, Swiper, SwiperItem, Button, Text } from '@tarojs/components'
import { AtModal,  AtModalContent } from 'taro-ui';
import { connect } from '@tarojs/redux'
import './index.scss'
import {formatStrDate} from '../../utils/utils'
//img
// import VipYes from  '../../images/member/vip-yes.png'
// import VipNo from  '../../images/member/vip-no.png'
// import Tz from '../../images/member/0000.png'
// import Tone from '../../images/member/1111.png'
// import Ttwo from '../../images/member/2222.png'
// import Tthree from '../../images/member/3333.png'
// import Tfour from '../../images/member/4444.png'
// import Tfive from '../../images/member/5555.png'
// import More from '../../images/member/member_more.png'

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
    const { nickName,avatar,memberIfn,loading} = this.props
    const { isOpened } = this.state
    let date = null
    // const date = memberIfn.userMembers &&  formatDate(new Date(memberIfn.userMembers[0].dueTime), 'yyyy年MM月dd')
    if (memberIfn.userMembers && !!memberIfn.userMembers.length) {
       date = `${formatStrDate(memberIfn.userMembers[0].dueTime, 'yyyy-MM-dd')}`
    }
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return(
      <View className='container container_member'>
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
