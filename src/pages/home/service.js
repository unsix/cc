import Request from '../../utils/request';

export const IndexList = (data) => {
  return Request({
    url: 'aliPay/index/getIndexActionList',
    method: 'GET',
    data,
  });
};
