import Taro, { Component } from '@tarojs/taro';
import { View, Input, Icon ,Image} from '@tarojs/components';
import search from  '../../../../images/home/search_top.png'
import classfy from  '../../../../images/home/classfy_top.png'
import './index.scss';

class Search extends Component {
  skipToSearch = () => {
    Taro.redirectTo({
      url: '/pages/search/index'
    })
  }
  skipToClassify = () => {
    Taro.switchTab({
      url: '/pages/classify/index'
    })
  }
  onPageScroll(e){
    const { searchScroll} = this.props
    searchScroll(e.scrollTop)
  }
  render() {
    const { value } = this.props;
    return (
      <View  className='search-com'>
        {/*<Icon*/}
        {/*  className='search-icon'*/}
        {/*  type='search'*/}
        {/*  size='16'*/}
        {/*  color='#cccccc'*/}
        {/*/>*/}
        <View className='search_r' onClick={this.skipToSearch}>
          <Image
            className='search-icon'
            src='http://oss.huizustore.com/98d82a132e0e4f5d9df5e345271f6115.png'
          />
          <Input
            name='search'
            type='text'
            className='search-input'
            placeholder='搜索发现 刺猬优租 数码好物'
            value={value}
          />
        </View>
        <View onClick={this.skipToClassify}>
          <Image
            className='class-img'
            src='http://oss.huizustore.com/c08bac9f0fe24b948b8c9c98f3042d37.png'
          />
          <View className='class-text'>分类</View>
        </View>
      </View>
    )
  }
}

export default Search;
