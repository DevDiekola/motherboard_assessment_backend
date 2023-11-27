import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source.js';
import { RefreshToken } from '../entity/RefreshToken.js';
import { generateAccessToken } from '../utils/jwt.js';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;

    console.log("ACCESS TOKEN IS", accessToken, "REFRESH TOKEN IS", refreshToken);

    if (accessToken == null || refreshToken == null) {
        return res.status(401).json({ message: 'Request not authenticated' });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
        if (err) {
            if (err.name !== "TokenExpiredError") {
                return res.status(401).json({ message: 'Request not authenticated' });
            }

            const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
            const dbRefreshToken = await refreshTokenRepo.findOne({ where: { token: refreshToken, user_id: payload.userID } });

            if (!dbRefreshToken) {
                return res.status(401).json({ message: 'Request not authenticated' });
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
                if (err) {
                    return res.status(401).json({ message: 'Request not authenticated' });
                }

                const newAccessToken = generateAccessToken(payload.userID, '1d');
                res.cookie('access_token', newAccessToken, { httpOnly: true, sameSite: 'strict' });

                req.body.userID = payload.userID;
            })

        }

        next();
    })
}