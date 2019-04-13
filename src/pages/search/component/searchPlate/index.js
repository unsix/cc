import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

class SearchPlate extends Component {
  handleClick = (value) => {
    const { onClick } = this.props;
    onClick(value);
  }
  render() {
    const { data, type, onClear } = this.props;
    return (
      <View className='search-plate'>
        <View className='search-plate-title'>
          <View className='title'>{type === 'recommend' ? '搜索发现' : '搜索历史'}</View>
          {type === 'history' && (
            <View className='title' onClick={onClear}>清空</View>
          )}
        </View>
        <View className='search-plate-view'>
          {!!data && !!data.length && data.map(info => (
            <View key={info.id} className='search-plate-view-item'>
              <Text className='text' onClick={this.handleClick.bind(this, info.word)}>{info.word}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }
}

export default SearchPlate;
