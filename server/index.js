import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
// import { kpis, products, transactions } from './data/data.js';
// import KPI from './models/KPI.js';
// import Product from './models/Product.js';
// import Transaction from './models/Transaction.js';
import kpiRoutes from './routes/kpi.js';
import productRoutes from './routes/product.js';
import transactionRoutes from './routes/transaction.js';

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/kpi', kpiRoutes);
app.use('/product', productRoutes);
app.use('/transaction', transactionRoutes);

/* MONGOOSE SETUP */
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
const PORT = process.env.PORT || 9000;
const URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URL_PRO
    : process.env.MONGO_URL_DEV;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, HOST, () =>
      console.log(`Server is running on http://${HOST}:${PORT}`)
    );

    /*在初始化数据的时候再取消注释  */
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch(error => console.log(`${error} did not connect`));
