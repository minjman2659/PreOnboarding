const boardsList = require('../../models/boardsList');
const {
  generateAccessToken,
  isAuthorized,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  get: (req, res) => {
    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);
    const { userId } = req.query;

    if (userId) {
      //! 내가 쓴 글 목록 조회 API
      const accessTokenCheck = isAuthorized(req);
      const refreshTokenCheck = refreshAuthorized(req);
      if (!accessTokenCheck) {
        // accessToken 만료 / refreshToken 만료 (401)
        if (!refreshTokenCheck) {
          res.status(401).json({ message: 'Send new Login Request' });
        }
        // accessToken 만료 / refreshToken 유효 (201)
        else {
          delete refreshTokenCheck.exp;
          const accessToken = generateAccessToken(refreshTokenCheck);
          const myData = boardsList.filter(
            (el) => el.userId === Number(userId)
          );
          const returnData = myData.slice(offset, offset + limit);
          res.status(201).json({ accessToken, data: returnData });
        }
      }
      // accessToken 유효 (200)
      else {
        const myData = boardsList.filter((el) => el.userId === Number(userId));
        const returnData = myData.slice(offset, offset + limit);
        res.status(200).json({ data: returnData });
      }
    } else {
      //! 전체 글 목록 조회 API
      const returnData = boardsList.slice(offset, offset + limit);
      res.status(200).json({ data: returnData });
    }
  },
};
