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
    let emial = this.ctx.query.email;
    let user: IUserResult = await this.service.getUser(emial);
    if(user.email && user.data > new Date().getTime()){
      this.ctx.body = {
        code: 0,
        msg: '已发送验证码！'
      }
      return;
    }else if(user.email && user.islive){
      this.ctx.body = {
        code: 0,
        msg: '邮箱已激活！'
      }
      return;
    };
    let code = Math.round(Math.random()*100000);
    let result = await this.service.createUser({
      email: emial,
      code: code,
      data: new Date().getTime() + (30 * 60 * 1000),
      islive: false
    });
    if(result.email == emial){
      this.ctx.body = await this.email.sendEmail('验证码', code, emial);
    }else{
      this.ctx.body = {
        code: 0,
        msg: '发送失败！'
      }
    }
  }

  @get('/')
  async getUser(ctx: Context): Promise<void> {
    const user: IUserResult = await this.service.getUser('9328128@qq.com');
    console.log(user.email);
    ctx.body = {success: true, message: 'OK', data: user.email};
  }
  
}
