import express from 'express';
import connect from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routers/userRoutes.js';

const app = express();
const port = 3000;
connect()

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter)

app.get('/', (req, res) => {
  res.send('Hello Worlddzzzzz!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
