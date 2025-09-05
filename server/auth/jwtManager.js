import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY || 'secret-key';

export const sign = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verify = (token, next) => {
    return jwt.verify(token, SECRET_KEY);
};

export const addToken = (res, token, time = 3600000) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: time,
        sameSite: 'lax',
    });
};

export const clearToken = (res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
};

export const getToken = (req) => {
    return req.cookies?.token || null;
};
