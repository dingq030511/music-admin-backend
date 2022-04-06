import Router from 'koa-router';
import cloudFnCall from '../utils/cloud-request';

const router = new Router();

router.get('/list',async (ctx, next) => {
  const params = {
    $url: 'playlist',
    start: 0,
    pageSize: 10,
  }
  const res = await cloudFnCall('music', params);
  res.data.resp_data = JSON.parse(res.data.resp_data);
  ctx.body = res.data;
});

export default router;