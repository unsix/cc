import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const getUserAllAddressList = data =>
  Request({
    url: 'aliPay/userAddress/getUserAllAddressList',
    method: 'GET',
    data,
  });

export const saveZhifubaoAddress = data =>
  Request({
    url: 'aliPay/userAddress/saveZhifubaoAddress',
    method: 'POST',
    data,
  });
