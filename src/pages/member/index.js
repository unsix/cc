import Taro, { Component} from '@tarojs/taro'
import { View,Image,Form, Button} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { formatStrDate } from '../../utils/utils';
import './index.scss'
//img
import VipYes from  '../../images/member/vip-yes.png'
import VipNo from  '../../images/member/vip-no.png'
import Tone from '../../images/member/5555.png'
import Equity from '../../images/member/equity.png'
import EquPrice from '../../images/member/member_price.png'
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
            {memberIfn&&memberIfn.userMembers && memberIfn.userMembers.length === 0?
              <View className='text_y'>你当前还不是会员哦</View>
              :
              null
            }
            {/*{*/}
            {/*  memberIfn&&memberIfn.userMembers && memberIfn.userMembers.length > 0?*/}
            {/*    (<View className='mem_time'>*/}
            {/*      会员有效期至`${formatStrDate(memberIfn.userMembers[0].dueTime, 'yyyy.MM.dd')}`*/}
            {/*    </View>):null*/}
            {/*}*/}
            <View  className='mem_time'>
              会员有效期至2019-01-25
            </View>
          </View>
          {/*<View className='quota'>*/}
          {/*  <View className='quota_text'>*/}
          {/*    <Text>免押额度增幅</Text>*/}
          {/*    <Text className='number' >+500</Text>*/}
          {/*  </View>*/}
          {/*  <View className='quota_text'>*/}
          {/*    <Text>剩余使用次数</Text>*/}
          {/*    <Text className='number' >8次</Text>*/}
          {/*  </View>*/}
          {/*</View>*/}
          {/*<View className='tips'>*/}
          {/*  <Image className='img' />*/}
          {/*</View>*/}
          <View className='make_times'>
            <View className='title'>会员商品任意用</View>
            <View className='member_t'>
              <View className='times_img'>
                <Image className='img' src={Tone} />
              </View>
              <View className='times'>
                <View>剩余使用次数</View>
                <View className='num'>5/5次</View>
              </View>
            </View>
          </View>
        </View>
        <View className='member_equity'>
          <View className='equity_text'>我的会员权益</View>
          <Image className='img_eq' src={Equity} />
          <View>
            <Image className='img_price' src={EquPrice} />
            <View className=''></View>
          </View>
          {/*<View className='member_price'>*/}
          {/*  <Image className='img_price' src={MemberPrice} />*/}
          {/*</View>*/}
        </View>
        <View className='center'>
          <View className='member_me'>
            {/*<Image className="img_me" src={VipYes} />*/}
            {/*<Image className="img_money" src={} />*/}
          </View>
        </View>
        <View>

        </View>
        <View className='member_shop'>
          <View className='title'>
            <View className='shop_text'>会员商城</View>
          </View>
          <View>
            <View>
              <View className='banner_shop'>
                <Image className='img' src={require('../../images/member/banner_1.png')} />
              </View>
              <View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_1.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_2.png')} />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_3.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_4.png')} />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View className='banner_shop'>
                <Image className='img' src={require('../../images/member/banner_2.png')} />
              </View>
              <View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_5.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_6.png')} />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_7.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_8.png')} />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_9.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_10.png')} />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View className='banner_shop'>
                <Image className='img' src={require('../../images/member/banner_3.png')} />
              </View>
              <View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_11.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_12.png')} />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_13.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_14.png')} />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_15.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_16.png')} />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View className='banner_shop'>
                <Image className='img' src={require('../../images/member/banner_4.png')} />
              </View>
              <View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_17.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_18.png')} />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_19.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_20.png')} />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_21.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_22.png')} />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View className='banner_shop'>
                <Image className='img' src={require('../../images/member/banner_5.png')} />
              </View>
              <View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_21.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_22.png')} />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src={require('../../images/member/goods_23.png')} />
                  </View>
                  <View>
                    <Image className='img' src={require('../../images/member/goods_24.png')} />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className='bottom_img'>
            <Image className='img' src={require('../../images/member/bottom_img.png')} />
          </View>
        </View>
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
