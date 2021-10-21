require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const secretKey = process.env.REFRESH_SECRET || 'tempKey';

module.exports = {
  generateRefreshToken: (data) => {
    return sign(data, secretKey, { expiresIn: '30d' });
  },
  sendRefreshToken: (res, refreshToken) => {
    // JWT 토큰을 쿠키로 전달합니다.
    if (process.env.CLIENT_URL) {
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    } else {
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
      });
    }
  },
  refreshAuthorized: (req) => {
    // JWT 토큰 정보를 받아서 검증합니다.
    if (!req.cookies) {
      return false;
    }
    const token = req.cookies.refreshToken;
    if (!token) {
      return false;
    } else {
      try {
        const tokenCheck = verify(token, secretKey);
        if (!tokenCheck) return false;
        return tokenCheck;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  },
};
