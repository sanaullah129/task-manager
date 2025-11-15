import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import jwt from 'jsonwebtoken';
import envConfig from '../config/envConfig';

export class AuthController {
  private userService = new UserService();

  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;
      const user = await this.userService.createUser(name, email, password, role);
      res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.authenticate(email, password);
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ sub: user.id, role: user.role }, envConfig.jwtSecret, { expiresIn: '1d' });
      res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (e: any) {
      res.status(500).json({ error: 'Login failed' });
    }
  };
}
