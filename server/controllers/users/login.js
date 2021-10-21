const usersList = require('../../models/usersList');
const { generateAccessToken } = require('../tokenFunction/accessToken');
const {
  generateRefreshToken,
  sendRefreshToken,
} = require('../tokenFunction/refreshToken');
const { comparePwd } = require('../hashFunction/hashingPwd');

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    const userInfo = usersList.filter((el) => el.email === email);
    if (userInfo.length === 0) {
      res.status(401).json({ message: 'Wrong Email' });
    } else {
      console.log(userInfo[0]);
      if (!comparePwd(password, userInfo[0].password)) {
        res.status(401).json({ message: 'Wrong Password' });
      } else {
        let returnUserInfo = userInfo[0];
        delete returnUserInfo.password;
        const accessToken = generateAccessToken(returnUserInfo);
        const refreshToken = generateRefreshToken(returnUserInfo);
        sendRefreshToken(res, refreshToken);
        res.status(200).json({ accessToken, userInfo: returnUserInfo });
      }
    }
  },
};
