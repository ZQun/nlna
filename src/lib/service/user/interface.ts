import { Context } from 'midway';
/**
 * @description User-Service response
 */
export interface IUserResult {
  id: number;
  email: string;
  code: string;
  data: number;
  islive: boolean;
  password: string;
}

/**
 * @description User-Service abstractions
 */
export interface IUserService {
  getUser(ctx: Context): Promise<IUserResult>;
}
