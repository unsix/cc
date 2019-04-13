import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';

class MenuNav extends Component {
  static propTypes = {
    sel: PropTypes.bool,
    value: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    sel: false,
    value: '',
    onClick: function () { },
  };

  render() {
    const { sel, value, onClick } = this.props;
    return (
      <View onClick={onClick} className={'menu-nav ' + (sel ? 'sel' : '')}>
        <View className='menu-nav-item'>
          {sel && <View className='select'></View>}
          <Text className={'text ' + (sel ? 'sel' : '')}>{value}</Text>
        </View>
      </View>
    )
  }
}

export default MenuNav;
