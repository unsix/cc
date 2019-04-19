import Taro, { Component } from '@tarojs/taro';
import { View, Input, Textarea, Form, Button, Switch } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import addressList from '../../assets/address.json';
import citys from '../../assets/citysJson';
import './index.scss';


@connect(({ addAddress, loading }) => ({
  ...addAddress,
  loading: loading.models.addAddress,
}))
class Addaddress extends Component {
  config = {
    navigationBarTitleText: '设置地址',
    usingComponents: {
      "am-icon": "../../npm/mini-antui/es/am-icon/index",
      "notice": "../../npm/mini-antui/es/notice/index"
    }
  };

  state = {
    currentAddress: [], 
    isshow:true,
    marquee:{loop: true, leading: 2000, trailing: 100, fps: 18 }
  }

  componentDidMount = () => {
    const { id } = this.$router.params;
    const { dispatch } = this.props;
    if (id) {
      dispatch({
        type: 'addAddress/fetchAddress',
        payload: { id },
        callback: (data) => {
          const currentAddress = [
            { name: data.provinceStr },
            { name: data.cityStr },
            { name: data.areaStr },
          ];
          this.setState({ currentAddress });
        }
      });
    } else {
      dispatch({
        type: 'addAddress/clearCurrentAddress',
      });
    }
  };

  showToast(title) {
    Taro.showToast({
      title,
      icon: 'none',
      mask: true,
    });
  }

  handleAreaClick() {
    my.multiLevelSelect({
      title: '选择地址',
      list: citys,
      success: (data) => {
        if (data.success) {
          const addressValues = this.getAddressValues(data.result)
          this.setState({ currentAddress: addressValues });
        }
      },
    });
  }

  getAddressValues(result) {
    // const provinceInfo = addressList.find( info => info.name === result[0].name);
    // const cityInfo = provinceInfo.subList.find(info => info.name === result[1].name);
    // const areaInfo = cityInfo.subList.find(info => info.name === result[2].name);
    // return [
    //   { name: provinceInfo.name, value: provinceInfo.value },
    //   { name: cityInfo.name, value: cityInfo.value },
    //   { name: areaInfo.name, value: areaInfo.value },
    // ];
    if(result[0].name == '其它'){
      return [
        { name: '其它地区请填写详细地址', value: '其它' }
      ];
    }
    const provinceInfo = addressList.find( info => info.name === result[0].name);

    // console.log(provinceInfo,'====呃呃呃>')
    // return
    // if(!!provinceInfo.subList){
    //   return [
    //     { name: '请填写详细地址', value: '其它' }
    //   ];
    // }
    const cityInfo = provinceInfo.subList.find(info => info.name === result[1].name);
    // console.log(cityInfo,'<=====>')
    if(result.length<3){
      return [
        { name: provinceInfo.name, value: provinceInfo.value },
        { name: cityInfo.name, value: cityInfo.value }
      ];
    }else{
      const areaInfo = cityInfo.subList.find(info => info.name === result[2].name);
      // console.log(areaInfo,'===')
      if(areaInfo){
        return [
          { name: provinceInfo.name, value: provinceInfo.value },
          { name: cityInfo.name, value: cityInfo.value },
          { name: areaInfo.name, value: areaInfo.value },
        ];
      }else{
        return [
          { name: provinceInfo.name, value: provinceInfo.value },
          { name: cityInfo.name, value: cityInfo.value }
        ];
      }
    }
  }

  formSubmit = (e) => {
    const { realname, telephone, street, isDefault } = e.detail.value;
    const { currentAddress } = this.state;
    const { addressInfo } = this.props;
    if (!realname) {
      this.showToast('请输入收货人姓名');
      return;
    }
    if (!telephone || telephone.length !== 11) {
      this.showToast('请输入正确的手机号');
      return;
    }
    if (!currentAddress.length) {
      this.showToast('请选择省市区');
      return;
    }
    if (!street) {
      this.showToast('请输入详细地址');
      return;
    }
    const { dispatch } = this.props;
    let params = {
      realname,
      telephone,
      // province: currentAddress[0].value,
      // city: currentAddress[1].value,
      // area: currentAddress[2].value,
      isDefault: isDefault ? 1 : 0,
      street,
      id: addressInfo.id
    }
    if(currentAddress[0].value == '其它'){
      params.province = 999;
      params.city = 999;
      params.area = 999;
    }else{
      params.province = currentAddress[0].value;
      params.city = currentAddress[1].value;
      params.area = currentAddress[2].value;
    }
    // console.log(params,'rererrereturn')
    // return;
    dispatch({
      type: 'addAddress/subAddress',
      payload: params,
      callback: () => {
        Taro.navigateBack({ url: '/pages/address/index' });
      },
    });
  }

  handleDelete = () => {
    const { id } = this.$router.params; 
    const { dispatch,list } = this.props;
    if (id) {
      my.confirm({
        title: '确认',
        content: '您确定要删除该地址吗？',
        success: (result) => {
          if (result.confirm) {
            dispatch({
              type: 'addAddress/deleteAddress',
              payload: { id },
              callback: () => {
                Taro.navigateBack({ url: '/pages/address/index' });
              },
            });
          }
        }
      });
    }
  }
  ddOrder = ()=>{
    this.setState({ isshow: false });
  }

  render() {
    const { currentAddress } = this.state;
    const { addressInfo, loading } = this.props;
    const { id } = this.$router.params;
    // eslint-disable-next-line no-undef
    (loading) ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='addAddress-page'>
        {/* {loop: false, leading: 500, trailing: 800, fps: 40 } */}
        <View onClick={this.ddOrder}> 
          <notice show={isshow} class="loslos" marqueeProps={marquee} enableMarquee={true} actionCls="closeable" mode="closable">若所在省市无法选择,请在省市区选择其他,在详细地址输入即可！！！！！</notice>
        </View>
        <Form onSubmit={this.formSubmit}>
          <View className='info'>
            <View className='item'>
              <Input placeholder='收货人' style={{width: '100%'}} name='realname' value={addressInfo.realname} />
            </View>
            <View className='item'>
              <Input placeholder='手机号码' style={{width: '100%'}} name='telephone' value={addressInfo.telephone} />
            </View>
            {currentAddress.length ? (
              <View className='item areaSelect selectedText' onClick={this.handleAreaClick}>
                <View>{currentAddress[0].name} {currentAddress[1].name} {currentAddress[2].name}</View>
                <am-icon type='arrow-right' size={22} color='#ccc' />
              </View>
            ) : (
                <View className='item areaSelect' onClick={this.handleAreaClick}>
                  <View>所在地区</View>
                  <am-icon type='arrow-right' size={22} color='#ccc' />
                </View>
              )}

            <View className='item'>
              <Textarea placeholder='详细地址' name='street' value={addressInfo.street} />
            </View>
            <View className='default'>
              <View>设为默认地址</View>
              <Switch name='isDefault' checked={addressInfo.isDefault} disabled={addressInfo.isDefault} />
            </View>
          </View>
          {!!id && (
            <View className='delete-info' onClick={this.handleDelete}>删除地址</View>
          )}
          <Button className='save-button' formType='submit'>保存</Button>
        </Form>
      </View>
    )
  }
}

export default Addaddress;
