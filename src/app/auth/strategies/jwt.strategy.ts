/* JWT Service to handle all JWT Concerns */
import jwt from 'jsonwebtoken';
import config from '../../../infra/config';
import { IJWTClaim, IJWTClaimConf } from '../../shared/definitions';

type JwtClaimOptions = IJWTClaim & IJWTClaimConf;

export class JwtStrategy {
  public sign(claim: IJWTClaim) {
    const token = jwt.sign(claim, config.SECRET_KEY, {
      expiresIn: config.TOKEN_EXPIRE,
      issuer: config.JWT_ISSUER,
      audience: config.JWT_AUD,
      algorithm: 'HS256',
    });

    return token;
  }

  public verify(token: string) {
    const claim = jwt.verify(token, config.SECRET_KEY, {
      issuer: config.JWT_ISSUER,
      audience: config.JWT_AUD,
      algorithms: ['HS256'],
    }) as JwtClaimOptions;

    return claim;
  }
}
