import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const validateCode = () =>
  Request({
    url: 'aliPay/user/certification/validateCode',
    method: 'GET',
  });

export const sendSmsCode = data => 
  Request({
    url: 'aliPay/sendSms/sendSmsCode',
    method: 'GET',
    data,
  });

export const userCertificationAuth = data =>
  Request({
    url: 'aliPay/user/certification/userCertificationAuth',
    method: 'POST',
    data,
  });
export const decrypt = data =>
  Request({
    url: 'aliPay/components/decrypt',
    method: 'GET',
    data,
  });
