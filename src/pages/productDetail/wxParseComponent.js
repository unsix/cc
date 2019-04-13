import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import WxParse from '../../components/wxParse/wxParse'

import './wxParse.scss'

/**
 * 需要注意的是，在项目的 config/index.js 文件中，有 copy 模板与样式的操作
 */
export default class ParseComponent extends Component {
  componentDidMount () {
  }

  defaultProps = {
    mark: '',
  }

  render () {
    if(this.props.mark) {
      let domText = this.props.mark;
      WxParse.wxParse('domText', 'html', domText, this.$scope, 5);
    }
    return (
      <View>
        <import src='../../components/wxParse/wxParse.axml' />
        <template is='wxParse' data='{{wxParseData:domText.nodes}}'/>
      </View>
    )
  }
}