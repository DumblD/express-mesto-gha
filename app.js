require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorsHandler = require('./middlwares/error');

const app = express();

mongoose.connect(`mongodb://${process.env.DOMAIN}/mestodb`, {
  useNewUrlParser: true,
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connected!');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.use(errors());
app.use(errorsHandler);

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening port 3000');
});
