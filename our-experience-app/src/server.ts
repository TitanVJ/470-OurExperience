import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';

import middlewares from './middlewares';

const indexRouter = require('./routes/index');
const studentRouter = require('./routes/student');
const companyRouter = require('./routes/company');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this is temp. until nginx is setup to serve the static files
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);
app.use('/student', studentRouter);
app.use('/company', companyRouter);

// catch 404's and handle erros
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;

// THIS IS THE ACTUAL APP
