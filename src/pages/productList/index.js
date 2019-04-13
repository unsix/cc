import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({ productList, loading }) => ({
  ...productList,
  loading: loading.models.productList,
}))
class Productlist extends Component {
  config = {
    navigationBarTitleText: '产品列表',
    usingComponents: {
      "popup": "../../npm/mini-antui/es/popup/index"
    }
  };

  state = {
    showPopup: false,
    minRentCycleDays: null,
    orderBy: null,
  }

  componentDidMount = () => {
    const { type } = this.$router.params;
    const { dispatch } = this.props;
    const newQueryInfo = {
      minRentCycleDays: null, // 起租天数
      operateCategoryId: null, // 类目id
      orderBy: null, // 排序规则 asc  desc  升序降序
      oldNewDegreeStatus: null, // 全新二手 0全新,1二手
      content: null, // 搜索内容
      pageNumber: 1,
      pageSize: 10,
    };
    if (type === 'category') {
      const { catId } = this.$router.params;
      newQueryInfo.operateCategoryId = Number(catId);
      newQueryInfo.content = null;
    } else {
      const { content } = this.$router.params;
      newQueryInfo.content = content;
      newQueryInfo.operateCategoryId = null;
    }
    dispatch({
      type: 'productList/setQueryInfo',
      payload: { ...newQueryInfo },
    });
    this.setDispatch(newQueryInfo);
  };

  setDispatch(queryInfo, fetchType) {
    const { dispatch } = this.props;
    const info = { ...queryInfo };
    if (fetchType === 'scroll') {
      info.pageNumber += 1;
      info.fetchType = fetchType;
    }
    dispatch({
      type: 'productList/fetchProductList',
      payload: { ...info },
    });
  }

  handleClickFilter = () => {
    this.setState({ showPopup: true });
  }

  onPopupClose = () => {
    this.setState({ showPopup: false });
  }

  onScrollToLower = () => {
    const { total, queryInfo, queryInfo: { pageNumber, pageSize } } = this.props;
    if (pageNumber * pageSize - total >= 0) {
      Taro.showToast({
        title: '没有更多商品了',
        icon: 'none',
      });
      return;
    }
    this.setDispatch(queryInfo, 'scroll');
  };

  handleGoBack = () => {
    Taro.navigateBack();
  }

  handleGotoClassify = () => {
    Taro.navigateTo({ url: '/pages/classify/index' });
  }

  handleClickDegree = () => {
    const { queryInfo } = this.props;
    const newQueryInfo = { ...queryInfo, pageNumber: 1, pageSize: 10 };
    if (queryInfo.oldNewDegreeStatus === 0) {
      newQueryInfo.oldNewDegreeStatus = 1
    } else if (queryInfo.oldNewDegreeStatus === 1) {
      newQueryInfo.oldNewDegreeStatus = null
    } else {
      newQueryInfo.oldNewDegreeStatus = 0
    }

    this.setDispatch(newQueryInfo);
  }

  handleOrderByClick = (orderBy) => {
    this.setState({ orderBy });
  }

  handleMinRentClick = (minRentCycleDays) => {
    this.setState({ minRentCycleDays })
  }

  handleFilterOk = () => {
    const { orderBy, minRentCycleDays } = this.state;
    const { queryInfo } = this.props;
    const newQueryInfo = { ...queryInfo, orderBy, minRentCycleDays };
    this.setDispatch(newQueryInfo);
    this.setState({ showPopup: false });
  }

  handleFilterCancel = () => {
    this.setState({
      orderBy: null,
      minRentCycleDays: null,
    });
  }

  handleDetailClick = (id) => {
    Taro.navigateTo({ url: `/pages/productDetail/index?itemId=${id}` });
  }

  render() {
    const { showPopup, minRentCycleDays, orderBy } = this.state;
    const { list, loading, oldNewDegreeList, queryInfo } = this.props;
    const { type, catName } = this.$router.params;

    const systemInfo = Taro.getSystemInfoSync();
    let fixedHeight = 87;
    if (systemInfo.model.indexOf('iPhone X') > -1) {
      fixedHeight = fixedHeight + 30;
    }
    const scrollHeight = Taro.getSystemInfoSync().windowHeight - fixedHeight;
    // eslint-disable-next-line no-undef
    loading ? my.showLoading({ constent: '加载中...' }) : my.hideLoading();
    return (
      <View className='productList-page'>
        <popup show={showPopup} position='right' zIndex={999} disableScroll onClose={this.onPopupClose}>
          <View className='popup-right'>
            <View className='filter-info'>
              <View className='price'>
                <View>价格/天</View>
                <View className='sort-info'>
                  <View
                    className={`filter-botton right-margin ${orderBy === 'asc' && 'filter-action'}`}
                    onClick={this.handleOrderByClick.bind(this, 'asc')}
                  >
                    从高到低
                  </View>
                  <View
                    className={`filter-botton left-margin ${orderBy === 'desc' && 'filter-action'}`}
                    onClick={this.handleOrderByClick.bind(this, 'desc')}
                  >
                    从低到高
                  </View>
                </View>
              </View>
              <View className='lease-term'>
                <View>起租日</View>
                <View className='term-info'>
                  <View className='terms'>
                    <View
                      className={`filter-botton right-margin ${minRentCycleDays === 1 && 'filter-action'}`}
                      onClick={this.handleMinRentClick.bind(this, 1)}
                    >
                      1天起租
                     </View>
                    <View
                      className={`filter-botton left-margin ${minRentCycleDays === 7 && 'filter-action'}`}
                      onClick={this.handleMinRentClick.bind(this, 7)}
                    >
                      7天起租
                    </View>
                  </View>
                  <View className='terms'>
                    <View
                      className={`filter-botton right-margin ${minRentCycleDays === 15 && 'filter-action'}`}
                      onClick={this.handleMinRentClick.bind(this, 15)}
                    >
                      15天起租
                    </View>
                    <View
                      className={`filter-botton left-margin ${minRentCycleDays === 30 && 'filter-action'}`}
                      onClick={this.handleMinRentClick.bind(this, 30)}
                    >
                      30天起租
                    </View>
                  </View>
                  <View className='terms'>
                    <View
                      className={`filter-botton right-margin ${minRentCycleDays === 90 && 'filter-action'}`}
                      onClick={this.handleMinRentClick.bind(this, 90)}
                    >
                      90天起租
                    </View>
                    <View
                      className={`filter-botton left-margin ${minRentCycleDays === 180 && 'filter-action'}`}
                      onClick={this.handleMinRentClick.bind(this, 180)}
                    >
                      180天起租
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className='popup-bottom'>
              <View className='bottom-info' onClick={this.handleFilterCancel}>重置</View>
              <View className='bottom-info bottom-confirm' onClick={this.handleFilterOk}>确定</View>
            </View>
          </View>
        </popup>
        <View className='top-menu'>
          {type === 'category' ? (
            <View className='menu-item' onClick={this.handleGoBack}><View>{catName}</View><View className='new-cat' /></View>
          ) :
            (
              <View className='menu-item' onClick={this.handleGotoClassify}><View>全部</View><View className='new-cat' /></View>
            )}
          <View className='menu-item' onClick={this.handleClickDegree}>
            <View>新旧</View>
            {queryInfo.oldNewDegreeStatus === null && (
              <View className='default' />
            )}
            {queryInfo.oldNewDegreeStatus === 0 && (
              <View className='new' />
            )}
            {queryInfo.oldNewDegreeStatus === 1 && (
              <View className='old' />
            )}
          </View>
          <View className='menu-item' onClick={this.handleClickFilter} >
            <View>筛选</View>
            <View className={(!!queryInfo.orderBy || !!queryInfo.minRentCycleDays) ? 'filter-action' : 'filter'} />
          </View>
        </View>
        <View className='top-space' />
        <View />
        <ScrollView
          scrollY
          scrollWithAnimation
          scrollTop='0'
          className='products-area'
          style={`height: ${scrollHeight}px;`}
          onScrollToLower={this.onScrollToLower}
        >
          {!!list && !!list.length && list.map(info =>
            type === 'category' ? (
              <View className='itme' key={info.id} onClick={this.handleDetailClick.bind(this, info.itemId)}>
                <Image className='img' mode='aspectFit' src={info.image} />
                <View className='info'>
                  <View className='title'>{info.name}</View>
                  <View className='rent-info'>{oldNewDegreeList[info.oldNewDegree - 1]}<Text style={{ padding: '0 5px' }}>|</Text>{info.minRent}天起租</View>
                  <View className='price-info'>
                    <Text className='unit'>￥</Text>
                    <Text>{String(info.sale).split('.')[0]}</Text>
                    <Text className='decimal'>{String(info.sale).split('.')[1] ? `.${String(info.sale).split('.')[1]}` : ''}</Text>
                    <Text className='unit'> /天</Text>
                  </View>
                </View>
              </View>
            ) :
              (
                <View className='itme' key={info.id} onClick={this.handleDetailClick.bind(this, info.productId)}>
                  <Image className='img' mode='aspectFit' src={info.image} />
                  <View className='info'>
                    <View className='title'>{info.name}</View>
                    <View className='rent-info'>{info.oldNewDegreeAndPrice.oldNewDegree}<Text style={{ padding: '0 5px' }}>|</Text>{info.minRentCycle}天起租</View>
                    <View className='price-info'>
                      <Text className='unit'>￥</Text>
                      <Text>{!!info.oldNewDegreeAndPrice && String(info.oldNewDegreeAndPrice.price).split('.')[0]}</Text>
                      <Text className='decimal'>{!!info.oldNewDegreeAndPrice && String(info.oldNewDegreeAndPrice.price).split('.')[1] ? `.${String(info.oldNewDegreeAndPrice.price).split('.')[1]}` : ''}</Text>
                      <Text className='unit'> /天</Text>
                    </View>
                  </View>
                </View>
              )
          )}
        </ScrollView>
      </View>
    )
  }
}

export default Productlist;
