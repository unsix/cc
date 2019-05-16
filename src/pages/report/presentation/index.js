import Taro, { Component } from '@tarojs/taro';
import { View,Text,Input,Form,Button} from '@tarojs/components';
import { reportUrl } from '../../../config';
import { blankSpace } from '../../../utils/utils'
import {  AtCheckbox } from 'taro-ui'
import '../enty.scss';
import './index.scss'
class  Presentation extends Component{
  constructor () {
    super(...arguments)
    this.state = {
      checkedList: ['list1'],
    }
    this.checkboxOption = [{
      value: 'list1',
      // label: '我已阅读并同意《洞察报告用户协议》',
    },]
  }
  componentDidMount(){
    var hrt = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
    window.onload = function(){ //在页面整体加载完毕时
      document.getElementById('app').style.height= hrt+'px'//把获取到的高度赋值给根div
    }

  }
  handleChange (value) {
    this.setState({
      checkedList: value
    })
  }
  //协议
  read = () =>{
    Taro.navigateTo({ url: '/pages/read/index' });
  }
  //from提交
  formSubmit = (e) => {
    const { number } = e.detail.value
    if(!blankSpace(number)){
      Taro.showToast({
        title:'报告编号不能为空',
        icon: 'none',
      })
      return
    }
    else if(blankSpace(number).length!=17){
      Taro.showToast({
        title:'报告编号长度有误',
        icon: 'none',
      })
      return
    }
    else {
      Taro.redirectTo({
        url:`/pages/report_results/index?reportId=${number}`
      })
    }
    // fetch(reportUrl+'/user/getResultById?reportId='+`${number}`,{
    //   method:'GET',
    // })
    //   .then(res=>{
    //     return res.json()
    //   })
    //   .then(data=>{
    //    if(data.code == 1){
    //      Taro.redirectTo({
    //        url:`/pages/report_results/index?reportId=${number}`
    //      })
    //    }
    //    // else {
    //    //   Taro.showToast({
    //    //     title:data.msg,
    //    //     icon:'none'
    //    //   })
    //    //  }
    //   })
  }
  // config = {
  //   navigationBarTitleText: '新人领券',
  // };
  render(){
    return(
      <View className='container_enty container_presentation'>
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
          <View className='content content_pre'>
            <View className='report'>
              <Input
                name='number'
                className='number'
                placeholder='请输入报告编号'
              />
            </View>
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
              <Button type='primary' size='normal' formType='submit'>立即查询</Button>
            </View>
          </View>
        </Form>
      </View>
    )
  }
}
export default Presentation
