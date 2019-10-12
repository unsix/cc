import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text,Form} from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import './index.scss';

class Channel extends Component {

  handleGotoProduct(itemId) {
    const { onGotoProduct } = this.props;
    onGotoProduct(itemId);
  }

  handleGotoMore(url) {
    const { onGoToMore } = this.props;
    onGoToMore(url);
  }
  render() {
    const { products,  oldNewDegreeList } = this.props;
    console.log(products,'channel')
    return (

      <View className='channel'>
        <View className='channel-list'>
          {!!products && !!products.length && products.map(product => (
            <View className='channel-list-item' onClick={this.handleGotoProduct.bind(this, product.itemId)}>
              <View className='channel-list-item-img'>
                <Image className='channel-list-item-img-box' mode='aspectFit' src={product.image} />
              </View>
              <View className='channel-list-item-title'>
                <View className='title'>
                  {/*<Text className='text'></Text>*/}
                  <Text className='name'>
                    <Text className={`oldNewDegree ${product.oldNewDegree - 1 === 0 && 'oldNewDegree-active'} `}>{oldNewDegreeList[product.oldNewDegree - 1]}</Text>
                    <Text>{product.name}</Text>
                    {/*className={`text ${shopType === item.id && 'text-active'}`}*/}
                  </Text>
                </View>
                <View className='price'>
                  <Text className='box'>
                    <Text className='bol'>¥</Text>
                    {/*<Text className='num'>{String(product.price).split('.')[0]}</Text>元/天*/}
                    <Text className='num'>{Number(product.price).toFixed(2)}</Text>/天
                    {/*{String(product.price).split('.')[1] ? `.${String(product.price).split('.')[1]}` : ''} */}
                  </Text>
                  <Text className='days'> {product.minDays}天</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}

export default Channel;
