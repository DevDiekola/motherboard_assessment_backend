import { Request, Response } from "express";
import { AppDataSource } from "../../data-source.js";
import { Hospital } from "../../entity/Hospital.js";

export const getUserHospitals = async (req: Request, res: Response) => {
    const userID = req.body.userID;

    const hospitalRepo = AppDataSource.getRepository(Hospital);
    const hospitals = await hospitalRepo.find({ where: { user_id: userID } }) || [];

    return res.status(200).json({ hospitals });
}