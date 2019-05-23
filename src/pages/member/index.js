import Taro, { Component} from '@tarojs/taro'
import { View, Image, Form,Swiper, SwiperItem, Button} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
//img
import VipYes from  '../../images/member/vip-yes.png'
import VipNo from  '../../images/member/vip-no.png'
import Tz from '../../images/member/0000.png'
import Tone from '../../images/member/1111.png'
import Ttwo from '../../images/member/2222.png'
import Tthree from '../../images/member/3333.png'
import Tfour from '../../images/member/4444.png'
import Tfive from '../../images/member/5555.png'
import Equity from '../../images/member/equity.png'
import EquPrice from '../../images/member/member_price.png'
import MemTip from '../../images/member/mem_tips.png'
import BannerOne from '../../images/member/banner_1.png'
import More from '../../images/member/member_more.png'
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
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.memberIfn.userMembers !== nextProps.memberIfn.userMembers) {
      return true;
    }
    return true;
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
        type:'member/userMember',
        payload:{
          type: '1'
        },
        callback:()=>{
          dispatch({
            type:'member/getMember'
          })
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
                 <Image className='icon_img' src={memberIfn&&memberIfn.userMembers && !!memberIfn.userMembers.length?VipYes:VipNo} />
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
            {memberIfn&&memberIfn.userMembers && !!memberIfn.userMembers.length?
              ( <View  className='mem_time'>
                会员有效期至2019-01-25
              </View>
              ):null
            }

          </View>
          <View className='make_times'>
            <View className='title'>会员商品任意用</View>
            <View className='member_t'>
              <View className='times_img'>
                {memberIfn&&memberIfn.totalNumber&&memberIfn.totalNumber===0?
                  (<Image className='img' src={Tz} />):null
                }
                {memberIfn&&memberIfn.totalNumber&&memberIfn.totalNumber===1?
                  (<Image className='img' src={Tone} />):null
                }
                {memberIfn&&memberIfn.totalNumber&&memberIfn.totalNumber===2?
                  (<Image className='img' src={Ttwo} />):null
                }
                {memberIfn&&memberIfn.totalNumber&&memberIfn.totalNumber===3?
                  (<Image className='img' src={Tthree} />):null
                }
                {memberIfn&&memberIfn.totalNumber&&memberIfn.totalNumber===4?
                  (<Image className='img' src={Tfour} />):null
                }
                {memberIfn&&memberIfn.totalNumber&&memberIfn.totalNumber===5?
                  (<Image className='img' src={Tfive} />):null
                }
              </View>
              <View className='times'>
                <View>剩余使用次数</View>
                <View className='num'>5/5次</View>
              </View>
            </View>
          </View>
        </View>
        <View className='tips'>
          <View className='text'>
            <View>温馨提示</View>
          </View>
          <View>
            <Image className='img' src={MemTip} />
          </View>
        </View>
        <View className='member_equity'>
          <View className='equity_text'>我的会员权益</View>
          <Image className='img_eq' src={Equity} />
          <View>
            <Image className='img_price' src={EquPrice} />
            <View className=''></View>
          </View>
          <View className='member_price_b'>
          </View>
        </View>
        <View className='center'>
          <View className='member_me'>
            {/*<Image className="img_me" src={VipYes} />*/}
            {/*<Image className="img_money" src={} />*/}
          </View>
        </View>
        <View className='member_banner'>
          <Swiper
            className="swiper-container"
            circular
            indicatorDots
            indicatorColor='#999'
            indicatorActiveColor='#bf708f'
            autoplay
          >
            {/*{ banner.map((item, index) => (*/}
            {/*<SwiperItem key={banner.id}>*/}
            {/*  <View className='banner' onClick={this.onGoTo.bind(this,banner.jumpUrl)}>*/}
            {/*    <Image className='swiper-img' mode='aspectFit' src={banner.imgUrl} />*/}
            {/*  </View>*/}
            {/*</SwiperItem>*/}
            {/*))}*/}
            <SwiperItem key='1' >
              <View className='banner'>
                <Image className="swiper-img" mode="widthFix" src={BannerOne} onClick={this.toReport}></Image>
              </View>
            </SwiperItem>
          </Swiper>
        </View>
        <View className='member_shop'>
          <View className='top'>
            <View className='title'>
              <View className='shop_text'>会员商城</View>
              <View>
                <Image className='img' src={More} />
              </View>
            </View>
          </View>
          <View>
            <View>
              <View className='banner_shop'>
                <Image className='img' src='http://oss.huizustore.com/b1f1113f6553457cbd60caaf96926acd.png'  />
              </View>
              <View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/7f9f2fadb8d94e08abfcca60952c8089.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/fd68ddd6b81d47f2867311f25fc72a0a.png' />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/85b6f7558b104a1596d63b8b3b7962bc.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/a68d130d99784f1188ca7f6c9b558b33.png' />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View className='banner_shop'>
                <Image className='img' src='http://oss.huizustore.com/d2f90b7674474cf4bd36cd208ed75672.png' />
              </View>
              <View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/c14d7f93c63d4768a0997e21c9342a79.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/ea994efa3c784cf2a6f38626b9625941.png' />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/9b9549bbd84c4dee9c28a6ff2e9ec53d.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/321d7a2e244d4b3483537433d10774a5.png' />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/10888dc49a2c4cd6a04010d0b5a53283.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/e8977a968ac94e688208771eca294322.png' />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View className='banner_shop'>
                <Image className='img' src='http://oss.huizustore.com/2d8f7a0366ca4d0aa97c1e13d45cc7c8.png' />
              </View>
              <View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/9324063c36e44f79957abf50eea8b280.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/8835b887d7c3453f939741a1fb364b7c.png' />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/a046a8b05224492f88d777224869008e.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/2acb8a46a7f94479b97fa5b868602544.png' />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/ddeed113e5234fcdb7200e4b3d7750cd.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/94fd0ee2f6a44f61bb2521e7a1b89b1a.png' />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View className='banner_shop'>
                <Image className='img' src='http://oss.huizustore.com/2d8f7a0366ca4d0aa97c1e13d45cc7c8.png' />
              </View>
              <View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/22bc8e4effa2419486ebae4cc3da0628.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/b71680e8adca4758bf9d63638eb5bd65.png' />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/3a356ac257e74e11b1f8f37394d260c0.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/735b3aef70ca4b6d811e07202794ae43.png' />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/c49d810d0fea4d7f9b13407bcd6ca5f7.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/6d3fe7b4a7304494955966f6602adadd.png' />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View className='banner_shop'>
                <Image className='img' src='http://oss.huizustore.com/7977b5dfb63245e5875e67ce24a1602b.png' />
              </View>
              <View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/1ff9b6ab4b92445ab38d70a36a0539a0.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/550e61c451f44c1baa889eebe98b3d12.png' />
                  </View>
                </View>
                <View className='goods_img'>
                  <View >
                    <Image className='img' src='http://oss.huizustore.com/f65c11e1a24c4b19af402ebd14c11775.png' />
                  </View>
                  <View>
                    <Image className='img' src='http://oss.huizustore.com/db784657431f427bac927fa5bfcf774a.png'/>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className='bottom_img'>
            <Image className='img' src={require('../../images/member/bottom_img.png')} />
          </View>
        </View>
        {memberIfn&&memberIfn.userMembers && memberIfn.userMembers.length === 0?
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
          :
          null
        }
      </View>
    )
  }
}

export default Member
