import Koa from 'koa';
import Router from 'koa-router';
import playlist from './controller/playlist';

const app = new Koa();
const router = new Router();

router.use('/playlist', playlist.routes());

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('服务已启动，监听3000端口');
  console.log('访问地址：http://localhost:3000');
});