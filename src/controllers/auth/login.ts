import { Request, Response } from "express";
import { AppDataSource } from "../../data-source.js";
import { User } from "../../entity/User.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import bcrypt from 'bcrypt';
import { RefreshToken } from "../../entity/RefreshToken.js";

export const login = async (req: Request, res: Response) => {

    const email: string = req.body.email;
    const password: string = req.body.email;
    const remember: boolean = req.body.email;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
        const accessToken = generateAccessToken(user.id, '1h');
        const refreshToken = generateRefreshToken(user.id, remember ? '30d' : '1d');

        const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
        const newRefreshToken = refreshTokenRepo.create({ user_id: user.id, token: refreshToken });
        
        await refreshTokenRepo.save(newRefreshToken).catch((e) => {
            return res.status(500).json({ message: 'Internal server error' });
        })

        res.cookie('access_token', accessToken, { httpOnly: true, sameSite: 'strict' });
        res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'strict' });

        return res.json({ message: 'Login successful' });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
}