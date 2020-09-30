import { ConflictException, InternalServerErrorException, Post } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    const { username, password } = dto;

    const user = new User();
    user.username = username;
    user.password = password;

    try {
      await user.save();
    } catch(error) {
      if(error.code === '23505') { // duplicated username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
