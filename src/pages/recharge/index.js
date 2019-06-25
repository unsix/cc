import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button, Form, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import './index.scss';
import { AtModal } from 'taro-ui'
import { customerServiceTel } from '../../assets/Constant'

@connect(({ recharge, loading }) => ({
  ...recharge,
  loading: loading.models.recharge,
}))
class Realname extends Component {
  config = {
    navigationBarTitleText: '押金充值',
    usingComponents: {
      "modal": "../../npm/mini-antui/es/modal/index"
    }
  };

  state = {
   isOpened:false,
   showServicePhone: false,
  }

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch({
      type:'recharge/getUserDepositByUid'
    })
  };

  showToast(title) {
    Taro.showToast({
      title,
      icon: 'none',
      mask: true,
    });
  }

  //联系客服弹窗
  onClosePhoneModal = () => {
    this.setState({ showServicePhone: false });
  }
  //客服
  connectService = (number) => {
    let num = String(number);
    my.makePhoneCall({ number:num });
  }
  pay = (type) => {
    if (type === 'pay'){
      this.setState({
        isOpened:true
      })
    }
    else {
      this.setState({
        showServicePhone:true
      })
    }
  }

  close = () =>{
    this.setState({
      isOpened:false
    })
  }

  deposit = () => {
    Taro.navigateTo({
      url:'/pages/deposit/index'
    })
  }
  formSubmit = (e) => {
    const { number, remark} = e.detail.value;
    const { dispatch } = this.props
    if(number<=0){
      this.showToast('充值金额不能少于1')
      return
    }
    dispatch({
      type:'recharge/preAliPay',
      payload:{
        amount:number,
        userRemark:remark
      },
      callback:(type)=>{
        if (type === 'suc') {
          dispatch({
            type:'recharge/getUserDepositByUid'
          })
          this.setState({
            isOpened:false
          })
        }
      }
    })
  }

  render() {
    const { loading ,number} = this.props;
    const { isOpened ,showServicePhone} = this.state
    console.log(this.state)
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='container_recharge'>
        <View className='header'>
          <View className='title'>余额账户(元)</View>
          <View className='num'>{ number?number:'0.00' }</View>
          <View className='definite' onClick={this.deposit}>明细</View>
        </View>
        <View className='content'>
          <View className='item' onClick={this.pay.bind(this,'pay')}>
            <View>
              <Image className='img' src='http://oss.huizustore.com/fefdd34630a949259626c9379c44bf59.png' />
            </View>
            <View className='text' >充值</View>
            <View className='text-go'> > </View>
          </View>
          <View className='item'  onClick={this.pay.bind(this,'withdrawal')} >
            <View>
              <Image className='img' src='http://oss.huizustore.com/1b3e15de139543f4b0368fc79087f0ac.png' />
            </View>
            <View className='text'>提现</View>
            <View className='text-go'> > </View>
          </View>
        </View>
        <View className='query_modal'>
          <AtModal isOpened={isOpened}>
            {/*<AtModalContent>*/}
              <View className='title'>
                充值金额
              </View>
              <Form className='form' onSubmit={this.formSubmit}>
                <View>
                  <Input type='number'  onkeyup="value=value.replace(/[^\d]/g,'')" className='content-item-input' placeholder='请输入充值金额'  placeholderStyle='color:#FC766B'  name='number' />
                </View>
                <View>
                  <Input type='text' className='content-item-input' placeholder='备注(选填)'  placeholderStyle='color:#666'  name='remark' />
                </View>
                <View className='con'>
                  <Button className='confirm' formType='submit'>确定</Button>
                </View>
              </Form>
              <View className='close' onClick={this.close}>
                <Image className='img' src={require('../../images/member/close.png')} />
              </View>
            {/*</AtModalContent>*/}
          </AtModal>
        </View>
        <modal
          show={showServicePhone}
          showClose={false}
          onModalClick={this.onClosePhoneModal}
          onModalClose={this.onClosePhoneModal}
        >
          <View slot='header'>提现请联系客服</View>
          <View style={{ textAlign: 'left', paddingLeft: '15px',marginBottom: '10px',marginTop: '10px' }}>平台客服：<Text style={{ color: '#51A0F9' }} onClick={this.connectService.bind(this,customerServiceTel )}>{customerServiceTel}</Text></View>
          <View style={{ textAlign: 'left', paddingLeft: '15px' }}>工作时间：<Text style={{ color: '#777' }} >10:30 - 19:30</Text></View>
          <View slot='footer'>取消拨打</View>
        </modal>
      </View>
    )
  }
}

export default Realname;
