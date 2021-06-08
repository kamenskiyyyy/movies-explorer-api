const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errorsHandler');
const limiter = require('./middlewares/rateLimiter');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

dotenv.config();
const {
  NODE_ENV,
  PORT = 3000,
  DB_URL,
} = process.env;

const app = express();
app.use(helmet());

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: 'https://movies.kamenskiyyyy.nomoredomains.club',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate

app.use(errorsHandler);

app.listen(PORT);
