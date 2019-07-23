import { Middleware, WebMiddleware, provide, Context} from 'midway';

@provide()
export class ApiMiddleware implements WebMiddleware {

  resolve(): Middleware {
    return async (ctx: Context, next: any) => {
      const userId = ctx.session.userId;
      if(!userId){
        ctx.redirect('/login');
      }
      await next();
    };
  }

}