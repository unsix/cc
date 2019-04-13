import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const selectByPraentIdToName = data =>
  Request({
    url: 'aliPay/userAddress/selectByPraentIdToName',
    method: 'GET',
    data,
  });

export const insertAddress = data =>
  Request({
    url: 'aliPay/userAddress/insertAddress',
    method: 'POST',
    data,
  });

export const updateAddress = data =>
  Request({
    url: 'aliPay/userAddress/updateAddress',
    method: 'POST',
    data,
  });

export const deleteAddress = data =>
  Request({
    url: 'aliPay/userAddress/deleteAddress',
    method: 'GET',
    data,
  });
  
export const selectByAddressListByUid = data =>
  Request({
    url: 'aliPay/userAddress/selectByAddressListByUid',
    method: 'GET',
    data,
  });

