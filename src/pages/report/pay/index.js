import Taro, { Component } from '@tarojs/taro';
import { reportUrl } from '../../../config';
import { View} from '@tarojs/components';

class  Pay extends Component{

  componentDidMount () {
    if (navigator.userAgent.indexOf('AlipayClient') > -1) {
      document.writeln('<script src="https://appx/web-view.min.js"' + '>' + '<' + '/' + 'script>');
    }

// javascript
    // let params = this.$router.params
    // console.log(params.userName)
    // let formData = new FormData();
    // formData.append('userName',this.$router.params.userName);
    // formData.append('phone', this.$router.params.phone);
    // formData.append('idCardNo',this.$router.params.idCardNo);
    // formData.append('type',this.$router.params.type);
    // console.log(formData)
    // let  voJson = `${params}`
    // console.log(params)
    //     fetch(reportUrl+'/aliPay/createForm',{
    //       method:'POST',
    //       body:formData
    //     })
    //       .then(res=>{
    //         return  res.text()
    //       })
    //       .then(data=>{
    //         formData.append('orderNo',data);
    //         console.log(data)
    //         const div = document.createElement('View');
    //         div.innerHTML = data;
    //         document.body.appendChild(div);
    //         document.forms[0].submit();
    //       })
    // fetch(reportUrl+'/aliPay/preForAppPay',{
    //   // method:'POST',
    // // body:formData
    //
    //   })
    //   .then(res=>{
    //     return  res.text()
    //   })
    //   .then(data=>{
    //     formData.append('orderNo',data);
    //     console.log(data)
    //     const div = document.createElement('View');
    //     div.innerHTML = data;
    //     document.body.appendChild(div);
    //     document.forms[0].submit();
    //   })
    // my.tradePay({
    //   tradeNO: '2017111521001104105336677922',
    //   success: function(res) {
    //     my.alert(res.resultCode);
    //   },
    //   fail: function(res) {
    //     my.alert(res.resultCode);
    //   },
    // });

    }

  render(){
    return (
      <View >

      </View>
    )
  }
}

export default Pay
