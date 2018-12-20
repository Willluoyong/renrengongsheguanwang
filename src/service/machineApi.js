import api from '@/common/http/api'

//获得矿机商品列表
export function getMachineList(param)
{
  return api.resolvePost("/cloud/machine/getMachineList",param)
}
//获得矿机详情
export function getMachineInfo(param)
{
  return api.resolvePost("/cloud/machine/getMachineInfo",param)
}
//生成订单
export function insertOrder(param)
{
  return api.resolvePost("/cloud/order/insertOrder",param)
}
//获取矿机所有者的上级用户
export function getSuperior(param)
{
  return api.resolvePost("/cloud/team/getSuperior",param)
}

//线下支付
export function offlinePaymentOrder(param)
{
  return api.resolvePost("/cloud/machine/offlinePaymentOrder",param)
}