import Taro, { Component } from '@tarojs/taro';
import { View, Button,Form} from '@tarojs/components';
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

  // submit() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'mine/fetchAuthCode',
  //     callback: () => {
  //       dispatch({
  //         type: 'freshman/getNewPackage', //领红包
  //         payload: { type: 1 },
  //       });
  //     },
  //   });
  // }
  formSubmit = (e) =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'mine/fetchAuthCode',
      callback: () => {
        dispatch({
          type: 'freshman/getNewPackage', //领红包
          payload: { type: 1 },
        });
      },
    });
    let formId = e.detail.formId
    dispatch({
      type:'unclaimed/userFormIdPool',
      payload:{
        type:'1',
        userFormId:formId
      }
    })
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
        <Form report-submit='true' onSubmit={this.formSubmit}>
          <Button className='freshman-page-btn' formType='submit' >一键领取新人优惠</Button>
        </Form>
      </View>
    )
  }
}

export default Freshman;
