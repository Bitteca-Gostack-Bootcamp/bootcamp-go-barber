import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization
  const { secret } = authConfig.jwt

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, secret)

    const { sub } = decoded as TokenPayload

    req.user = {
      id: sub,
    }

    return next()
  } catch (error) {
    throw new AppError('Invalid JWT token', 401)
  }
}
