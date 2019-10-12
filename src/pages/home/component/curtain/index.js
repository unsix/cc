import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Form, ScrollView, Button } from '@tarojs/components'
import { AtCurtain} from 'taro-ui'
import './index.scss'

class TagPage extends Component {


   state = {

    }
  onClose () {
    const { onClose } = this.props
    onClose(false)
  }
  onGetAuthorize =()=>{
    const { onClick } = this.props
    onClick()
  }
  render() {
    const { isOpened,data } = this.props;
    // console.log(this.props,'==========================12312312321')
    return (

      <View className='container-curtain'>
        <AtCurtain
          className='container-curtain-con'
          isOpened={isOpened}
          onClose={this.onClose.bind(this)}
        >
          <View className='box'  onClick={this.onGetAuthorize}>
            <Image
              className='img'
              src={data}
            />
            <Button
              className='authorize'
              open-type="getAuthorize"
              scope='userInfo'
              onClick={this.onGetAuthorize}
            >
              立即授权
            </Button>
          </View>
        </AtCurtain>

      </View>
    )
  }
}

export  default TagPage
