import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const selectCategoryProduct = data => Request({
  url: 'aliPay/category/selectCategoryProduct',
  method: 'POST',
  data,
  contentType: 'application/json',
});

export const productSearch = data => Request({
  url: 'aliPay/product/productSearch',
  method: "POST",
  contentType: 'application/json',
  data,
});
