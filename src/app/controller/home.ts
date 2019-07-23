import { Context, controller, inject, get, provide } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @get('/index')
  async index() {
    await this.ctx.render('index.nj',{title: '首页'});
  }

  @get('/register')
  async register() {
    await this.ctx.render('registered.nj', {title: '注册'});
  }

  @get('/login')
  async login() {
    await this.ctx.render('login.nj', {title: '登录'});
  }
}
