import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'secret-key';

export const sign = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verify = (token, next) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next();
  }
};

export const writeToCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 1000,
    sameSite: 'lax',
  });
};

export const getFromCookie = (req) => {
  return req.cookies?.token || null;
};
