import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const selectNewPackageList = () => Request({
  url: 'aliPay/product/selectNewPackageList',
  method: 'GET',
});

export const getNewPackage = data => Request({
  url: 'aliPay/coupon/getNewPackage',
  method: 'GET',
  data,
});