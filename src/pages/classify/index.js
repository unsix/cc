import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import MenuNav from './component/menu/index';
import List from './component/list/index'
import './index.scss';

@connect(({ classify, loading }) => ({
  ...classify,
  loading: loading.models.classify,
}))
class Classify extends Component {
  config = {
    navigationBarTitleText: '分类',
  };

  state = {
    currentMenu: null,
  };

  componentDidMount = () => {
    const { id } = this.$router.params;
    const { dispatch } = this.props;
    dispatch({
      type: 'classify/fetchCategoryList',
      payload: { categoryId: -2 },
      callback: (secondId) => {
        let categoryId = secondId;
        if (Number(id)) {
          categoryId = id;
        }
        dispatch({
          type: 'classify/fetchCategoryList',
          payload: { categoryId },
          callback:()=>{
            this.setState({ currentMenu: categoryId });
          }
        });
      },
    });
  };

  handleClickMenu = (id) => {
    const { dispatch } = this.props;
    const { currentMenu } = this.state;
    if (currentMenu === id) {
      return;
    }
    dispatch({
      type: 'classify/clearRightList',
    });
    this.setState({ currentMenu: id });
    dispatch({
      type: 'classify/fetchCategoryList',
      payload: { categoryId: id },
    });
  }

  handleClickRight = (item) => {
    Taro.navigateTo({ url: `/pages/productList/index?type=category&catId=${item.id}&catName=${item.name}` });
  }

  render() {
    const { menuList, rightList, loading } = this.props;
    const { currentMenu } = this.state;
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='classify-page'>
        <View className='classify-page-left'>
          {!!menuList && !!menuList.length && !!currentMenu && menuList.map(menu =>
            <MenuNav
              key={menu.id}
              sel={menu.id === currentMenu}
              value={menu.name}
              onClick={this.handleClickMenu.bind(this, menu.id)}
            />
          )}
        </View>
        <View className='classify-page-right'>
          <List list={rightList} onClick={this.handleClickRight} />
        </View>
      </View>
    )
  }
}

export default Classify;
