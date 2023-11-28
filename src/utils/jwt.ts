import jwt from 'jsonwebtoken';

export const generateAccessToken = (userID: number, expiresIn: number) => {
    return jwt.sign({userID: userID}, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
}

export const generateRefreshToken = (userID: number, expiresIn: number) => {
    return jwt.sign({userID: userID}, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
}