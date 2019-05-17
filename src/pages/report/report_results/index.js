import Taro, { Component } from '@tarojs/taro';
import { View,Text,Image,Canvas} from '@tarojs/components';
import '../report_results/index.scss'
import { connect } from '@tarojs/redux'
//img
import Inf from '../../../images/report/essential_inf.jpg'
import IdCard from  '../../../images/report/id_report.png'
import IdMark from  '../../../images/report/id_mark.png'
import Re_Num from  '../../../images/report/report_number.png'
import BlackList from  '../../../images/report/blacklist.png'
import Credit from  '../../../images/report/credit.png'
import CreditLoan from  '../../../images/report/credit_loan.png'
import Overdue from  '../../../images/report/overdue_risk.png'
import LawInf from  '../../../images/report/law_inf.png'
@connect(({ reportHome}) => ({
  ...reportHome,
}))

class  Inc extends Component{

  componentDidMount () {

    this.props.dispatch({
      type:'reportHome/getResult',
      payload:{
        orderNo:this.$router.params
      }
    })
  }

  render(){
    return (
    <View>21312</View>
    )
  }
}

export default Inc
