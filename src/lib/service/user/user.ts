import { provide, Context, inject } from 'midway';
import { IUserService, IUserResult } from './interface';

@provide('userService')
export class UserService implements IUserService {
  
  @inject()
  ctx: Context;

  async getUser(email: string): Promise<IUserResult> {
    let user = await this.ctx.model.User.findOne({email: email});
    return user;
  }
  async createUser(user: any): Promise<any> {
    let result = await this.ctx.model.User.create(user);
    return result;
  }
}
