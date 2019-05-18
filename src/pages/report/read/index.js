import Taro, { Component } from '@tarojs/taro';
import { View,Text} from '@tarojs/components';

import './index.scss'
class Read extends Component{
  config = {
    navigationBarTitleText: '阅读',
  };
  render(){
    return(
      <View className='container_read'>
        <View className="read">
          <View  className='title'>
            洞察报告用户服务协议
          </View >
          <View className='title_b'>
            一、洞察报告服务概要
          </View>
          <View className='title_s'>
            洞察报告概要:
          </View>
          <View className='dec'>
            <View>
              1.获取数据:即用户使用本平台工具，可以实现全自动、封闭地获取用户个人于网络的原始数据文件。
            </View>
            <View>
              2.解析数据:即用户获得原始数据文件后，授权本平台解析原始通讯数据文件，将原始数据转化、汇集成可供使用的标准化的通讯数据，提供专业的、标准的分析检测查询、管理服务。
            </View>
          </View>
          <View className='title_b'>
            二、洞察报告个人数据信息安全
          </View>
          <View className='dec'>
            <View>
              1.本平台重视用户的隐私保护，整个风险检测服务全程无人工干预，防止个人信息在源头上的外泄。
            </View>
            <View>
              2.本平台提供的评估服务仅是一个数据获取的工具，需由用户或授权终端主动发起。每个用户都要对其“洞察报告数据”中的所有内容负完全责任，本平台不对涉及评估检测登录的相关信息的泄露及引发的其他问题负有责任。
            </View>
          </View>
          <View className='title_b'>
            三、个人资料和隐私保护
          </View>
          <View className='dec'>
            <View>
              在您同意本协议的前提下，本平台采用行业标准以维护您的个人资料的隐私性，并用可靠的安全技术后端保护已存储的个人信息，对您所提供的个人资料进行严格的管理和保护，防止个人资料丢失、被盗用或遭窜改。
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Read
