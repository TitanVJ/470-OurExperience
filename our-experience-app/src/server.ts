import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import middlewares from './middlewares/middlewares';

const indexRouter = require('./routes/index');
const studentRouter = require('./routes/student');
const companyRouter = require('./routes/company');
const careerRouter = require('./routes/career');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('tiny'));

const scriptSources = ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdn.datatables.net', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net/'];
const styleSources = ["'self'", "'unsafe-inline'", 'cdn.datatables.net', 'cdn.jsdelivr.net/', 'fonts.cdnfonts.com'];
const connectSources = ["'self'"];
const imgSrc = ['w3.org', 'upload.wikimedia.org'];
const fontSrc = ['fonts.cdnfonts.com'];

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const sessionConfig = {
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};

app.use(session(sessionConfig));
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
app.use('/', indexRouter);
app.use('/student', studentRouter);
// app.use('/company', companyRouter);
app.use('/career', careerRouter);

// catch 404's and handle erros
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;

// THIS IS THE ACTUAL APP
