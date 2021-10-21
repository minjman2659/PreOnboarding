const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const port = 4000;

const usersRouter = require('./routes/users');
const boardsRouter = require('./routes/boards');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use('/users', usersRouter);
app.use('/boards', boardsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  res.status(404).send('Not Found!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internal Server Error',
    stacktrace: err.toString(),
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
