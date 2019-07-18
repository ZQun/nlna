import { Context, controller, get, inject, provide, plugin  } from 'midway';
import { IUserService, IUserResult } from '../../lib/service/user/interface'


@provide()
@controller('/user')
export class UserController {

  @inject()
  ctx: Context;

  @plugin('email')
  email: any;

  @inject('userService')
  service: IUserService;

  @get('/sendemail')
  async sendEmail(): Promise<void> {
    this.ctx.body = await this.email.sendEmail('test','<h1>11111</h1>','932812871@qq.com');
  }

  @get('/')
  async getUser(ctx: Context): Promise<void> {
    const user: IUserResult = await this.service.getUser(ctx);
    ctx.body = {success: true, message: 'OK', data: user};
  }
  
}
