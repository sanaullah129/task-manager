import { UserModel, IUser, UserRole } from '../models/User';
import bcrypt from 'bcrypt';

export class UserService {
  async createUser(name: string, email: string, password: string, role: UserRole = 'user'): Promise<IUser> {
    const existing = await UserModel.findOne({ email });
    if (existing) throw new Error('Email already in use');
    const hash = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hash, role });
    return user.save();
  }

  async authenticate(email: string, password: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    return ok ? user : null;
  }

  async getById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }
}
