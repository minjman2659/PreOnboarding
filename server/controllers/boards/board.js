let boardsList = require('../../models/boardsList');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  post: (req, res) => {
    const { title, userId, username, body } = req.body;
    if (!userId || !username) {
      return res.status(403).json({
        message: '로그인 또는 게스트 로그인 후에 작성할 수 있습니다.',
      });
    }
    if (!title || !body) {
      return res.status(403).json({
        message: '제목과 내용을 모두 작성해야 합니다.',
      });
    }
    let newBoardId = boardsList.length + 1;
    const newBoard = {
      id: newBoardId,
      title,
      username,
      userId,
      body,
    };
    boardsList.push(newBoard);
    res.status(200).json({ message: 'OK' });
  },

  get: (req, res) => {
    const { id } = req.params;
    const findBoard = boardsList.filter((el) => el.id === Number(id));
    if (findBoard.length === 0) {
      res.status(403).json({ message: '존재하는 글을 조회해야 합니다!' });
    } else {
      res.status(200).json({ data: findBoard[0] });
    }
  },

  patch: (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
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
        const findBoard = boardsList.filter((el) => el.id === Number(id));
        if (findBoard.length === 0) {
          res.status(403).json({ message: '존재하는 글을 수정해야 합니다!' });
        } else {
          if (findBoard[0].userId !== Number(userId)) {
            res.status(403).json({ message: 'Forbidden Request' });
          } else {
            let updatedBoard = req.body;
            for (let i = 0; i < boardsList.length; i++) {
              if (boardsList[i].id === Number(id)) {
                updatedBoard = {
                  ...boardsList[i],
                  ...updatedBoard,
                };
                boardsList[i] = updatedBoard;
              }
            }
            res.status(201).json({ accessToken, message: 'OK' });
          }
        }
      }
    }
    // accessToken 유효 (200)
    else {
      const findBoard = boardsList.filter((el) => el.id === Number(id));
      if (findBoard.length === 0) {
        res.status(403).json({ message: '존재하는 글을 수정해야 합니다!' });
      } else {
        if (findBoard[0].userId !== Number(userId)) {
          res.status(403).json({ message: 'Forbidden Request' });
        } else {
          let updatedBoard = req.body;
          for (let i = 0; i < boardsList.length; i++) {
            if (boardsList[i].id === Number(id)) {
              updatedBoard = {
                ...boardsList[i],
                ...updatedBoard,
              };
              boardsList[i] = updatedBoard;
            }
          }
          res.status(200).json({ message: 'OK' });
        }
      }
    }
  },

  delete: (req, res) => {
    const { id } = req.params;
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
        const userId = refreshTokenCheck.id;
        const findBoard = boardsList.filter((el) => el.id === Number(id));
        if (findBoard.length === 0) {
          res.status(403).json({ message: '존재하는 글을 삭제해야 합니다!' });
        } else {
          if (findBoard[0].userId !== Number(userId)) {
            res.status(403).json({ message: 'Forbidden Request' });
          } else {
            boardsList = boardsList.filter((el) => el.id !== Number(id));
            res.status(201).json({ accessToken, message: 'OK' });
          }
        }
      }
    }
    // accessToken 유효 (200)
    else {
      const userId = accessTokenCheck.id;
      const findBoard = boardsList.filter((el) => el.id === Number(id));
      if (findBoard.length === 0) {
        res.status(403).json({ message: '존재하는 글을 삭제해야 합니다!' });
      } else {
        if (findBoard[0].userId !== Number(userId)) {
          res.status(403).json({ message: 'Forbidden Request' });
        } else {
          boardsList = boardsList.filter((el) => el.id !== Number(id));
          res.status(200).json({ message: 'OK' });
        }
      }
    }
  },
};
