import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { IAccessTokenResponseModel } from '../models/access-token.model';

const fileName = path.resolve(__dirname, './access_token.json');

const APPID = '';
const APPSECRET = '';

const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
async function updateAccessToken(): Promise<void> {
  const res = await axios.get<IAccessTokenResponseModel>(URL);

  if (res.status === 200 && res.data.access_token) {
    const data = {
      ...res.data,
      createTime: new Date(),
    };
    fs.writeFileSync(fileName, JSON.stringify(data));
    setTimeout(()=>{
      updateAccessToken();
    }, (data.expires_in - 300) * 1000);
  } else {
    await updateAccessToken();
  }
}

export async function getAccessToken(): Promise<string>{
  try {
    const accessTokenStr = fs.readFileSync(fileName, 'utf-8');
    const accessTokenObj: IAccessTokenResponseModel = JSON.parse(accessTokenStr);
    const createTime = new Date(accessTokenObj.createTime!);
    if(Date.now() - createTime.getTime() > (accessTokenObj.expires_in - 300) * 1000){
      await updateAccessToken();
      return getAccessToken();
    }
    return accessTokenObj.access_token;
  } catch (error) {
    await updateAccessToken();
    return getAccessToken();
  }
}

