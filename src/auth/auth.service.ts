import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { JwtPayload } from '../shared/types/jwt';
import { SigninDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SigninResponse } from '../shared/types/auth';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto): Promise<SigninResponse> {
    try {
      const { username, password } = signinDto;
      const user = await this.authRepository.findOne({ where: { username } });

      if (!user) {
        throw new BadRequestException('Account does not exist');
      }

      const isPasswordValid = await bcrypt.compare(password, user?.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JwtPayload = {
        sub: `${user?.uid}`,
        username: user?.username,
      };

      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET,
      });

      const response: SigninResponse = {
        message: `Welcome ${user?.username}!`,
        userProfile: user,
        accessToken,
        refreshToken,
      };

      return response;
    } catch (error) {
      return {
        message: error?.message || 'The action was not successful, retry.',
        status: error.status || 'Error',
        userProfile: null,
        accessToken: null,
        refreshToken: null,
      };
    }
  }
}
