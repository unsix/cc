import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const selectShopProductList = data => Request({
  url: 'aliPay/product/selectShopProductListAndShop',
  method: 'GET',
  data,
});
