import { Middleware, WebMiddleware, provide} from 'midway';
import * as jwt from 'jsonwebtoken';

@provide()
export class ApiMiddleware implements WebMiddleware {


  resolve(): Middleware {
    return async (next: any) => {
      jwt.sign({
        data: 'foobar'
      }, 'secret', { expiresIn: 60 * 60 });
      
      await next();
    };
  }

}