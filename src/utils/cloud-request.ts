import axios from 'axios';
import { CLOUD_ENV } from './constants';
import { getAccessToken } from './get-access-token';

export default async function cloudFnCall(cloudFunctionName: string, ...args: any[]) {
  const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${await getAccessToken()}&env=${CLOUD_ENV}&name=${cloudFunctionName}`;
  return axios.create({
    timeout: 15000
  }).post(url, ...args);
}
