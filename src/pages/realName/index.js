import Taro, { Component } from '@tarojs/taro';
import { View, Input, Image, Form, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { baseUrl } from '../../config/index';
import { getUid, getTelephone, getUserName } from '../../utils/localStorage';
import './index.scss';

@connect(({ realName, loading }) => ({
  ...realName,
  loading: loading.models.realName,
}))
class Realname extends Component {
  config = {
    navigationBarTitleText: '实名认证',
    usingComponents: {
      "am-icon": "../../npm/mini-antui/es/am-icon/index",
    }
  };

  state = {
    validateImage: `${baseUrl}aliPay/user/certification/validateCode?uid=${getUid()}`,
    userName: null,
    smsCode: null,
    mobile: null,
    idcard: null,
    codeKey: null,
    validateCode: null,
    count: 0,
  }

  componentDidMount = () => {

  };

  showToast(title) {
    Taro.showToast({
      title,
      icon: 'none',
      mask: true,
    });
  }

  reloadValidate = () => {
    this.setState({ validateImage: `${baseUrl}aliPay/user/certification/validateCode?uid=${getUid()}&t=${new Date().getTime()}` });
  }

  handleValidateCode = (e) => {
    this.setState({ validateCode: e.detail.value });
  }

  handleMobile = (e) => {
    this.setState({ mobile: e.detail.value });
  }

  submitSmsCode = () => {
    const { dispatch } = this.props
    const { mobile, validateCode } = this.state;
    const newMob = mobile || getTelephone();
    if (!newMob) {
      this.showToast('手机号不能为空');
      return;
    }
    if (!validateCode) {
      this.showToast('图形验证码不能为空');
      return;
    }
    dispatch({
      type: 'realName/sendSmsCode',
      payload: {
        mobile: newMob,
        type: 'realName',
        code: validateCode.toUpperCase(),
        uid: getUid(),
      },
      callback: (res) => {
        this.reloadValidate();
        if (res && res.code) {
          let count = 59;
          this.setState({ count });
          this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
              clearInterval(this.interval);
            }
          }, 1000);
          this.showToast('验证码已发送，5分钟内有效');
        } else {
          this.showToast('图形验证码输入错误，请重新输入');
        }
      },
    });
  }

  formSubmit = (e) => {
    const { userName, idcard, mobile, smsCode } = e.detail.value;
    const { dispatch, codeTime, codeKey } = this.props;
    if (!userName) {
      this.showToast('请输入姓名');
      return;
    }
    if (!idcard || idcard.length !== 18) {
      this.showToast('请输入18位身份证号码');
      return;
    }
    if (!mobile || mobile.length !== 11) {
      this.showToast('请输入正确的手机号');
      return;
    }
    if (!smsCode) {
      this.showToast('请输入短信验证码');
      return;
    }
    dispatch({
      type: 'realName/userCertificationAuth',
      payload: {
        userName, idcard, mobile, smsCode, codeTime, codeKey,
        uid: getUid(),
      },
      callback: () => {
        Taro.navigateBack();
      },
    });
  }



  render() {
    const { loading } = this.props;
    const { validateImage, count } = this.state;
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <Form onSubmit={this.formSubmit}>
        <View className='realName-page'>
          <View className='content'>
            <View className='content-item'>
              <View>姓名</View>
              <Input className='content-item-input' placeholder='请输入姓名' disabled value={getUserName()} name='userName' />
            </View>
            <View className='content-item'>
              <View>身份证</View>
              <Input className='content-item-input' placeholder='请输入18位身份证号' name='idcard' />
            </View>
            <View className='content-item'>
              <View>手机号</View>
              <Input className='content-item-input' placeholder='请输入手机号' value={getTelephone()} name='mobile' onInput={this.handleMobile} />
            </View>
            <View className='content-item'>
              <View>图形验证码</View>
              <View className='content-item-inner' style={{ flexGrow: 1 }}>
                <Input style={{ width: '1.5rem' }} className='content-item-inner-input' placeholder='请输入' onInput={this.handleValidateCode} />
                <Image
                  className='content-item-inner-image'
                  mode='aspectFit'
                  src={validateImage}
                />
                <View onClick={this.reloadValidate}>
                  <am-icon type='reload' size={22} color='#FC766B' />
                </View>
              </View>
            </View>
            <View className='content-item' style={{ borderBottom: 0 }}>
              <View>短信验证码</View>
              <View className='content-item-inner' style={{ flexGrow: 1 }}>
                <Input
                  className='content-item-inner-input'
                  placeholder='请输入短信验证码'
                  name='smsCode'
                />
                {count ? (
                  <View className='content-item-inner-small'>{count}S</View>
                ) :
                  (
                    <View className='content-item-inner-small' onClick={this.submitSmsCode}>短信验证</View>
                  )}
              </View>
            </View>
          </View>
          {/* <View className='forget'>忘记<Text className='forget-text'>服务密码?</Text></View> */}
          <Button className='bottom-button' formType='submit'>提交</Button>
          {/* <View className='bottom-view'>已阅读并同意<Text className='bottom-view-text'>《**用户注册协议》</Text></View> */}
        </View>
      </Form>
    )
  }
}

export default Realname;
