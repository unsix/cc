import Request from '../../utils/request';

export const getNewcomerTaskConfigVoByUid = data => Request({
  url: 'alipay/user/newcomerTask/getNewcomerTaskConfigVoByUid',
  method: 'GET',
  data,
});

export const startNewTask = data => Request({
  url: 'alipay/user/newcomerTask/startNewTask',
  method: 'POST',
  data,
});
export const listTaskCompleteMessage = data => Request({
  url: 'alipay/user/newcomerTask/listTaskCompleteMessage',
  method: 'GET',
  data,
});
