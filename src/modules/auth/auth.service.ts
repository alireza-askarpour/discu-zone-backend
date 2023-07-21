import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) return null;

    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(email: string) {
    const token = await this.generateToken(email);
    return { statusCode: HttpStatus.CREATED, data: { token } };
  }

  public async create(user: SignUpDto) {
    const pass = await this.hashPassword(user.password);
    const newUser = await this.userService.create({ ...user, password: pass });
    const { password, ...result } = newUser['dataValues'];
    const token = await this.generateToken(result.email);

    return { statusCode: HttpStatus.CREATED, data: { token } };
  }

  private async generateToken(email: string) {
    const payload = { email };
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
