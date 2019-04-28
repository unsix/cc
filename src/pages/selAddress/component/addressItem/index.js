import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtCheckbox } from "taro-ui"
import './index.scss';

class AddressItem extends Component {
  handleChange = (value) => {
    // const { data, onClick } = this.props;
    // if (value.length) {
    //   onClick(data.currentPeriodsRent);
    // } else {
    //   onClick(-data.currentPeriodsRent);
    // }
    // console.log('check-box->', value);
    this.setState({
      checkedList: value
    })
  }

  state = {
    checkedList: [],
  }

  checkboxOption = [
    {
      value: 'list1',
      label: ' ',
    }
  ]
  render() {
    // const { title, display, iconShow, subText, desc } = this.props;
    const {data} = this.props
    return (
      <View className='address-item'>
        <View className='address-item-address'>
          <View>
            <Text className='text'>{data.name}</Text>
            <Text className='text right'>{data.telephone}</Text>
          </View>
          <View className='info'>
            <Text className='address'>{data.provinceStr}{data.cityStr}{data.areaStr}{data.street}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default AddressItem;
