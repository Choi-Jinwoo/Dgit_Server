import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './model/createUser.dto';
import { IResponse } from 'src/interface/IResponse';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async applyUser(@Body() createUserDTO: CreateUserDTO): Promise<IResponse> {
    await this.userService.createUser(createUserDTO);

    return {
      message: '회원 등록 성공',
    };
  }
}