import express, { Application, Request, Response } from 'express';
import * as api from './routes/route';
import connect from './db/connection';
import dotenv from 'dotenv';

dotenv.config();

//process.env returns (string | undefined)
//convert variable PORT to string
const PORT = (): string => {
  if (process.env.PORT) {
    return process.env.PORT;
  } else {
    return 'undefined';
  }
};

const app: Application = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

api.createRoutes(app);

app.use((req: Request, res: Response) => {
  res.status(404).send('<body>no encontrado</body>');
});

connect().then((connected: boolean) => {
  if (connected) {
    app.listen(PORT(), () => {
      console.log('running on port ' + PORT());
    });
  } else {
    console.log('error DB');
  }
});
