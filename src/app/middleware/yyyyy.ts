import { Middleware, WebMiddleware, provide, inject, Context } from 'midway';

@provide()
export class JwtMiddleware implements WebMiddleware {

    
    @inject()
    ctx: Context;
    
    resolve(): Middleware {
        
    }

}