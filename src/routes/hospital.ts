import express from 'express';
import { getUserHospitals } from '../controllers/hospital/get_hospitals.js';
import { authenticateToken } from '../middlewares/authenticate_token.js';

const hospitalRouter = express.Router();

hospitalRouter.get('/hospital', authenticateToken, getUserHospitals);

export default hospitalRouter;