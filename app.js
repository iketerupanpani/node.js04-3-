////モジュールのロード

//Expressのエラーに関するもの
var createError = require('http-errors');
//Express本体
var express = require('express');
//pathは、ファイルパスを扱うためのモジュール
var path = require('path');
//クッキーのパース（値を変換する処理）に関するモジュール
var cookieParser = require('cookie-parser');
//morgan=HTTPリクエストのログ出力に関するモジュール
var logger = require('morgan');

//ルート用スクリプトのロード
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hello = require('./routes/hello');

/// Expressオブジェクトの作成と基本設定
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.useによる関数組み込み
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//アクセスのためのapp.use作成
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', hello);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.expressの設定
module.exports = app;
