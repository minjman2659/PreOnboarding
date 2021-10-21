const usersList = require('../../models/usersList');

module.exports = {
  get: async (req, res) => {
    const { email } = req.params;
    const emailCheck = usersList.filter((el) => el.email === email);
    if (emailCheck.length > 0) {
      res.status(409).json({ message: 'Already Existed' });
    } else {
      res.status(200).json({ message: 'OK' });
    }
  },
};
