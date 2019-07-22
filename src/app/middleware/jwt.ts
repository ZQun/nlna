import { Middleware, WebMiddleware, provide, Context} from 'midway';
import * as jwt from 'jsonwebtoken';

@provide()
export class ApiMiddleware implements WebMiddleware {

  resolve(): Middleware {
    return async (ctx: Context, next: any) => {
      let token = await jwt.sign({
        data: 'foobar'
      }, 'secret', { expiresIn: 60 * 60 });
      console.log(token);
      let name = await jwt.verify(token, 'secret');
      console.log(name);
      await next();
    };
  }

}