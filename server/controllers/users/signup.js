const usersList = require('../../models/usersList');
const { encryptPwd } = require('../hashFunction/hashingPwd');

module.exports = {
  post: async (req, res) => {
    const { email, username, password } = req.body;
    console.log('해싱 전 패스워드 : ', password);
    const encryptedPw = encryptPwd(password);
    let newUserId = usersList.length + 1;
    usersList.push({
      id: newUserId,
      email,
      username,
      password: encryptedPw,
    });
    res.status(200).json({ message: 'OK' });
  },
};
