import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SystemUserService } from './systemUser.service';
import {
  AddOrEditSystemUserBaseDto,
  EditSystemUserDto,
  QueryUserDto,
} from './systemUser.dto';
import { ApiResponse } from '@/common/api-response';

/**
 * 系统用户管理
 */
@Controller('/system/user')
export class SysUserController {
  constructor(private readonly systemUserService: SystemUserService) {}

  // 查询用户列表
  @Get()
  async getList(@Query() queryUserDto: QueryUserDto) {
    const list = await this.systemUserService.queryList(queryUserDto);
    return ApiResponse.success(list);
  }

  // 新增用户
  @Post()
  async add(@Body() systemUserEntity: AddOrEditSystemUserBaseDto) {
    await this.systemUserService.add(systemUserEntity);
    return ApiResponse.success();
  }

  // 修改用户
  @Put()
  async edit(@Body() systemUserEntity: EditSystemUserDto) {
    await this.systemUserService.edit(systemUserEntity);
    return ApiResponse.success();
  }

  @Delete()
  async remove(@Query('userIds') userIds: string) {
    console.log(userIds);
    await this.systemUserService.remove(userIds.split(','));
    return ApiResponse.success();
  }
}
