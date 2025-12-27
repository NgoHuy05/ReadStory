import rateLimit from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: {
    status: 429,
    message: 'Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút.'
  },
  standardHeaders: true,  
  legacyHeaders: false,  
});
