import "reflect-metadata";
import { AppDataSource } from "./data-source.js"

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRouter from "./routes/auth.js";
import hospitalRouter from "./routes/hospital.js";

dotenv.config();

AppDataSource.initialize().then(() => {
  console.log("CONNECTED TO DATABASE");
  AppDataSource.synchronize();
}).catch(error => console.log(error))

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/hospital', hospitalRouter);

app.get('/', (req, res) => {
  res.send('Hello, welcome to the Motherboard Assessment API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
