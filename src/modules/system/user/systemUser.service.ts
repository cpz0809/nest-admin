import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemUserEntity } from './systemUser.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SystemUserService {
  constructor(
    @InjectRepository(SystemUserEntity)
    private systemUserRepository: Repository<SystemUserEntity>,
  ) {}

  // 创建用户
  async add(systemUser: Partial<SystemUserEntity>): Promise<boolean> {
    // 生成盐
    const salt = await bcrypt.genSalt(10);
    try {
      systemUser.password = await bcrypt.hash(systemUser.password, salt);
      return !!(await this.systemUserRepository.save(systemUser));
    } catch (error) {
      console.error('Failed to add system user:', error);
      return false;
    }
  }
}
