import { Request, Response } from "express";
import { AppDataSource } from "../../data-source.js";
import { User } from "../../entity/User.js";

export const getUser = async (req: Request, res: Response) => {
    const userID = req.body.userID;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: userID } });

    if (user) {
        return res.status(200).json({ user: {email: user.email} });
    }
    return res.status(400).json({ message: "User not found" });
}