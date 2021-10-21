const express = require('express');
const router = express.Router();

const { boardsController } = require('../controllers/index');

router.post('/', boardsController.board.post);
router.get('/:id', boardsController.board.get);
router.patch('/:id', boardsController.board.patch);
router.delete('/:id', boardsController.board.delete);

router.get('/', boardsController.boards.get);

module.exports = router;
