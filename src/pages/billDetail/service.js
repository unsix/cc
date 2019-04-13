import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const selectOrderByStagesList = (data) => Request({
  url: 'aliPay/orderByStages/selectOrderByStagesList',
  method: 'GET',
  data,
});

export const orderbyStagesPay = data => Request({
  url: 'aliPay/orderByStages/orderbyStagesPay',
  method: 'POST',
  data,
});