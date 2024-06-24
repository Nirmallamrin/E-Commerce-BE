import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routers/userRoutes.js';
import adminRouter from './routers/adminRoutes.js';
import productRouter from './routers/productRoutes.js';
import orderRouter from './routers/orderRoutes.js';
import cartRouter from './routers/cartRoutes.js';
import paymentRouter from './routers/paymentRoutes.js';
import categoryRouter from './routers/categoryRoutes.js';

dotenv.config();

connect()

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(cors(
  {
    origin:true,
    credentials:true,
  }
));

app.use(express.json());

app.use(cookieParser());
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/order", orderRouter )
app.use("/api/v1/cart", cartRouter);
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/category', categoryRouter)


app.get('/', (req, res) => {
  res.send('Hello Worlddzzzzz!');
});

app.listen(port, () => {
  console.log('listening on port',port);
});
