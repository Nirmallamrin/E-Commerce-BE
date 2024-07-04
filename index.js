import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db.js';
import cookieParser from 'cookie-parser';
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
const PORT =  3000;


app.use(cors({
  origin: ["http://localhost:5173", "https://e-commerce-fe-cyan.vercel.app"],
  credentials: true,
  methods: ["GET", "HEAD", "OPTIONS", "POST", "DELETE", "PUT", "PATCH"],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter );
app.use('/cart', cartRouter);
app.use('/payment', paymentRouter);
app.use('/category', categoryRouter);


app.get('/', (req, res) => {
  res.send('Hello Worlddzzzzz!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
