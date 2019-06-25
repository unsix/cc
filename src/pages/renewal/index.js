import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image,Button } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({ realName, loading }) => ({
  ...realName,
  loading: loading.models.realName,
}))
class Realname extends Component {
  config = {
    navigationBarTitleText: '实名认证',

  };

  state = {
   img_f:null,
   img_s:null,
   img_t:null
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

  update = (val) => {
    console.log(val)
    if(val === '1') {
      my.chooseImage({
        sourceType: ['camera','album'],
        success: (res) => {
          this.setState({
            img_f:res.apFilePaths[0]
          })
          console.log(res)
        },
        fail:()=>{
          my.showToast({
            content: 'fail',
          });
        }
      })
    }
    if(val === '2') {
      my.chooseImage({
        sourceType: ['camera','album'],
        success: (res) => {
          this.setState({
            img_s:res.apFilePaths[0]
          })
          console.log(res)
        },
        fail:()=>{
          my.showToast({
            content: 'fail',
          });
        }
      })
    }
    if(val === '3') {
      my.chooseImage({
        sourceType: ['camera','album'],
        success: (res) => {
          this.setState({
            img_t:res.apFilePaths[0]
          })
          console.log(res)
        },
        fail:()=>{
          my.showToast({
            content: 'fail',
          });
        }
      })
    }
  }


  render() {
    const { loading } = this.props;
    const { img_f, img_s, img_t } = this.state;
    console.log(this.state)
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
     <View className='container_cer'>
       <View className='header'>
         <View className='text'>
           请拍摄本人真实有效的身份证原件，拍摄时请确保身份证
           边框完整，字迹清晰，亮度均衡。
           <Text className='color'>
             拍摄须知 >>
           </Text>
         </View>
       </View>
       <View className='item'>
         {img_f?
           ( <View className='edit'  onClick={this.update.bind(this,'1')}>修改</View> ):null
         }
         <View className='update update-fir'  onClick={this.update.bind(this,'1')}>
           {img_f?
             ( <Image className='update-img' src={img_f}  />):null
           }
         </View>
       </View>
       <View  className='item'>
         {img_s?
           ( <View className='edit'  onClick={this.update.bind(this,'2')}>修改</View> ):null
         }
         <View className='update update-sed' onClick={this.update.bind(this,'2')}>
           {img_s?
             ( <Image className='update-img' src={img_s}  />):null
           }
         </View>
       </View>
       <View  className='item'>
         {img_t?
           ( <View className='edit'  onClick={this.update.bind(this,'3')}>修改</View> ):null
         }
         <View className='update update-thr' onClick={this.update.bind(this,'3')}>
           {img_t?
             ( <Image className='update-img' src={img_t}  />):null
           }
         </View>
       </View>
       <View>
         <Button className='sumbit'>
            提交
         </Button>
       </View>
       {/*<Button className='bottom-button' onClick={this.update}>上传图片</Button>*/}
       {/*<View>*/}

       {/*</View>*/}
     </View>
    )
  }
}

export default Realname;
