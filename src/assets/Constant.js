export const customerServiceTel = '15158129875'; // 客服电话
export const orderStatus = {
  ORDER_VERDUE:'逾期',
  WAITING_PAYMENT: '待付款',
  USER_OVERTIME_PAYMENT_CLOSED: '支付超时取消',
  USER_DELETE_ORDER: '用户删除订单',
  USER_CANCELED_CLOSED: '用户取消订单',
  PLATFORM_CLOSE_ORDER: '平台关闭订单',
  USER_PAY_FAIL_CLOSE: '系统关单',
  WAITING_BUSINESS_DELIVERY: '待商家发货',
  BUSINESS_CLOSE_ORDER: '商家关闭订单',
  BUSINESS_OVERTIME_CLOSE_ORDER: '商家超时发货关闭订单',
  WAITING_USER_RECEIVE_CONFIRM: '待用户收货',
  WAITING_GIVE_BACK: '待归还（租用中）',
  WAITING_CONFIRM_SETTLEMENT: '待结算',
  WAITING_SETTLEMENT: '待商家出具结算单',
  WAITING_SETTLEMENT_PAYMENT: '待用户支付结算单',
  SETTLEMENT_RETURN_CONFIRM_PAY: '已逾期',
  ALREADY_FREEZE: '已冻结',
  WAITING_BUSINESS_CONFIRM_RETURN_REFUND: '待商家确认退货退款',
  BUSINESS_REFUSED_RETURN_REFUND: '商家拒绝退货退款',
  WAITING_USER_RETURN: '待退货',
  WAITING_REFUND: '待退款',
  WAITING_BUSINESS_RECEIVE_CONFIRM: '商家确认收货',
  SETTLEMENT_WITHOUT_PAYMENT_OVERTIME_AUTOCONFIRM: '自动确认结算',
  SETTLEMENT_WITH_PAYMENT_OVERTIME: '结算支付超时',
  GIVING_BACK: '归还中',
  ORDER_FINISH: '订单完成',
  WAITING_EVALUATION: '待评价',
  ALREADY_EVALUATION: '已评价',
  PENALTY_WAITING_SETTLEMENT: '违约金结算中',
  WAITING_BUCKLE_SETTLEMENT: '代扣结算中',
  RC_REJECT :'风控关单退款'
};


// // 用户取消订单
// public static final String USER_CANCELED_CLOSED = "USER_CANCELED_CLOSED";
// // 已冻结
// public static final String ALREADY_FREEZE = "ALREADY_FREEZE";
// // 待支付
// public static final String WAITING_PAYMENT = "WAITING_PAYMENT";
// // 用户超时支付关闭订单
// public static final String USER_OVERTIME_PAYMENT_CLOSED = "USER_OVERTIME_PAYMENT_CLOSED";
// // 用户删除订单
// public static final String USER_DELETE_ORDER = "USER_DELETE_ORDER";
// // 平台关闭订单
// public static final String PLATFORM_CLOSE_ORDER = "PLATFORM_CLOSE_ORDER";
// // 商家超时发货关闭订单
// public static final String BUSINESS_OVERTIME_CLOSE_ORDER = "BUSINESS_OVERTIME_CLOSE_ORDER";
// // 商家关闭订单
// public static final String BUSINESS_CLOSE_ORDER = "BUSINESS_CLOSE_ORDER";
// // 待商家发货
// public static final String WAITING_BUSINESS_DELIVERY = "WAITING_BUSINESS_DELIVERY";
// // 待用户确认收货
// public static final String WAITING_USER_RECEIVE_CONFIRM = "WAITING_USER_RECEIVE_CONFIRM";
// // 待商家确认退货退款
// public static final String WAITING_BUSINESS_CONFIRM_RETURN_REFUND = "WAITING_BUSINESS_CONFIRM_RETURN_REFUND";
// // 商家拒绝退货退款
// public static final String BUSINESS_REFUSED_RETURN_REFUND = "BUSINESS_REFUSED_RETURN_REFUND";
// // 待退货
// public static final String WAITING_USER_RETURN = "WAITING_USER_RETURN";
// // 待退款
// public static final String WAITING_REFUND = "WAITING_REFUND";
// // 待商家确认收货
// public static final String WAITING_BUSINESS_RECEIVE_CONFIRM = "WAITING_BUSINESS_RECEIVE_CONFIRM";
// // 租用中
// public static final String WAITING_GIVE_BACK = "WAITING_GIVE_BACK";
// // 待结算
// public static final String WAITING_SETTLEMENT = "WAITING_SETTLEMENT";
// // 待确认结算端(C端确认)
// public static final String WAITING_CONFIRM_SETTLEMENT = "WAITING_CONFIRM_SETTLEMENT";
// // 出结算单后的待支付
// public static final String WAITING_SETTLEMENT_PAYMENT = "WAITING_SETTLEMENT_PAYMENT";
// // 自动确认结算
// public static final String SETTLEMENT_WITHOUT_PAYMENT_OVERTIME_AUTOCONFIRM = "SETTLEMENT_WITHOUT_PAYMENT_OVERTIME_AUTOCONFIRM";
// // 结算支付超时
// public static final String SETTLEMENT_WITH_PAYMENT_OVERTIME = "SETTLEMENT_WITH_PAYMENT_OVERTIME";
// // 归还中 只在核销时起作用
// public static final String GIVING_BACK = "GIVING_BACK";
// //订单完成
// public static final String ORDER_FINISH = "ORDER_FINISH";
// // 待评价
// public static final String WAITING_EVALUATION = "WAITING_EVALUATION";
// // 已评价
// public static final String ALREADY_EVALUATION = "ALREADY_EVALUATION";
// // 违约金待结算中
// public static final String PENALTY_WAITING_SETTLEMENT = "PENALTY_WAITING_SETTLEMENT";
// //代扣结算中
// public static final String WAITING_BUCKLE_SETTLEMENT="WAITING_BUCKLE_SETTLEMENT";
// // 已生成借还订单，其角色类似“待支付”
// public static final String JH_CREATED = "JH_CREATED";
// // 平台风控评估中，底层状态，前端展示比如：订单录入中，商家可取消订单
// public static final String RC_REVIEW = "RC_REVIEW";
// // 风控拒绝，底层状态，前端展示比如：？？风控关单退款
// public static final String RC_REJECT = "RC_REJECT";
// //风控失败
// public static final String RISK_EXCEPTION = "RISK_EXCEPTION";

// //待支付 已冻结 已生成借还订单
// public static final String WAITING_PAYMENT_COUNT =  "WAITING_PAYMENT,ALREADY_FREEZE,JH_CREATED";

// public static final String WAITING_USER_RECEIVE_CONFIRM_COUNT =  "WAITING_USER_RECEIVE_CONFIRM,WAITING_BUSINESS_DELIVERY";

// public static final String WAITING_SETTLEMENT_COUNT =  "WAITING_SETTLEMENT,WAITING_CONFIRM_SETTLEMENT,WAITING_SETTLEMENT_PAYMENT,GIVING_BACK";

// //商家已再次改价
// public static final String ALREADY_DO_SETTLEMENT_AGAIN = "ALREADY_DO_SETTLEMENT_AGAIN";

// //结算单违约金支付逾期
// public static final String SETTLEMENT_RETURN_CONFIRM_PAY = "SETTLEMENT_RETURN_CONFIRM_PAY";

// //归还成功 准备出结算单
// public static final String GIVE_BACK_WAITING_ALREADY_PRINT = "GIVE_BACK_WAITING_ALREADY_PRINT";

// //自动推进待结算,无物流信息
// public static final String AUTO_ALREADY_PRINT = "AUTO_ALREADY_PRINT";

// //子状态
// //用户可申请改价
// public static final String CAN_SEND_DO_SETTLEMENT_AGAIN_FOR_USER = "CAN_SEND_DO_SETTLEMENT_AGAIN_FOR_USER";

// //归还成功 用户申请修改结算单中 （结算单状态）
// public static final String USER_APPLICATION_CHANGE_SETTLEMENT = "USER_APPLICATION_CHANGE_SETTLEMENT";
