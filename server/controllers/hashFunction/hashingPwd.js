require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
  encryptPwd: (unhashedPwd) => {
    const salt = bcrypt.genSaltSync(10);
    const encrypted = bcrypt.hashSync(unhashedPwd, salt);
    return encrypted;
  },

  comparePwd: (decryptedPwd, encryptedPwd) => {
    const compare = bcrypt.compareSync(decryptedPwd, encryptedPwd);
    console.log('비교:', compare);
    return compare; // boolean
  },
};
