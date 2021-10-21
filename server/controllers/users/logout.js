const { sendRefreshToken } = require('../tokenFunction/refreshToken');

module.exports = {
  post: async (req, res) => {
    sendRefreshToken(res, null);
    res.status(200).json({ accessToken: null, message: 'OK' });
  },
};
