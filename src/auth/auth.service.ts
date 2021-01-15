import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private repo: UserRepository,
  ) {}

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    await this.repo.signUp(dto);
  }

  async signIn(dto: AuthCredentialsDto) {
    const username = await this.repo.signIn(dto);

    if  (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
    else {
      username
    }
  }
}
