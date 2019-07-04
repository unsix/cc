import Taro, { Component} from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import NoData from '../../components/noData'
// import { formatStrDate } from '../../../utils/utils'
import { connect } from '@tarojs/redux'
import './index.scss';

//img
import Spot from '../../images/express/spot.png'
@connect(({express ,loading}) => ({
  ...express,
  loading: loading.models.express,
}))
class Express extends Component {
  config = {
    navigationBarTitleText: '物流详情',
  };
  state={
    // banner: [
    //   '../../../images/active_page/report_banner_1.png'
    // ]
    display: 'block', // none -> 没数据隐藏
  }
  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch({
      type:'express/userGetExpressByorderId',
      payload:{
        orderId:this.$router.params.orderId
        // orderId:1000001241006370
      }
    })
  }
  toBack = () => {
    Taro.switchTab({ url: '/pages/home/index' })
  }
  toSee = () => {
    Taro.navigateTo({ url: '/pages/coupon/index' })
  }
  onGoTo = (url) =>{
    Taro.navigateTo({
      url:`/${url}`
    })
  }
  handleGetCoupon = () => {
  }
  //领红包
  render() {
    const {loading, details}= this.props
    const { display } = this.state
    // let  results  = this.props.details.logisticsList.result
    // console.log(this.props.details.logisticsList,'=============',results)
    // console.log(code,'0000000000000000000000000000000000')
    // const {animationData,unclaimed} = this.state
    // const animation = Taro.createAnimation({
    //   transformOrigin: "50% 50%",
    //   duration: 1000,
    //   timingFunction: "ease",
    //   delay: 0
    // })
    // if(memberIfn.vip && memberIfn.vip.dueTime) {
    //   dueTime = `${formatStrDate(memberIfn.vip.dueTime, 'yyyy-MM-dd')}`;
    // }
    let list = null
    if(details.logisticsList){
      list =  details.logisticsList.result.list.reverse()
    }
    // console.log(this.porps.details.logisticsList,'=========')
    // const  list =  this.porps.details.logisticsList.result.list.reverse()
    console.log(list)
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
     <View className='container_express'>
        <View className='title'>
          配送快递 ：
          <Text>
            {details.platformExpress.name}
          </Text>
        </View>
       {
        list && !!list?
          list.map(item=>(
             <View className='item'>
                 <View className='item-img'>
                  <Image className='img' src={Spot} />
                 </View>
                 <View className='item-text'>
                    <View className='remark'>
                      {item.remark}
                    </View>
                   <View className='time'>
                     {item.datetime}
                   </View>
                 </View>
               <View className='line'>

               </View>
             </View>
         ))
         :
          (
            <View >
              <NoData className='no-express' type='express' display={display}  />
            </View>
          )
       }
     </View>
    )
  }
}

export default Express
