import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source.js';
import { RefreshToken } from '../entity/RefreshToken.js';
import { generateAccessToken } from '../utils/jwt.js';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;

    if (accessToken == null || refreshToken == null) {
        return res.status(401).json({ message: 'Request not authenticated' });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, payload: any) => {

        const userID = payload.userID;

        if (err) {
            if (err.name !== "TokenExpiredError") {
                return res.status(401).json({ message: 'Request not authenticated' });
            }

            const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
            const dbRefreshToken = await refreshTokenRepo.findOne({ where: { token: refreshToken, user_id: userID } });

            if (!dbRefreshToken) {
                return res.status(401).json({ message: 'Request not authenticated' });
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload: any) => {
                if (err) {
                    return res.status(401).json({ message: 'Request not authenticated' });
                }

                const userID = payload.userID;

                const dayToMilli = 24*60*60*1000;
                const newAccessToken = generateAccessToken(userID, dayToMilli);
                res.cookie('access_token', newAccessToken, { httpOnly: true, sameSite: 'strict' });

                req.body.userID = userID;
            })

        }
        else {
            req.body.userID = userID;
        }

        next();
    })
}