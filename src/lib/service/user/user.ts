import { provide, Context, inject } from 'midway';
import { IUserService, IUserResult } from './interface';

@provide('userService')
export class UserService implements IUserService {
  
  @inject()
  ctx: Context;

  async getUser(ctx: Context): Promise<IUserResult> {
    console.log(ctx.model.User,"yyyyyyyyyyyy");
    let user = await this.ctx.model.User.find({});
    return user;
  }
}
