import { getAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';
import { CustomJwtSessionClaims } from '@repo/types';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}


export const shouldBeUser = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  if (!auth.userId) {
    return res.status(401).json({ message: 'User not authenticated' });

  }
  req.userId = auth.userId;
  next();
}

export const shouldBeAdmin = (req: Request, res: Response, next: NextFunction) => {

  const auth = getAuth(req);
  console.log(req.headers.authorization);

  if (!auth.userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  const claims = auth.sessionClaims as unknown as CustomJwtSessionClaims;
  if (claims.metadata?.role !== 'admin') {
    return res.status(403).json({ message: 'User not authorized' });
  }
  next();

}