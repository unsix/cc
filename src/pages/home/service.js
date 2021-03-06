import Request from '../../utils/request';

export const IndexList = (data) => {
  return Request({
    url: 'aliPay/index/getIndexActionList',
    method: 'GET',
    data,
  });
};
export const getIndexActionListByPage = (data) => {
  return Request({
    url: 'aliPay/index/getIndexActionListByPage',
    method: 'GET',
    data,
  });
};
export const getZhifubaoFlow = (data) => {
  return Request({
    url: 'aliPay/index/getZhifubaoFlow',
    method: 'GET',
    data,
  });
};

export const getIndexTabAndProduct = (data) => {
  return Request({
    url: 'aliPay/index/getIndexTabAndProductByPage',
    method: 'GET',
    data,
  });
};
export const newcomerVerification = (data) => {
  return Request({
    url: 'alipay/user/newcomerTask/newcomerVerification',
    method: 'POST',
    data,
  });
};
