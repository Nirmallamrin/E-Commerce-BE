import express from 'express';
import connect from './config/db.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routers/userRoutes.js';
import adminRouter from './routers/adminRoutes.js';
import productRouter from './routers/productRoutes.js';
import orderRouter from './routers/orderRoutes.js';
import paymentRouter from './routers/paymentRoutes.js';


const app = express();
const port = 3000;
connect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter )
app.use('/app/v1/', paymentRouter)


app.get('/', (req, res) => {
  res.send('Hello Worlddzzzzz!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
