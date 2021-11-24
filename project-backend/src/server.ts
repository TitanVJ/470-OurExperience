import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import middlewares from './middlewares';

const app = express();
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello');
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
