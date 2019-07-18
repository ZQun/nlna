import { provide, Context, inject } from 'midway';
import { IUserService, IUserResult } from './interface';

@provide('userService')
export class UserService implements IUserService {
  
  @inject()
  ctx: Context;

  async getUser(email: string): Promise<IUserResult> {
    let user = await this.ctx.model.User.find({email});
    return user;
  }
  async createUser(user: any): Promise<any> {
    
  }
}
