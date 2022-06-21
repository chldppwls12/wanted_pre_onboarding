import express from 'express';
import routes from './routes/index.js';
import {ValidationError} from 'express-validation';
import { errResponse } from './utils/response.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);
app.use((err, req, res, next) => {
  if (err instanceof ValidationError){
    return res.send(errResponse({isSuccess: false, code: 404, message: err.details.query.message}));
  }
})

export default app;
