import { Context, controller, inject, get, provide } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @get('/')
  async index() {
    await this.ctx.render('index.nj');
  }
  @get('/register')
  async register() {
    await this.ctx.render('registered.nj');
  }
}
