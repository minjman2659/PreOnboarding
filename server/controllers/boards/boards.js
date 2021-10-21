const usersList = require('../../models/usersList');
const boardsList = require('../../models/boardsList');
const {
  generateAccessToken,
  isAuthorized,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  get: (req, res) => {
    res.send('this is boards/get');
  },
};
