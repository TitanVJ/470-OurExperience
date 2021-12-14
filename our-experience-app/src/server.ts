import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import middlewares from './middlewares/middlewares';
import { cas_config, session_config } from './config/config';
import { User } from './models/user.model';
import { admin, student } from './middlewares/authorization';

const CASAuthentication = require('node-cas-authentication');

const indexRouter = require('./routes/index');
const studentRouter = require('./routes/student');
const companyRouter = require('./routes/company');
import careerRouter from './routes/career';
import adminRouter from './routes/admin';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session(session_config));
const cas = new CASAuthentication(cas_config);

// save the user into req so that you can use through out the app
// additionally save user to locals so that we rendered pages can use them
app.use(cas.bounce, async (req, res, next) => {
  req.user = await User.query().findOne({ username: req.session['cas_user'] });
  res.locals.user = req.user;
  next();
});

app.locals.moment = require('moment');

app.use(morgan('tiny'));

const scriptSources = ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdn.datatables.net', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net/'];
const styleSources = ["'self'", "'unsafe-inline'", 'cdn.datatables.net', 'cdn.jsdelivr.net/', 'fonts.cdnfonts.com', 'cdnjs.cloudflare.com'];
const connectSources = ["'self'"];
const imgSrc = ['w3.org', 'upload.wikimedia.org'];
const fontSrc = ['fonts.cdnfonts.com'];
app.use(flash());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: scriptSources,
      scriptSrcElem: scriptSources,
      styleSrc: styleSources,
      connectSrc: connectSources,
      imgSrc: ["'self'", 'blob:', 'data:', ...imgSrc],
      fontSrc: ["'self'", ...fontSrc]
    }
  })
);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this is temp. until nginx is setup to serve the static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/', cas.bounce,  indexRouter);
app.use('/student', cas.bounce, student,studentRouter);
// app.use('/company', companyRouter);
app.use('/career', cas.bounce, student, careerRouter);
app.use('/admin', cas.bounce, admin, adminRouter);

// catch 404's and handle erros
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;

// THIS IS THE ACTUAL APP
