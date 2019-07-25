import Taro, { Component} from '@tarojs/taro'
import { View ,Swiper, SwiperItem, Image,Form, Button,Text} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getUid} from '../../utils/localStorage'
import './index.scss';
@connect(({ shareMember ,loading}) => ({
  ...shareMember,
  loading: loading.models.shareMember,
}))
class shareMember extends Component {
  config = {
    navigationBarTitleText: '分享有礼',
  };
  state={
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch({
      type:'shareMember/getNewcomerTaskConfigVoByUid'
    })
  }
  onShareAppMessage() {
    const { shareNum } = this.props
    return {
      title: shareNum.shareTitle,
      content:shareNum.shareContent,
      imageUrl:shareNum.shareImage,
      bgImgUrl:shareNum.shareBgImg,
      desc: shareNum.shareDesc,
      path: `/pages/home/index?id=${getUid()}&taskId=${shareNum.taskId}`
    };
  }
  render() {
    const { shareNum } = this.props
    let list = []
    if(shareNum.avatarList && !!shareNum.avatarList.length){
       list = shareNum.avatarList.concat(new Array(10-shareNum.avatarList.length).fill('http://oss.huizustore.com/a5509c0128ac440396ceb381cf0706d0.png')); /*[1,2,3,4,5] 换成你的一维数组*/
      console.log(list);
      list.map(item=>{
        console.log(item,'===')
      })
    }

    console.log(this.props)
      return(
        <View className='container-share'>
          <View className='header'>
            <Image className='header-img' src={shareNum.topBanner}  />
            <View className='header-tips'>
              你尚未推荐好朋友 马上将88会员推荐给你的好朋友
            </View>
          </View>
          <View className='recommend'>
            <View className='recommend-title'>
              {shareNum.taskTitle}
            </View>
            <View className='recommend-content'>
              { list  && !!list.length && list.map(item=>(
                <Image className='recommend-content-img' src={item} />
              ))}
            </View>
          </View>
          <View className='give'>
            <View className='give-dec'>
              明明
              <Text className='give-dec-text'>已获得88会员卡</Text>
            </View>
            <View>
              {shareNum.taskStatus===1?
                (
                  <Button className='give-btn' open-type="share" >送朋友一份</Button>
                )
                :
                (
                  <Button className='give-btn'>开始新活动</Button>
                )
              }
            </View>
          </View>
          <View className=''></View>
        </View>
      )
    }
  }

export default shareMember
