import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const insertHistory = data => Request({
  url: 'aliPay/user/search/insertHistory',
  method: 'POST',
  data,
});

export const selectHistory = data => Request({
  url: 'aliPay/user/search/selectHistory',
  method: 'POST',
  data,
});

export const deleteHistory = data => Request({
  url: 'aliPay/user/search/deleteHistory',
  method: 'POST',
  data,
});