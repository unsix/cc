import Taro, { Component } from '@tarojs/taro';
import { View, Input, Icon, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import SearchPlate from './component/searchPlate/index'
import './index.scss';

@connect(({ search, loading }) => ({
  ...search,
  loading: loading.models.search,
}))
class Search extends Component {
  config = {
    navigationBarTitleText: '搜索',
  };

  state = { value: null }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'search/getHistory',
    });
  };

  navigateToList(value) {
    Taro.navigateTo({ url: `/pages/productList/index?type=search&content=${value}` });
  }

  handleClearHistory() {
    const { dispatch } = this.props;
    dispatch({
      type: 'search/clearHistory',
    });
  }

  handleChangeInput(e) {
    console.log(e.detail.value,'sosos')
    this.setState({ value: e.detail.value });
  }

  handleSearch() {
    const { value } = this.state;
    if (value) {
      const { dispatch } = this.props;
      dispatch({
        type: 'search/setHistory',
        payload: { word: value },
      });
      this.navigateToList(value);
    }
  }

  handleClearValue() {
    this.setState({ value: '' });
  }

  handleGoBack() {
    Taro.switchTab({ url: '/pages/home/index' });
  }

  render() {
    const { value } = this.state;
    const { recommend, history } = this.props;

    // eslint-disable-next-line no-undef
    // loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();

    return (
      <View className='search-page'>
        <View className='search-top'>
          <View className='search-page-input'>
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
              confirmType='搜索'
              onInput={this.handleChangeInput}
              onConfirm={this.handleSearch.bind(this)}
            />
            {!!value && (
              <View onClick={this.handleClearValue}>
                <Icon
                  className='search-icon cancel'
                  type='cancel'
                  size='16'
                  color='#cccccc'
                />
              </View>
            )}
          </View>
          <Text className='search-cancel' onClick={this.handleGoBack}>取消</Text>
        </View>
        <View className='search-found'>
          <SearchPlate
            data={recommend}
            type='recommend'
            onClick={this.navigateToList}
          />
        </View>
        {!!history && !!history.length && (
          <View>
            <View className='search-border'></View>
            <View className='search-found'>
              <SearchPlate
                data={history}
                type='history'
                onClick={this.navigateToList}
                onClear={this.handleClearHistory}
              />
            </View>
          </View>
        )}

      </View>
    )
  }
}

export default Search;
