import Request from '../../utils/request';

export const getNewcomerTaskConfigVoByUid = data => Request({
  url: 'alipay/user/newcomerTask/getNewcomerTaskConfigVoByUid',
  method: 'GET',
  data,
});
