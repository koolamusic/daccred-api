/* CORS Middleware to prevent nightmares for the frontend guys */
import cors from 'cors';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

// type StaticOrigin = boolean | string | RegExp | (string | RegExp)[];
// type CorsOriginCallback = (err: Error | null, origin?: StaticOrigin) => void;
// type StringOrUndefined = string | undefined;

// const allowedOrigins = ['http://localhost:4200', '*'];

// @Middleware({ type: 'before' })
// export class CorsMiddleware implements ExpressMiddlewareInterface {
//   use = () =>
//     cors({
//       origin: function (origin: StringOrUndefined, callback: CorsOriginCallback) {
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//           const msg = 'The CORS policy for this api does not allow access from the specified Origin.';
//           return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//       },
//     });
// }

@Middleware({ type: 'before' })
export class CorsMiddleware implements ExpressMiddlewareInterface {
  use = () => cors();
}
