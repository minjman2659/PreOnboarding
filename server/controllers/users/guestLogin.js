module.exports = {
  post: (req, res) => {
    res.status(200).json({
      userInfo: {
        id: 0,
        username: 'Guest',
        email: 'Guest',
      },
    });
  },
};
