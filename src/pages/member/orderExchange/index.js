import Taro, { Component} from '@tarojs/taro'
import { View ,Image,Button,Text,ScrollView} from '@tarojs/components'
import './index.scss'

//img
import  Exchange from '../../../images/member/expenditure.png'
import InCome from '../../../images/member/income.png'
import { connect } from '@tarojs/redux'

@connect(({  members,loading}) => ({
  ...members,
  loading: loading.models.members,
}))
class orderExchange extends Component {
  config = {
    navigationBarTitleText: '兑换订单',
  };
  constructor () {
    super(...arguments)
    this.state = {
      open: false,
      list:[],
      downList:false
    }
  }

  componentDidMount () {
    // const { dispatch } = this.props
      // dispatch({
      //   type:'members/wingRecords'
      // })
    const { ExChangeInfo } = this.props;
    this.setDispatch(ExChangeInfo);
  }

  setDispatch(ExChangeInfo) {
    const { dispatch } = this.props;
    const info = { ...ExChangeInfo };
    dispatch({
      type: 'members/wingRecords',
      payload: { ...info },
    });
  }

  onScrollToLower = () => {
    const { ExChangeInfo,total} = this.props;
    if(total.length === 0) {
      Taro.showToast({
        title:'没有更多兑换记录了'
      })
      return
    }
    this.setDispatch(ExChangeInfo);
  };
  allRecords = () => {
    const { dispatch , wingRecordsList} = this.props
    dispatch({
      type:'members/wingRecords'
    })
    // function num(data) {
    //   for(let i = 0 ;i< data.length ; i++){
    //    return (data[i].type === 11)
    //   }
    // }
    //
    // let cc = wingRecordsList.filter(num)
    // console.log(cc,'===================')
  }
  inComeRecords = () => {
    const { dispatch } = this.props
    dispatch({
      type:'members/wingRecords',
      payload:{
        type:1
      }
    })
  }
  expenditureRecords = () => {
    const { dispatch } = this.props
    dispatch({
      type:'members/wingRecords',
      payload:{
        type:2
      }
    })
  }
  toBack = () => {
    Taro.switchTab({ url: '/pages/home/index' })
  }
  toSee = () => {
    Taro.navigateTo({ url: '/pages/coupon/index' })
  }

  handleClick (value) {
    console.log(value)
    this.setState({
      open: value
    })
  }
  downUp = (value) => {
    console.log(value)
    this.setState({
      downList: !value
    })
  }
  render() {
    const { loading , wingRecordsList , memberIfn }= this.props
    const { list , downList} = this.state
    console.log(this.state,'===================')
    const systemInfo = Taro.getSystemInfoSync();
    let fixedHeight = 0;
    if (systemInfo.model.indexOf('iPhone X') > -1) {
      fixedHeight = fixedHeight + 30;
    }
    const scrollHeight = Taro.getSystemInfoSync().windowHeight - fixedHeight;
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='container_exchange'>
        <View className='header'>
          <View className='item'>
            <View className='text-title'>我的金豆
              <Text className='text-tips'>(永久有效)</Text>
            </View>
            <View className='text-beans'>{memberIfn.vip.wingNumber? memberIfn.vip.wingNumber:'0'}</View>
            <View className='text-border'>

            </View>
            <View className='text-discount'>抵扣比例：100金豆=1元</View>
          </View>
        </View>
        <View className='content'>
          <View className='title'>
            <View className='text'>
              <View>收支明细</View>
              <View
                className='down-all'
                onClick={this.downUp.bind(this,downList)}
              >
                <View>
                  全部
                </View>
                <View>
                  <Image className='img' src={require('../../../images/member/down.png')} />
                </View>
              </View>
            </View>
          </View>

          <View className='item'>
            {/*<ScrollView*/}
            {/*  className='scroll-view'*/}
            {/*  scrollY*/}
            {/*  scrollWithAnimation*/}
            {/*  scrollTop='0'*/}
            {/*  style={`height: ${scrollHeight}px;`}*/}
            {/*  // style={`height: 1px;`}*/}
            {/*  onScrollToLower={this.onScrollToLower}*/}
            {/*>*/}
              { wingRecordsList && !!wingRecordsList.length ?wingRecordsList.map(item=>(
                  <View className='item-list'>
                    <View>
                      <Image className='list-img' src={item.wingChangeNumber>0?InCome:Exchange} />
                    </View>
                    <View className='item-text'>
                      <View className='text-title'>
                        {item.recordDesc}
                      </View>
                      <View className='text-time'>
                        {item.createTime}
                      </View>
                    </View>
                    {
                      item.wingChangeNumber<0?
                        (
                          <View className='item-bean'>{item.wingChangeNumber}</View>
                        ):
                        (
                          <View className='item-bean'>+{item.wingChangeNumber}</View>
                        )
                    }
                  </View>
                ))
                :
                (<Image className='img' src='http://oss.huizustore.com/f5fe849d1bc144db95a9182370b7ee13.png' />)
              }
            {/*</ScrollView>*/}
          </View>
          {
            downList === true?
              (
                <View className='down-list'>
                  <View
                    className='text'
                    onClick={this.allRecords}
                  >
                    全部
                  </View>
                  <View
                    className='text'
                    onClick={this.inComeRecords}
                  >
                    收入
                  </View>
                  <View
                    className='text'
                    onClick={this.expenditureRecords}
                  >
                    支出
                  </View>
                </View>
              ):null
          }
        </View>
      </View>
    )
  }
}

export default orderExchange
