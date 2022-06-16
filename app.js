const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

//oas
const expressOasGenerator = require('express-oas-generator');

const indexRouter = require('./routes/index');
const seatRouter = require('./routes/seat');

const app = express();

//oas
expressOasGenerator.handleResponses(app, {});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);

app.get('/healthz', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    console.log('response object', healthcheck);
    res.send(healthcheck);
  } catch (e) {
    console.log('health check request object for failed request', req);
    res.status(503).send();
  }
});

app.use('/seat', seatRouter);

expressOasGenerator.handleRequests(app, {});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  if(err.status >= 400 && err.status < 500) {
    res.status(err.status).send(err.message);
  }else if (err.status == 500) {
    res.status(err.status).send('Internal Server Error');
  }
  res.status(err.status || 500).send(err.message || 'Somehting went wrong.. please retry later.');
});

module.exports = app;
