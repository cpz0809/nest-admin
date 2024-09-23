export const ExceptionEnum = {
  HANDLE_ERROR: { code: 10000, message: '操作失败' },
  DATA_IS_NOT_EMPTY: { code: 10001, message: '数据已存在' },
  PARAMS_ERROR: { code: 10002, message: '参数错误' },
  NOT_NULL_USER_NAME: { code: 10011, message: '用户名不能为空' },
  NOT_NULL_PASS_WORD: { code: 10012, message: '密码不能为空' },
  NOT_NULL_USER_NIKE: { code: 10013, message: '用户昵称不能为空' },
  USER_NULL: { code: 10014, message: '用户不存在' },
};
