/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemUserEntity } from './systemUser.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ExceptionEnum } from '@/common/exception/exceptionEnum';
import { CustomException } from '@/common/exception/customException';
import { QueryUserDto } from '@/modules/system/user/systemUser.dto';
import {
  WrapperPagingRes,
  WrapperResData,
} from '@/common/api-response/wrapperPagingRes';

@Injectable()
export class SystemUserService {
  constructor(
    @InjectRepository(SystemUserEntity)
    private systemUserRepository: Repository<SystemUserEntity>,
  ) {}

  // 按用户名查询用户是否存在
  async queryUserByUsername(username: string) {
    const user = await this.systemUserRepository.findOne({
      where: {
        username,
      },
    });
    if (user) throw new CustomException(ExceptionEnum.DATA_IS_NOT_EMPTY);
    return user;
  }

  // 按用户ID查询用户是否存在
  private async queryUserByUserId(userId: number) {
    const user = await this.systemUserRepository.findOne({
      where: {
        userId,
      },
    });

    if (user) return;
    throw new CustomException(ExceptionEnum.USER_NULL);
  }

  // 查询用户列表
  async queryList(params: Partial<QueryUserDto>): Promise<WrapperResData> {
    try {
      const queryBuilder = this.systemUserRepository.createQueryBuilder('user');
      const [list, total] = await WrapperPagingRes.queryParamsHandle(
        queryBuilder,
        params,
      ).getManyAndCount();
      return WrapperPagingRes.wrapperResData(list, total, params);
    } catch (error) {
      throw new CustomException(ExceptionEnum.HANDLE_ERROR);
    }
  }

  // 新增用户
  async add(systemUser: Partial<SystemUserEntity>): Promise<boolean> {
    // 查询是否存在相同用户名
    await this.queryUserByUsername(systemUser.username);
    // 生成盐
    const salt = await bcrypt.genSalt(10);
    // 密码加盐
    systemUser.password = await bcrypt.hash(systemUser.password, salt);
    try {
      return !!(await this.systemUserRepository.save(systemUser));
    } catch (error) {
      throw new CustomException(ExceptionEnum.HANDLE_ERROR);
    }
  }

  // 修改用户信息
  async edit(systemUser: Partial<SystemUserEntity>): Promise<boolean> {
    await this.queryUserByUserId(systemUser.userId);
    try {
      return !!(await this.systemUserRepository.save(systemUser));
    } catch (error) {
      throw new CustomException(ExceptionEnum.HANDLE_ERROR);
    }
  }

  // 批量删除用户
  async remove(userIds: string[]): Promise<boolean> {
    // 批量查询用户是否存在
    try {
      userIds.forEach((userid) => {
        const user = this.queryUserByUserId(Number(userid));
        if (!user) throw new CustomException(ExceptionEnum.USER_NULL);
      });
    } catch (error) {
      throw new CustomException(ExceptionEnum.USER_NULL);
    }

    try {
      await this.systemUserRepository.delete([...userIds]);
      return true;
    } catch (error) {
      throw new CustomException(ExceptionEnum.HANDLE_ERROR);
    }
  }
}
