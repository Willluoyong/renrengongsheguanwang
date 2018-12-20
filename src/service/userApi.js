import api from '@/common/http/api'


//获取手机验证
export function sendSmsCode(param)
{
  return api.resolvePost("/auth/getsmscode",param)
}
//获取邮箱验证码
export function sendMailCode(param) {
  return api.resolvePost("/user/sendMailCode",param)
}
//检查邮箱验证码
export function checkEmailCode(param){
  return api.resolvePost("/auth/checkEmail",param)
}
//检查手机验证码
export function checkSmsCode(param){
  return api.resolvePost("/user/checksmscode",param)
}
//用户注册
export function register(param) {
  return api.resolvePost("/auth/register",param)
}
//用户登录
export function login(param){
  return api.resolvePost("/auth/user/login",param)
}
//获取图形验证码
export function getVerifyCode(param){
  return api.resolvePost("/user/getCaptcha",param)
}
//检查图形验证码
export function checkVerifyCode(param){
  return api.resolvePost("/user/checkCaptcha",param)
}
//忘记密码
export function retrievePw(param){
  return api.resolvePost("/user/resetPassword",param)
}
//获取下载地址
export function getDownloadUrl(param) {
  return api.resolvePost('/apk/getNewVersion',param)  
}
//获取滑块验证码
export function getAuthBlockToken(param) {
  return api.resolvePost('/auth/blockToken',param)
}
//验证滑块验证码
export function checkBlockToken(param) {
  return api.resolvePost('/auth/checkBlockToken',param)
}
