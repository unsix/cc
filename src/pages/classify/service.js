import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const selectReceptionCategoryList = data => Request({
  url: 'aliPay/category/selectReceptionCategoryList',
  data,
  method: 'GET',
});
