import Taro from '@tarojs/taro';

const storageStr = 'alipay-h5-x-';

export function setUid(uid) {
  if (uid) {
    return Taro.setStorageSync(`${storageStr}-uid`, uid);
  }
}

export function getUid(str) {
  const tokenString =
    typeof str === 'undefined' ? Taro.getStorageSync(`${storageStr}-uid`) : Taro.getStorageSync(str);
  return tokenString;
}

export function setBuyerId(buyerId) {
  if(buyerId){
    return Taro.setStorageSync(`${storageStr}-buyerId`, buyerId);
  }
}

export function getBuyerId(str) {
  const tokenString =
    typeof str === 'undefined' ? Taro.getStorageSync(`${storageStr}-buyerId`) : Taro.getStorageSync(str);
  return tokenString;
}

export function setUserName(name) {
  if(name){
    return Taro.setStorageSync(`${storageStr}-userName`, name);
  }
}
export function setAvatar(name) {
  if(name){
    return Taro.setStorageSync(`${storageStr}-avatar`, name);
  }
}
export function getAvatar(str) {
  const currStr =
    typeof str === 'undefined' ? Taro.getStorageSync(`${storageStr}-avatar`) : Taro.getStorageSync(str);
  return currStr;
}
export function getUserName(str) {
  const currStr =
    typeof str === 'undefined' ? Taro.getStorageSync(`${storageStr}-userName`) : Taro.getStorageSync(str);
  return currStr;
}

export function setTelephone(phone) {
  if(phone){
    return Taro.setStorageSync(`${storageStr}-telephone`, phone);
  }
}

export function getTelephone(str) {
  const currStr =
    typeof str === 'undefined' ? Taro.getStorageSync(`${storageStr}-telephone`) : Taro.getStorageSync(str);
  return currStr;
}
