import menu from '../mine/menu';

const nav = [...menu];
nav.unshift({
  id: 'all',
  text: '全部订单',
});

export default nav;
