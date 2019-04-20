
# 技术栈
React + Taro + Taro UI + Dva + sess + ES6/ES7

## 使用了WxValidate做表单验证
引用目录 `/src/utils/h5Validate.js`

使用方法
`https://github.com/skyvow/wx-extend/blob/master/docs/components/validate.md`

## 项目运行

```
git clone git@gitlab.zudeapp.com:qckj/qc_bussiness_h5.git

cd qc_bussiness_h5

# 全局安装taro脚手架
npm install -g @tarojs/cli

# 安装项目依赖
npm install

# 支付宝小程序开发环境编译
npm run dev:alipay

# 支付宝小程序线上环境编译
npm run build:alipay

# pages模版快速生成 
npm run tep `文件名`

```

## 注意

需要将pages中各个model.js引入 ./src/models/index中

