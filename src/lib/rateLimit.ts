import rateLimit from 'express-rate-limit'
import { NextApiResponse } from 'next'

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later',
  handler: (_, res: NextApiResponse) => {
    res.status(429).json({ error: 'Too many requests, please try again later' })
  },
})