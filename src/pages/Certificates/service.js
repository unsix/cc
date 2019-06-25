import Request from '../../utils/request';

export const upLoad = data => Request({
  url: 'aliPay/user/userIdCardPhoto/upLoad',
  method: 'POST',
  data,
});

export const getUserIdCardPhotoInfo = data => Request({
  url: 'aliPay/user/userIdCardPhoto/getUserIdCardPhotoInfo',
  method: 'GET',
  data,
});
export const updateUpLoad = data => Request({
  url: 'aliPay/user/userIdCardPhoto/updateUpLoad',
  method: 'POST',
  data,
});
