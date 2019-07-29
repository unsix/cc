import Taro, { Component} from '@tarojs/taro'
import { View,Image,Button,Text} from '@tarojs/components'
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
      type:'shareMember/getNewcomerTaskConfigVoByUid',
      callback:(taskId)=>{
        dispatch({
          type:'shareMember/listTaskCompleteMessage',
          payload: {
            taskId:taskId
          }
        })
      }
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
      path: `pages/home/index?id=${getUid()}&taskId=${shareNum.taskId}`
    };
  }
  onGoPages = (url) => {
    Taro.navigateTo({
      url
    })
  }
  newActive = (taskId) => {
    const { dispatch } = this.props
    dispatch({
      type:'shareMember/startNewTask',
      payload:{
        taskId:taskId
      }
    })
  }
  render() {
    const { shareNum , peopleNum} = this.props
    let listAvatar = []
    if(shareNum.avatarList){
      if(shareNum.avatarList.length){
        let list = shareNum.avatarList.concat(new Array(shareNum.neededNewcomerNumber?shareNum.neededNewcomerNumber-shareNum.avatarList.length:0).fill('http://oss.huizustore.com/a5509c0128ac440396ceb381cf0706d0.png'));
        listAvatar = list.slice(0,15)
      }
      else {
        let list = shareNum.avatarList.concat(new Array(shareNum.neededNewcomerNumber).fill('http://oss.huizustore.com/a5509c0128ac440396ceb381cf0706d0.png'));
        listAvatar = list.slice(0,shareNum.neededNewcomerNumber)
      }
    }
      return(
        <View className='container-share'>
          <View className='header'>
            <Image className='header-img' src={shareNum.topBanner}  />
            <View className='header-tips'>
              {shareNum.taskInviteDesc && shareNum.taskInviteDesc}
            </View>
          </View>
          <View className='recommend'>
            <View className='recommend-title'>
              {shareNum.taskTitle && shareNum.taskTitle}
            </View>
            <View className='recommend-tipsImg'>
              <Image className='recommend-tipsImg-img' src='http://oss.huizustore.com/3dd0716938b74c9aa5aecfdc709c2c88.png' />
            </View>
            <View className='recommend-content'>
              { listAvatar  && !!listAvatar.length && listAvatar.map(item=>(
                <Image className='recommend-content-img' src={item} />
              ))}
            </View>
          </View>
          <View className='give'>
            <View className='give-dec'>
              <View>
                {peopleNum && !!peopleNum.length && (
                  <swiper
                    autoplay='{{true}}'
                    interval='{{3000}}'
                  >
                    {peopleNum && !!peopleNum.length && peopleNum.map(item=>(
                      <swiper-item >
                        <View className='item' >
                          {item.nickName}
                          <Text className='give-dec-text'>{item.taskMessage}</Text>
                        </View>
                      </swiper-item>
                    ))}
                  </swiper>
                )}
              </View>
            </View>
            <View>
              { shareNum.taskStatus=== 1&&
                <Button className='give-btn' open-type='share'>送朋友一份</Button>
              }
            </View>
            <View>
              { shareNum.taskStatus=== 8&&
                <Button className='give-btn' onClick={this.newActive.bind(this,shareNum.taskId)}>开始新活动</Button>
              }
            </View>
          </View>
          { shareNum.taskDescImg && (
            <View className='shareFriend'>
              <Image className='shareFriend-img' src={shareNum.taskDescImg} />
            </View>
          ) }
          <View className='my-reward'>
            <View className='my-reward-more' onClick={this.onGoPages.bind(this,shareNum.rewardJump)}>
              查看更多
              <Text className='bol'> > </Text>
            </View>
            <View className='my-reward-more-dec'>
              <View className='my-reward-more-dec-text'>{shareNum.rewardDesc}</View>
              {shareNum.taskStatus===1?
                (<Button className='btn' open-type='share'>获取</Button>)
                :
                (<Button className='btn btn-al'>已获得</Button>)
              }
            </View>
          </View>
          <View className='explain'>
            <View className='explain-content'>
                {shareNum.taskDescList && !!shareNum.taskDescList.length && shareNum.taskDescList.map((item,index)=>(
                  <View className='explain-content-dec'>
                    <View className='explain-content-dec-text'>{index+1}</View>
                    {item}
                  </View>
                ))}
              </View>
          </View>
        </View>
      )
    }
  }

export default shareMember
