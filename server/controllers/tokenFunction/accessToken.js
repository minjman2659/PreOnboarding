require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    // Access token 생성
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '2h' });
  },
  isAuthorized: (req) => {
    // JWT 토큰 검증
    if (!req.headers.authorization) {
      return false;
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return false;
    } else {
      try {
        const tokenCheck = verify(token, process.env.ACCESS_SECRET);
        if (!tokenCheck) return false;
        return tokenCheck;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  },
};
