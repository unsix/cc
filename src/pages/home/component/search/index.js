import Taro, { Component } from '@tarojs/taro';
import { View, Input, Icon } from '@tarojs/components';
import './index.scss';

class Search extends Component {
  skipToSearch = () => {
    Taro.redirectTo({
      url: '/pages/search/index'
    })
  }
  render() {
    const { value } = this.props;
    return (
      <View onClick={this.skipToSearch} className='search-com'>
        <Icon
          className='search-icon'
          type='search'
          size='16'
          color='#cccccc'
        />
        <Input
          name='search'
          type='text'
          className='search-input'
          placeholder='搜索你想要的商品'
          value={value}
        />
      </View>
    )
  }
}

export default Search;
