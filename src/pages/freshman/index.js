import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import Ticket from './component/ticket/index';
import './index.scss';

@connect(({ freshman }) => ({
  ...freshman,
}))
class Freshman extends Component {
  config = {
    navigationBarTitleText: '新人领券',
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'freshman/selectNewPackageList',
    });
  };

  submit() {
    const { dispatch } = this.props;
    dispatch({
      type: 'mine/fetchAuthCode',
      callback: () => {
        dispatch({
          type: 'freshman/getNewPackage',
          payload: { type: 1 },
        });
      },
    });
  }

  render() {
    const { list } = this.props;
    return (
      <View className='freshman-page'>
        <View className='freshman-page-ticket'>
          {!!list && !!list.length && list.map(data =>
            <Ticket key={data.id} data={data} />
          )}
        </View>

        <View className='freshman-page-btn' onClick={this.submit}>一键领取新人优惠</View>
      </View>
    )
  }
}

export default Freshman;
