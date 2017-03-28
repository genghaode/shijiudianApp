#### 请求方式：按照restful规范
- GET 请求/查询数据
- POST 新增数据
- PUT 修改数据
- DELETE 删除数据

##### 接口返回格式
- 成功示例
```
{
  code: 0,
  errorMessage: '',
  data: {}
}
```
- 失败示例
```
{
  code: 201,
  errorMessage: '请登录',
  data: null
}
```
- code码定义：
    * 0 成功
    * 201 用户需要登录
    * 1000 其他错误

#### TOKEN：为了让APP和服务端保持状态同步,需要服务端生成一个TOKEN
- 在第一次请求时，如果请求的header里没有token，则服务器生成一个16位的token值，返回给客户端
- 客户端将token值缓存到本地
- 每次请求，客户端都会将token放入请求的header中
- 服务器端接收到请求时，验证token是否有效，无效则返回201
- 客户端收到201后，清除本地缓存token并跳转到登录页







