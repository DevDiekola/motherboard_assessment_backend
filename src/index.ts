import "reflect-metadata";
import { AppDataSource } from "./data-source.js"

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import cookieParser from 'cookie-parser';

dotenv.config();

AppDataSource.initialize().then(() => {
  console.log("CONNECTED TO DATABASE");
  AppDataSource.synchronize();
}).catch(error => console.log(error))

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello, welcome to the Motherboard Assessment API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
