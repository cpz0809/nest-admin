import { Body, Controller, Post } from '@nestjs/common';
import { SystemUserService } from './systemUser.service';
import { SystemUserEntity } from './systemUser.entity';

@Controller('/system/user')
export class SysUserController {
  constructor(private readonly systemUserService: SystemUserService) {}

  @Post()
  async add(@Body() systemUserEntity: SystemUserEntity) {
    const res = await this.systemUserService.add(systemUserEntity);
    console.log(res);
  }
}
