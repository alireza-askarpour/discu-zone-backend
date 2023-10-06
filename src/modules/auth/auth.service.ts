import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable } from '@nestjs/common';

import { SignUpDto } from './dtos/signup.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    // find if user exist with this email
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) return null;

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) return null;

    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login({ id, email }: { id: string; email: string }) {
    const token = await this.generateToken({ id, email });
    return { statusCode: HttpStatus.CREATED, data: { token } };
  }

  public async create(user: SignUpDto) {
    const pass = await this.hashPassword(user.password);
    const newUser = await this.usersRepository.create({
      ...user,
      password: pass,
    });
    const { password, ...result } = newUser['dataValues'];
    const token = await this.generateToken({
      email: result.email,
      id: result.id,
    });

    return { statusCode: HttpStatus.CREATED, data: { token } };
  }

  private async generateToken(payload: { id: string; email: string }) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
