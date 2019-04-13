import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

class ListItem extends Component {
  static propTypes = {
    list: PropTypes.array,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    list: [],
    onClick: function () { },
  };
  handleClick = (item) => {
    const { onClick } = this.props;
    onClick(item);
  }

  render() {
    const list = this.props.list || [];
    return (
      <View className='list-item'>
        {list.map((item) => (
          <View
            key={item.id}
            className='cate-list__item'
            onClick={this.handleClick.bind(this, item)}
          >
            <View className='cate-list__item-box'>
              <Image className='cate-list__item-box-img' src={item.icon} />
            </View>
            <View className='cate-list__item-txt-wrap'>
              <Text className='cate-list__item-txt'>{item.name}</Text>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default ListItem;
