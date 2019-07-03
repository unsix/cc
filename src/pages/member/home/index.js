import Taro, { Component} from '@tarojs/taro'
import { View, Image,  Button, Text, ScrollView } from '@tarojs/components'
import { AtModal, AtModalContent } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './index.scss'
import { formatDate , dateDiff} from '../../../utils/utils'

import CouponList from  '../conponent/memberCouponList/index'
//img
import VipYes from  '../../../images/member/vip-yes.png'
import VipNo from  '../../../images/member/vip-no.png'

import QueryNo from  '../../../images/member/query_no.png'
import QueryYes from  '../../../images/member/query_yes.png'
import ServiceNo from  '../../../images/member/service_no.png'
import ServiceYes from  '../../../images/member/service_yes.png'
import FirstShipNo from  '../../../images/member/first_ship_no.png'
import FirstShipYes from  '../../../images/member/first_ship_yes.png'
import GuardNo from  '../../../images/member/guard_no.png'
import GuardYes from '../../../images/member/guard_yes.png'


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
    isOpened:false,
    tips:true,
    memValue:1,
    price:168,
  }
  componentDidMount () {
    const { dispatch } = this.props;
    // dispatch({
    //   type:'members/getUserMembersEquitiesAllByUid',
    //   // payload: {
    //   //   pageNumber:1,
    //   //   pageSize:1
    //   // }
    //   callback:(data)=>{
    //     if(data &&data.vip){
    //       this.setState({
    //         memValue:0
    //       })
    //     }
    //   }
    // })
    // this.setDispatch();
    const { queryInfo } = this.props;
    this.setDispatch(queryInfo);
  }
  componentDidShow = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'members/fetchAuthCode',
      callback: () => {
        dispatch({
          type:'members/getUserMembersEquitiesAllByUid',
          // payload: {
          //   pageNumber:1,
          //   pageSize:1
          // }
          callback:(data)=>{
            if(data &&data.vip){
              this.setState({
                memValue:0
              })
            }
          }
        })
      },
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    // if (this.props!== nextProps) {
    //   return true;
    // }
    // else if(this.props.memberIfn.vip.wingNumber !== nextProps.memberIfn.vip.wingNumber){
    //   return true;
    // }
    // return true;
  }
  //弹窗
  // details = () => {
  //   this.setState({
  //     isOpened:true
  //   })
  // }
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
  doubt = () => {
    this.setState({
      isOpened:true
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
    const { memValue ,} = this.state
    dispatch({
      type: 'mine/fetchAuthCode',
      callback:()=>{
        dispatch({
          type:'members/userPayMembers',
          payload:{
            rank: memValue
          },
          callback:(type)=>{
            if(type === 'detail'){
              dispatch({
                type:'members/getUserMembersEquitiesAllByUid',
                callback:()=>{
                  Taro.redirectTo({
                    url:`/pages/member/success/index`
                  })
                }
              })
            }
          }
        })
      }
    })
  }
  //关闭温馨提示
  closeTips = ()=>{
    this.setState({
      tips:false
    })
  }
  //账单

  goBill = () => {
    Taro.navigateTo({
      url : '/pages/member/orderExchange/index'
    })
  }
  goCard = () => {
    Taro.navigateTo({
      url : '/pages/coupon/index'
    })
  }
  setDispatch(queryInfo) {
    const { dispatch } = this.props;
    const info = { ...queryInfo };
    dispatch({
      type: 'members/memberCoupon',
      payload: { ...info },
    });
  }

  onScrollToLower = () => {
    const { queryInfo,total} = this.props;
    if(total.length === 0) {
      Taro.showToast({
        title:'没有更多折扣商品了'
      })
      return
    }
      this.setDispatch(queryInfo);
  };
  handleSkuClick = (value) => {

    this.setState(({
      memValue:value
    }))
  }

  //兑换
  exchange = (data) => {
    const { memberIfn } = this.props
    if(memberIfn.vip && memberIfn.vip.wingNumber?memberIfn.vip.wingNumbe:0 < data.integralAmount){
      Taro.showToast({
        title:'账户金豆不足',
        icon:'none'
      })
      return
    }
    console.log(data,'================')
    const { dispatch } = this.props;
    dispatch({
      type:'members/getPlatformMemberCoupon',
      payload:{
        couponInfoId:data.couponInfoId,
        exchangeAmount:1
      },
      callback:(res)=>{
        if(res.code === 1){
          dispatch({
            type:'members/getUserMembersEquitiesAllByUid',
          })
        }
      }
    })
  }
  render () {
    // console.log(this.props,'99999999999999')
    const { nickName, avatar , memberIfn,loading,couponList ,total} = this.props
    const { tips , memValue ,isOpened} = this.state
    console.log(isOpened,'=========')
    // console.log(memValue,'====================')
    // const { isOpened } = this.state
    // const letTime =  data.createTime && formatDate(new Date(data.createTimeStr), 'yyyy-MM-dd hh:mm');
    let dueTime = null
    if(memberIfn.vip && memberIfn.vip.dueTime) {
      dueTime = formatDate(new Date(dateDiff(memberIfn.vip.dueTime)), 'yyyy-MM-dd');
    }
    const systemInfo = Taro.getSystemInfoSync();
    let fixedHeight = 0;
    if (systemInfo.model.indexOf('iPhone X') > -1) {
      fixedHeight = fixedHeight + 30;
    }
    const scrollHeight = Taro.getSystemInfoSync().windowHeight - fixedHeight;
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return(
      <View className='container container_member'>
        <View>
          {tips===true?
            <View className='tips_img' onClick={this.closeTips}>
            </View>
            :null
          }
        </View>
        <View className='header'>
          <View className='person_inf'>
            <View className='doubt' onClick={this.doubt}>
              <Image  className='img' src={require('../../../images/member/doubt.png')} />
            </View>
            <View className='inf'>
              <View className='avatar'>
                <Image className='img' src={avatar} />
              </View>
              <View className='name'>
                <View className='name_text'>{nickName}</View>
                <View className='text'>
                  <Image className='img' src={memberIfn &&  memberIfn.vip &&  memberIfn.status!==1 ?VipYes:VipNo} />
                  {
                    memberIfn &&  memberIfn.vip &&  memberIfn.status!==1?
                      (  <View className='user'>会员用户</View>)
                      :
                      (  <View className='user'>普通用户</View>)
                  }
                </View>
              </View>
              {
                memberIfn &&  memberIfn.vip &&  memberIfn.status!==1?
                  (
                    <View className='time'>
                      有效期
                      <Text className='text'>
                        {dueTime}
                      </Text>
                    </View>
                  ):null
              }

            </View>
            <View className='have'>
              <View className='bean'>
                <View className='text'>
                  <View className='text-left'>
                    <Image className='img' src={require('../../../images/member/beans.png')} />
                  </View>
                  <Text className='word'>金豆</Text>
                </View>
                <View className='text'>
                  <View  className='text-left'>
                    <View className='num'>{memberIfn.vip.wingNumber? memberIfn.vip.wingNumber:'0'}</View>
                  </View>
                  <View className='word'>账户</View>
                </View>
              </View>
              <View className='bill' onClick={this.goBill}>
                <Image className='img' src={require('../../../images/member/bill.png')} />
                <View  className='text'>
                  账单
                </View>
              </View>
              <View className='card' onClick={this.goCard}>
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
            <View className='title price_img'>
              <Image className='img' src={require('../../../images/member/member_price.png')} />
            </View>
            <View className='opt_price' >
              {
                memberIfn &&  memberIfn.vip &&  memberIfn.status!==1?
                  (

                      memberIfn.settingList && !!memberIfn.settingList.length && memberIfn.settingList.map(item=>(
                        <View
                          // onClick={this.handleSkuClick.bind(this, value.id, currentSku.values[i].id)}
                          className={`item_opt ${item.id === memValue && 'item_active'}`}
                          // className={item.id === memValue?'item_opt':'item_active'}
                          // className='item-opt'
                          key={item.id}
                          onClick={this.handleSkuClick.bind(this,item.id)}
                        >
                          <View className='num'>¥<Text className='text'>{item.rechargeAmount}</Text></View>
                          <View className='time'>会员期
                            {item.validityDay}
                            个月
                          </View>
                        </View>
                      ))
                  )
                  :
                  (
                      memberIfn.settingList && !!memberIfn.settingList.length && memberIfn.settingList.map(item=>(
                        <View
                          // onClick={this.handleSkuClick.bind(this, value.id, currentSku.values[i].id)}
                          className={`item_opt ${item.id === memValue && 'item_active'}`}
                          // className={item.id === memValue?'item_opt':'item_active'}
                          // className='item-opt'
                          key={item.id}
                          onClick={this.handleSkuClick.bind(this,item.id)}
                        >
                          <View className='num'>¥<Text className='text'>{item.rechargeAmount}</Text></View>
                          <View className='time'>会员期
                            {item.validityDay}
                            个月
                          </View>
                        </View>
                      ))
                  )
              }
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
                    <Image className='img_1 img' src='http://oss.huizustore.com/6a5dfb28328b412d96150ad2e1c7362f.png' />
                  </View>
                  <View className='word'>
                    <View>获得租金豆</View>
                    <View className='bold'>
                      {memberIfn.settingList[memValue-1].wingNumber?memberIfn.settingList[memValue-1].wingNumber:300000}
                      金豆≈{memberIfn.settingList[memValue-1].wingNumber/100?memberIfn.settingList[memValue-1].wingNumber/100:3000}元
                    </View>
                    <View className='shallow'>金豆当钱花</View>
                  </View>
                </View>
              </View>
              <View className='sive'>
                <View className='text'>
                  <View>
                    <Image className='img_2 img' src='http://oss.huizustore.com/e72e849058b14cb9aa9d51e8bdb2f93b.png' />
                  </View>
                  <View className='word'>
                    <View>免押额度增加</View>
                    <View className='bold'>
                      {memberIfn.settingList[memValue-1].depositReduction?memberIfn.settingList[memValue-1].depositReduction:5376}元
                    </View>
                    <View className='shallow'>总额度增加
                      {/*{memberIfn.settingList[memValue-1].depositReduction?memberIfn.settingList[memValue-1].depositReduction:}元*/}
                    </View>
                  </View>
                </View>
              </View>
              <View className='sive'>
                <View className='text'>
                  <View>
                    <Image className='img_3 img' src='http://oss.huizustore.com/d66ebdd64eb64f5fb406d9a7a7d638b5.png' />
                  </View>
                  <View className='word'>
                    <View>全程折扣</View>
                    <View className='bold'>
                      {memberIfn.discout}折起
                      {/*{memberIfn.settingList[memValue-1].memberDiscount/10?memberIfn.settingList[memValue-1].memberDiscount/10:9.5}折起*/}
                    </View>
                    <View className='shallow'>全场商品享折扣</View>
                  </View>
                </View>
              </View>
              <View className='sive'>
                <View className='text'>
                  <View>
                    <Image className='img_4 img' src={require('../../../images/member/ship_exc.png')} />
                  </View>
                  <View className='word'>
                    <View>包邮卷</View>
                    <View className='bold'>
                      {memberIfn.settingList[memValue-1].packageNumber?memberIfn.settingList[memValue-1].packageNumber:30}次
                    </View>
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
                {/*{memberIfn.settingList[memValue-1].isReport === 1?*/}

                {/*}*/}
                <View>
                  <Image className='img' src={ memberIfn.settingList[memValue-1].isReport === 1 ? QueryYes: QueryNo} />
                </View>
                <View>赠风控查询</View>
              </View>
              <View className='item-content'>
                <View>
                  <Image className='img' src={ memberIfn.settingList[memValue-1].isService === 1 ? ServiceYes: ServiceNo} />
                </View>
                <View>专属客服</View>
              </View>
              <View className='item-content'>
                <View>
                  <Image className='img' src={ memberIfn.settingList[memValue-1].isShipping === 1 ? FirstShipYes : FirstShipNo} />
                </View>
                <View>优先发货</View>
              </View>
              <View className='item-content'>
                <View>
                  <Image className='img' src={ memberIfn.settingList[memValue-1].isProtect === 1 ? GuardYes: GuardNo} />
                </View>
                <View>信用守护</View>
              </View>
            </View>
          </View>
        </View>
        {/*<CouponList*/}
        <View className='member_shop'>
          <View className='shop'>
            <View className='title'>
              会员商城
            </View>
            <ScrollView
              className='scroll-view'
              scrollY
              scrollWithAnimation
              scrollTop='0'
              style={`height: ${scrollHeight}px;`}
              // style={`height: 1px;`}
              onScrollToLower={this.onScrollToLower}
            >
              {!!couponList && !!couponList.length && couponList.map(coupon =>
                <CouponList
                  key={coupon.couponInfoId}
                  type='red'
                  data={coupon}
                  onClick={this.exchange}
                />
              )}
              {
                total.length === 0 ?
                  (<View className='no-more'>更多商品上架中</View>):null
              }
            </ScrollView>
          </View>
        </View>
        {
          memValue!==0?
            (
              <View className='pay_member'>
                <View className='subtotal'>
                  小计
                </View>
                <View className='price'>
                  <Text className='bol'>¥</Text>{ memberIfn.settingList[memValue-1].rechargeAmount}
                  <Text className='nian'>（{memberIfn.settingList[memValue-1].validityDay}个月）</Text>
                  <View className='agreement' onClick={this.ment}>
                    开通即同意《惠租会员协议》
                  </View>
                </View>
                <View className='pay'>
                  <Button onClick={this.memberPay} className='pay_btn'>去支付</Button>
                </View>
              </View>
            ):null
        }
        {/*<View className='pay_member'>*/}
        {/*    <View className='subtotal'>*/}
        {/*      小计*/}
        {/*    </View>*/}
        {/*    <View className='price'>*/}
        {/*      <Text className='bol'>¥</Text>{ memberIfn.settingList[memValue-1].rechargeAmount}*/}
        {/*      <Text className='nian'>（{memberIfn.settingList[memValue-1].validityDay}个月）</Text>*/}
        {/*      <View className='agreement' onClick={this.ment}>*/}
        {/*        开通即同意《惠租会员协议》*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*    <View className='pay'>*/}
        {/*      <Button onClick={this.memberPay} className='pay_btn'>去支付</Button>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        <View className='query_modal'>
          <AtModal isOpened={isOpened}>
            <AtModalContent>
              <View className='title'>
                会员说明
              </View>
              <View className='online titles'>
                1、购买会员并不保证一定免押金，为了最佳体验，建议芝麻信用600分以上且网络信用良好者购买（无过多网络信贷，且无网上逾期行为）。芝麻分对应免押额说明如下：600分-免1500  650分-免5000 700分-有机会全免
              </View>
              <View className='online titles'>
                2、惠租会员购买后立即生效，享受会员权益
              </View>
              <View className='online titles'>
                3、会员自购买后可续费购买，续费购买后，会员期限叠加生效，折扣权益不叠加，免押额度增加取最大，包邮次数及租金豆叠加，风控查询不叠加
              </View>
              <View className='online titles'>
                4、会员有效期内，如遇到任何问题，可拨打平台电话：15158129875
              </View>
              <View className='online titles'>
                5、会员购买后不支持退款，请仔细阅读会员说明和协议
              </View>
              <View className='online titles'>
                6、会员商城唯一消费货币为金豆，金豆永久有效
              </View>
              <View className='online titles'>
                7、购买会员会赠送相应金豆
              </View>
              <View className='online titles'>
                8、会员用户将获得租金折扣权益，会员期间生效
              </View>
              <View className='online titles'>
                9、会员用户将获得包邮券，包邮券为回寄包邮券，非寄送包邮券。包邮券不会自动核销，使用前请务必联系平台：15158129875
              </View>
              <View className='online titles'>
                10、包邮券会员期间有效，会员到期后，会自动失效
              </View>
              <View className='online titles'>
                11、部分会员用户将获得赠送的风控报告查询，进入卡包-风控查询卡，即可查得
              </View>
              <View className='online titles'>
                12、风控查询自会员开通后30天有效
              </View>
              <View className='con'>
                <Button className='confirm' onClick={this.confirm}>关闭</Button>
              </View>
              <View className='close' onClick={this.confirm}>
                <Image className='img' src={require('../../../images/member/close.png')} />
              </View>
            </AtModalContent>
          </AtModal>
        </View>
      </View>
    )
  }
}

export default Member
