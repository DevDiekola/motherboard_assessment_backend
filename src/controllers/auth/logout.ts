import { Request, Response } from "express";
import { AppDataSource } from "../../data-source.js";
import { User } from "../../entity/User.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import bcrypt from 'bcrypt';
import { RefreshToken } from "../../entity/RefreshToken.js";

export const logout = async (req: Request, res: Response) => {

    const refreshToken = req.cookies?.refresh_token;

    if (refreshToken) {
        const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
        await refreshTokenRepo.delete({token: refreshToken});
    }

    res.clearCookie('access_token', { httpOnly: true });
    res.clearCookie('refresh_token', { httpOnly: true });

    return res.status(200).json({ message: 'User logged out successfully' });
    
}