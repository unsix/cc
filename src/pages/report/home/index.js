import Taro, { Component } from '@tarojs/taro';
import { View,Text,Image,Input, Button,Form} from '@tarojs/components';
import {  AtCheckbox,AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';
import { blankSpace} from '../../../utils/utils'
import { getUid ,getBuyerId} from '../../../utils/localStorage';
import { connect } from '@tarojs/redux'
import {reportUrl} from  '../../../config'
import '../enty.scss';
import './index.scss'
import Name from '../../../images/report/name.png'
import Idcard from '../../../images/report/idcard.png'
import Phone from '../../../images/report/phone.png'
import Com from  '../../../images/report/comprehensive.png'
import Erro from  '../../../images/report/erro.png'
import Grade from  '../../../images/report/grade.png'
import { customerServiceTel } from '../../../assets/Constant'
import BackHome from  '../../../images/report/backHome.png'

@connect(({ reportHome}) => ({
  ...reportHome,
}))

class  Index extends Component{
  config = {
    navigationBarTitleText: '洞察报告',

  };
  constructor () {
    super(...arguments)
    this.state = {
      isOpened:false,
      checkedList: ['list1'],
      validateCode:"",
      names:"",
      idCards:"",
      phones:"",
      code:'',
      name:'',
      phone:'',
      idCord:''


    }
    this.checkboxOption = [{
      value: 'list1',
      // label: '我已阅读并同意《洞察报告用户协议》',
    },]
  }
  componentDidMount(){

    // this.props.dispatch({
    //   type: 'reportHome/fetchProductDetail',
    //   payload: { itemId:'1557400218783' },
    // });
  }
  handleChange (value) {
    this.setState({
      checkedList: value
    })
  }
  repeatCode = () =>{

  }
  submits = () => {
    this.setState({
      isOpened:true
    })
  }
  backHome =()=>{
    Taro.switchTab({ url: '/pages/home/index' })
  }
  formSubmit = (e) => {
    const { name,idCord,phone} = e.detail.value;
    this.setState({
      names:blankSpace(name),
      idCards:blankSpace(idCord),
      phones:blankSpace(phone),
    })
      this.props.dispatch({
        type:'reportHome/checkParams',
        payload: {
          userName:blankSpace(name),
          phone:blankSpace(phone),
          idCardNo:blankSpace(idCord),
        },
        callback:(res)=>{
          console.log(11111)
          if(res.code === 1){
            this.setState({
              isOpened:true
            })
          }
        }
      })
  }

  connectService = (number) => {
    let num = String(number);
    my.makePhoneCall({ number:num });
  }
  switch = () => {
    Taro.navigateTo({ url: '/pages/report/presentation/index' });
  }
  //支付
  pay = () => {
    // let  obj = getQueryString(window.location.href)
    // console.log(obj.type,'type type type ')
    const {names,phones,idCards} = this.state
    // Taro.redirectTo({
    //   url: `/pages/pay/index?userName=${names}&phone=${phones}&idCardNo=${idCards}&type=${obj.type}`
    // })
    this.props.dispatch({
      type:'reportHome/reportPay',
      payload: {
        userName: names,
        phone:phones,
        idCardNo: idCards,
        buyerId:getUid(),
        aliUserId:getBuyerId(),
        type:'3'
      },
      callback: (orderId, type) => {
        if (type === 'detail') {
          Taro.redirectTo({ url: `/pages/report/report_results/index?tradeNo=${orderId}` });
        } else {
          Taro.redirectTo({ url: '/pages/report/home/index' });

        }
      },
    })
    // my.httpRequest({
    //   url: reportUrl+'user/aliPay/preForAppPay',//须加httpRequest域白名单
    //   method: 'POST',
    //   data: {//data里的key、value是开发者自定义的
    //    userName: names,
    //    phone:phones,
    //    idCardNo: idCards,
    //    buyerId:getUid(),
    //    aliUserId:getBuyerId(),
    //    type:'3'
    //   },
    //   dataType: 'json',
    //   success: function(res) {
    //     console.log(res),
    //     my.tradePay({//调起支付页面
    //       tradeNO: res.data.orderNo,
    //       success: function(res) {
    //         my.alert(res.resultCode);
    //       },
    //       fail: function(res) {
    //         my.alert(res.resultCode,'213123123');
    //       },
    //     });
    //   },
    //   fail: function(res) {
    //     my.alert({content: 'fail'});
    //   },
    //   complete: function(res) {
    //     my.hideLoading();
    //   }
    // });
  }
  //协议
  read = () =>{
    Taro.navigateTo({ url: '/pages/report/read/index' });
  }
  // config = {
  //   navigationBarTitleText: '新人领券',
  // };
  //案例页
  case = () => {
    Taro.navigateTo({ url: '/pages/report/report_case/index' });
  }

  render(){
    const {code} = this.props
    const {isOpened} = this.state
    return(
      <View id='apps' className='container_enty container_index'>
        <View id='pay'></View>
        <View className='top_dec'>
          <View className='text text_up'>
            覆盖全国90%以上的大数据
          </View>
          <View className='text text_down'>
            30秒查清不通过原因
            <Text className='text_after'>早查早知道，及时积累优化</Text>
          </View>
        </View>
        <Form onSubmit={this.formSubmit}>
          <View className='content'>
          <view className='name'>
            <View className='icon'>
              <Image className='name_img' src={Name} />
            </View>
            <View className='text'>
              <Input
                name='name'
                type='text'
                className='name_input'
                placeholder='真实姓名'
              />
            </View>
          </view>
          <view className='name'>
            <View className='icon'>
              <Image className='id_img' src={Idcard} />
            </View>
            <View className='text'>
              <Input
                name='idCord'
                type='text'
                className='name_input'
                placeholder='身份证号'
              />
            </View>
          </view>
          <view className='name'>
            <View className='icon'>
              <Image className='phone_img' src={Phone} />
            </View>
            <View className='text'>
              <Input
                name='phone'
                type='number'
                className='name_input'
                placeholder='手机号'
              />
            </View>
          </view>
          {/*<view className='code'>*/}
          {/*  <View className='text'>*/}
          {/*    <Input*/}
          {/*      name='code'*/}
          {/*      type='number'*/}
          {/*      className='code_input'*/}
          {/*      placeholder='请输入验证码'*/}
          {/*    />*/}
          {/*  </View>*/}
          {/*  <View className='code_img'>*/}
          {/*      <Image onClick={this.repeatCode} className='code_number' src={code} />*/}
          {/*  </View>*/}
          {/*</view>*/}
          <View className='checkbox'>
            <View>
              <AtCheckbox
                options={this.checkboxOption}
                selectedList={this.state.checkedList}
                onChange={this.handleChange.bind(this)}
              />
            </View>
            <View className='user_ment'>
              <Text onClick={this.read}>
                我已阅读并同意《洞察报告用户协议》
              </Text>
            </View>
          </View>
          <View className='query_btn'>
            <Button type='primary' size='normal'  formType='submit' >立即查询</Button>
          </View>
          <View className='switch'>
            <Text onClick={this.switch}>
              已有报告，报告编号入口 >
            </Text>
          </View>
            <View className='about_inf'>
              <Text   className='contact_service' >
                <View style={{ textAlign: 'left', paddingLeft: '15px' }}>平台客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectService.bind(this,customerServiceTel )}>{customerServiceTel}</Text></View>
              </Text>
              <Text className='report_case' onClick={this.case}>报告案例</Text>
            </View>
          {/*  <View className='contact_service' onClick={this.case}>报告案例</View>*/}
          {/*<View className='report_case' onClick={this.case}>报告案例</View>*/}
        </View>
        </Form>
        <View className='query_modal'>
          <AtModal isOpened={isOpened}>
            <AtModalHeader>
              <View className='header_text'>
                洞察报告可以做到？
              </View>
            </AtModalHeader>
            <AtModalContent>
              <View className='inf'>
                <View className='inf_content'>
                  <View className='img'>
                    <Image className='inf_com' src={Com} />
                  </View>
                  <Text className='inf_text'>综合评估分</Text>
                </View>
              </View>
              <View className='inf'>
                <View className='inf_content'>
                  <View className='img'>
                    <Image  className='inf_erro' src={Erro} />
                  </View>
                  <Text className='inf_text'>风险险情</Text>
                </View>
              </View>
              <View className='inf'>
                <View className='inf_content'>
                  <View className='img'>
                    <Image className='inf_grade' src={Grade} />
                  </View>
                  <Text className='inf_text'>风险等级</Text>
                </View>
                <View>
                  <Text className='inf_mark'>（黑名单，案件，逾期等）</Text>
                </View>
              </View>
            </AtModalContent>
            <AtModalAction>
              <View className='pay'>
                <View className='dec_pay'>
                  限时特价¥
                  <Text className='money'>
                    9.9/次
                  </Text>
                  <View className='primary'><s>原价：49.9/次</s></View>
                </View>
                <View className='pay_submit'>
                  <Button  className='pay_btn' onClick={this.pay}>立即支付</Button>
                </View>
              </View>
            </AtModalAction>
          </AtModal>
        </View>
        <View className='back'>
          <Image className='img' onClick={this.backHome} src={BackHome} />
        </View>
      </View>
    )
  }
}
export default Index

