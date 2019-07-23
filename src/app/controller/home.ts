import { Context, controller, inject, get, provide } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @get('/index')
  async index() {
    let email = this.ctx.session.userEmail;
    await this.ctx.render('index.nj',{title: '首页', email: email});
  }

  @get('/seting')
  async seting() {
    let email = this.ctx.session.userEmail;
    await this.ctx.render('seting.nj',{title: '设置', email: email});
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
