import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { User } from 'src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super({
      usernameField:'username',
      passwordField:'password',
    } as IStrategyOptions);
  }

  async validate(username:string, password:string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
  }
}