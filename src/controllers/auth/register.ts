import { Request, Response } from "express";
import { AppDataSource } from "../../data-source.js";
import { User } from "../../entity/User.js";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  const userRepo = AppDataSource.getRepository(User);
  const emailExists = await userRepo.exist({ where: { email } });

  if (emailExists) {
    return res.status(401).json({ message: 'Email is already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepo.create({ email, password: hashedPassword });

  await userRepo.save(newUser).catch((e) => {
    return res.status(500).json({ message: 'Internal server error' });
  })

  return res.status(200).json({ message: 'Registration successful' });
}