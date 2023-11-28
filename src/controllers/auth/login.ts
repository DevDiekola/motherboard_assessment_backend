import { Request, Response } from "express";
import { AppDataSource } from "../../data-source.js";
import { User } from "../../entity/User.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import bcrypt from 'bcrypt';
import { RefreshToken } from "../../entity/RefreshToken.js";

export const login = async (req: Request, res: Response) => {

    const email: string = req.body.email;
    const password: string = req.body.password;
    const remember: boolean = req.body.remember;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const hourToMilli = 60*60*1000;
    const dayToMilli = 24*60*60*1000;
    const thirtyDaysToMilli = 30*24*60*60*1000;

    const accessToken = generateAccessToken(user.id, hourToMilli);
    const refreshToken = generateRefreshToken(user.id, remember ? thirtyDaysToMilli : dayToMilli);

    const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);

    await refreshTokenRepo.delete({user_id: user.id});
    const newRefreshToken = refreshTokenRepo.create({ user_id: user.id, token: refreshToken });
    
    try {
        await refreshTokenRepo.save(newRefreshToken)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

    res.cookie('access_token', accessToken, { httpOnly: true, sameSite: 'strict' });
    res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'strict' });

    return res.json({ user: {email: user.email} });

}