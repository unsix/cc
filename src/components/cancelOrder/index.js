import Taro, { Component } from '@tarojs/taro';
import { View, RadioGroup, Radio, Label, Text, Button } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import './index.scss';

class CancelOrder extends Component {

  state = {
    value: null
  }

  handleChange = (e) => {
    this.setState({ value: e.detail.value });
  }

  onOk = () => {
    const { onOk } = this.props;
    const { value } = this.state;
    onOk(value);
  }

  render() {
    const { display, onCancal ,cancelOrderList } = this.props;
    return (
      <AtModal isOpened={display}>
        <AtModalHeader>取消订单</AtModalHeader>
        <AtModalContent>
          <View className='cancelOrder'>
            <View className='text'>取消原因</View>
            <RadioGroup className='radioGroup' onChange={this.handleChange}>
              {/*<Label className='label'>*/}
              {/*  <Radio value='想要重新下单' className='radio' checked={this.state.value === '想要重新下单'} /><Text className='radioText'>想要重新下单</Text>*/}
              {/*</Label>*/}
              {/*<Label className='label'>*/}
              {/*  <Radio value='商品价格较贵' className='radio' /><Text className='radioText'>商品价格较贵</Text>*/}
              {/*</Label>*/}
              {/*<Label className='label'>*/}
              {/*  <Radio value='等待时机较长' className='radio' /><Text className='radioText'>等待时机较长</Text>*/}
              {/*</Label>*/}
              {/*<Label className='label'>*/}
              {/*  <Radio value='是想了解流程' className='radio' /><Text className='radioText'>是想了解流程</Text>*/}
              {/*</Label>*/}
              {/*<Label className='label'>*/}
              {/*  <Radio value='不想要了' className='radio' /><Text className='radioText'>不想要了</Text>*/}
              {/*</Label>*/}
              { cancelOrderList.map(item=>(
                <Label className='label'>
                  <Radio value={item.value} className='radio'  /><Text className='radioText'>{item.value}</Text>
                </Label>
              ))}
            </RadioGroup>
          </View>
        </AtModalContent>
        <AtModalAction className='modailAction'>
          <Button onClick={onCancal}>暂不取消</Button>
          <Button className='conform' onClick={this.onOk}>确认取消</Button>
        </AtModalAction>
      </AtModal>
    )
  }
}

export default CancelOrder;
