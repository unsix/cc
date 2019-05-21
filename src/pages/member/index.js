import Taro, { Component} from '@tarojs/taro'
import { View,Image,Form, Button} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
//img
import VipYes from  '../../images/member/vip-yes.png'
import VipNo from  '../../images/member/vip-no.png'
@connect(({ mine, member}) => ({
  ...mine,
  ...member
}))
class Member extends Component{
  config = {
    navigationBarTitleText: '会员',
  };

  componentDidMount () {
    const { dispatch } = this.props
      dispatch({
        type:'member/getMember'
      })
  }
  //支付
  memberPay = () => {
    const { dispatch } = this.props
      dispatch({
        type:'member/userMember',
        payload:{
          type: '1'
        }
      })
  }

  render () {
    // console.log(this.props,'99999999999999')
    const { nickName,avatar,memberIfn} = this.props
    return(
      <View className='container container_member'>
        <View className='header'>
          <View className='due_time'>
            至2019 01 25
          </View>
          <View className='avatar'>
            <View className='box'>
              <Image className='box_img' src={avatar}  />
            </View>
            <View className='user_status'>
              <View className="text">
                {nickName}
              </View>
              <View className='icon'>
                 <Image className='icon_img' src={memberIfn&&memberIfn.length!==0?VipYes:VipNo} />
              </View>
            </View>
            {memberIfn&&memberIfn.length===0?
              <View className='text_y'>你当前还不是会员哦</View>
              :
              null
            }
          </View>
          <View className='quota'>
            <View className='quota_text'>
              <Text>免押额度增幅</Text>
              <Text className='number' >+500</Text>
            </View>
            <View className='quota_text'>
              <Text>剩余使用次数</Text>
              <Text className='number' >8次</Text>
            </View>
          </View>
          <View className='tips'>
            <Image className='img' />
          </View>
        </View>
        <View className='center'>
          <View className='member_me'>
            {/*<Image className="img_me" src={VipYes} />*/}
            {/*<Image className="img_money" src={} />*/}
          </View>
        </View>
        <View>

        </View>
        <View></View>
        <View className='pay_member'>
          <View className='subtotal'>
            小计
          </View>
          <View className='price'>
            <Text className='bol'>¥</Text>399
            <View className='agreement'>
              开通即同意《惠租会员协议》
            </View>
          </View>
          <View className='pay'>
            <Button onClick={this.memberPay} className='pay_btn'>去支付</Button>
          </View>
        </View>
      </View>
    )
  }
}

export default Member
