import jwt from 'jsonwebtoken';

export const generateAccessToken = (userID: number, expiresIn: string) => {
    return jwt.sign(`${userID}`, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
}

export const generateRefreshToken = (userID: number, expiresIn: string) => {
    return jwt.sign(`${userID}`, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
}