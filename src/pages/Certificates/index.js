import Taro, { Component } from '@tarojs/taro';
import { View,  Image,Button } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { baseUrl } from  '../../config/index'
import './index.scss';

@connect(({certificate,mine, loading }) => ({
  ...mine,
  ...certificate,
  loading: loading.models.certificate,
}))
class Certificate extends Component {
  config = {
    navigationBarTitleText: '实名认证',

  };

  state = {
    idCardFront:null,
    idCardBack:null,
    idCardHandHeld:null,
    type:'0'
  }

  componentDidMount = () => {
    const { dispatch } = this.props
    const { idCardPhotoStatus } = this.props
    if(idCardPhotoStatus===1){
      dispatch({
        type:'certificate/getUserIdCardPhotoInfo',
        callback:(res)=>{
          if (res.data.idCardFront){
            this.setState({
              idCardFront:res.data.idCardFront,
              idCardBack:res.data.idCardBack,
              idCardHandHeld:res.data.idCardHandHeld,
              type:'1'
            })
          }

        }
      })
    }
   };

  showToast(title) {
    Taro.showToast({
      title,
      icon: 'none',
      mask: true,
    });
  }

  update = (val) => {
    if(val === '1') {
      my.chooseImage({
        sourceType: ['camera','album'],
        success: (res) => {
          // this.setState({
          //   idCardFront:res.apFilePaths[0]
          // })
          console.log(res.apFilePaths[0],'============  ')
          my.uploadFile({
            url: baseUrl+ 'aliPay/components/uploadFile',
            fileType: 'image',
            fileName: 'multipartFile',
            filePath: res.apFilePaths[0],
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            success: (res) => {
              // my.alert({
              //   content: '上传成功'
              // });
              // console.log(JSON.parse(res.data))
              let data = JSON.parse(res.data)
              // console.log(data.data[0],'============  ')
              this.setState({
                idCardFront:data.data[0]
              })
            },
          });
          // console.log(res)
          // my.alert({
          //   content:res.apFilePaths[0],
          // });
        },
        fail:()=>{
          my.showToast({
            content: '取消成功',
          });
        }
      })
    }
    if(val === '2') {
      my.chooseImage({
        sourceType: ['camera','album'],
        success: (res) => {
          // this.setState({
          //   idCardBack:res.apFilePaths[0]
          // })
          // console.log(res.apFilePaths[0])
          my.uploadFile({
            url: baseUrl+ 'aliPay/components/uploadFile',
            fileType: 'image',
            fileName: 'multipartFile',
            filePath: res.apFilePaths[0],
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            success: (res) => {
              // my.alert({
              //   content: '上传成功'
              // });
              console.log(JSON.parse(res.data))
              let data = JSON.parse(res.data)
              this.setState({
                idCardBack:data.data[0]
              })
            },
          })
        },
        fail:()=>{
          my.showToast({
            content: '取消成功',
          });
        }
      })
    }
    if(val === '3') {
      my.chooseImage({
        sourceType: ['camera','album'],
        success: (res) => {
          // this.setState({
          //   idCardHandHeld:res.apFilePaths[0]
          // })
          console.log(res)
          my.uploadFile({
            url: baseUrl+ 'aliPay/components/uploadFile',
            fileType: 'image',
            fileName: 'multipartFile',
            filePath: res.apFilePaths[0],
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            success: (res) => {
              // my.alert({
              //   content: '上传成功'
              // });
              // console.log(JSON.parse(res.data))
              let data = JSON.parse(res.data)
              this.setState({
                idCardHandHeld:data.data[0]
              })
            },
            fail:(res)=>{
              my.alert({
                content: '上传错误'
              });
            }
          })
        },
        fail:()=>{
          my.showToast({
            content: '取消成功',
          });
        }
      })
    }
  }

  sumbit = () => {
    const {idCardFront,idCardBack, idCardHandHeld ,type} = this.state;
    const { dispatch } = this.props
    if(!idCardFront){
      this.showToast('请上传身份证人像面')
      return
    }
    if(!idCardBack){
      this.showToast('请上传身份证国徽面')
      return
    }
    if(!idCardHandHeld){
      this.showToast('请上传手持身份证')
      return
    }

    if (type === '1'){

      dispatch({
        type:'certificate/updateUpLoad',
        payload:{
          idCardFront, idCardBack, idCardHandHeld
        }
      })
    }
    else {
      dispatch({
        type:'certificate/upLoad',
        payload:{
          idCardFront, idCardBack, idCardHandHeld
        }
      })
    }
  }
  render() {
    const { loading } = this.props;
    const {idCardFront,idCardBack, idCardHandHeld, } = this.state;
    // console.log(this.state)
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
     <View className='container_cer'>
       <View className='header'>
         <View className='text'>
           请拍摄本人真实有效的身份证原件，拍摄时请确保身份证
           边框完整，字迹清晰，亮度均衡。
           {/*<Text className='color'>*/}
           {/*  拍摄须知 >>*/}
           {/*</Text>*/}
         </View>
       </View>
       <View className='item'>
         {idCardFront?
           ( <View className='edit'  onClick={this.update.bind(this,'1')}>修改</View> ):null
         }
         <View className='update update-fir'  onClick={this.update.bind(this,'1')}>
           {idCardFront?
             (
               <Image className='update-img' src={idCardFront}  />
               ):null
           }
         </View>
       </View>
       <View  className='item'>
         {idCardBack?
           ( <View className='edit'  onClick={this.update.bind(this,'2')}>修改</View> ):null
         }
         <View className='update update-sed' onClick={this.update.bind(this,'2')}>
           {idCardBack?
             ( <Image className='update-img' src={idCardBack}  />):null
           }
         </View>
       </View>
       <View  className='item'>
         {idCardHandHeld?
           ( <View className='edit'  onClick={this.update.bind(this,'3')}>修改</View> ):null
         }
         <View className='update update-thr' onClick={this.update.bind(this,'3')}>
           {idCardHandHeld?
             ( <Image className='update-img' src={idCardHandHeld}  />):null
           }
         </View>
       </View>
       <View>
         <Button className='sumbit' onClick={this.sumbit}>
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

export default Certificate;
