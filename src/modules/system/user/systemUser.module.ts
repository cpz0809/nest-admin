import { Module } from '@nestjs/common';
import { SysUserController } from './systemUser.controller';
import { SystemUserService } from './systemUser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUserEntity } from './systemUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemUserEntity])],
  providers: [SystemUserService],
  controllers: [SysUserController],
  exports: [SystemUserService],
})
export class SystemUserModule {}
