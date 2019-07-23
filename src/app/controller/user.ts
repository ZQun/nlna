import { Context, controller, get, inject, provide, plugin, post} from 'midway';
import { IUserService, IUserResult } from '../../lib/service/user/interface';


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
    if(user && user.email && user.data > new Date().getTime()){
      this.ctx.body = {
        code: 0,
        msg: '已发送验证码！'
      }
      return;
    }else if(user && user.email && user.islive){
      this.ctx.body = {
        code: 0,
        msg: '邮箱已激活！'
      }
      return;
    };
    let code = Math.round(Math.random()*100000);
    let result = {};
    if(user){
      result = await this.service.updateUser({
        email: emial,
        code: code,
        data: new Date().getTime() + (30 * 60 * 1000),
        islive: false
      });
    } else {
      result = await this.service.createUser({
        email: emial,
        code: code,
        data: new Date().getTime() + (30 * 60 * 1000),
        islive: false
      });
    }
    if(result){
      this.ctx.body = await this.email.sendEmail('验证码', code, emial);
    }else{
      this.ctx.body = {
        code: 0,
        msg: '发送失败！'
      }
    }
  }

  @post('/register')
  async register(): Promise<void> {
    let userdata = this.ctx.request.body;
    const createRule = {
      email: 'email',
      code: 'string',
      password: 'password'
    };
    this.ctx.validate(createRule, userdata);
    let user: IUserResult = await this.service.getUser(userdata.email);
    if(!user){
      this.ctx.body = {
        code: 0,
        msg: '请发送验证码！'
      };  
      return;
    }
    if(user.data < new Date().getTime()){
      this.ctx.body = {
        code: 0,
        msg: '验证码过期！'
      };
    } else if (user.islive){
      this.ctx.body = {
        code: 0,
        msg: '邮箱已激活！'
      };
    } else if(user.code != userdata.code){
      this.ctx.body = {
        code: 0,
        msg: '验证码错误！'
      };
    } else {
      let result = await this.service.updateUser({
        email: userdata.email,
        code: userdata.code,
        data: new Date().getTime() + (30 * 60 * 1000),
        islive: true,
        password: userdata.password
      });
      if(result){
        this.ctx.body = {
          code: 0,
          msg: '注册成功！'
        };
      } else {
        this.ctx.body = {
          code: 0,
          msg: '注册失败！'
        };
      }
    }
  }

  @post('/login')
  async login(): Promise<void> {
    let userdata = this.ctx.request.body;
    const createRule = {
      email: 'email',
      password: 'password'
    };
    this.ctx.validate(createRule, userdata);
    let user: IUserResult = await this.service.getUser(userdata.email);
    if(!user){
      this.ctx.body = {
        code: 0,
        msg: '邮箱未注册！'
      };  
      return;
    } else if(user.password != userdata.password) {
      this.ctx.body = {
        code: 0,
        msg: '密码不正确！'
      };  
      return;
    } else { 
      this.ctx.session.userId = user.id;
      this.ctx.body = {
        code: 1,
        msg: '登录成功！'
      }; 
    }
  }
  
}
