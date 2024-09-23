import { Length, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { PageDto } from '@/common/dto/PageDto';

/**
 * 查询用户DTO
 */

export class QueryUserDto extends PageDto {
  username: string;

  mobile: string;

  status: 0 | 1;

  createTime: string;

  endTime: string;
}

/**
 * 修改用户DTO
 */
export class EditSystemUserDto {
  userid: string;

  avatar: string;

  @IsNotEmpty({ message: '昵称不能为空' })
  nikeName: string;

  @IsOptional()
  @Length(11, 11, { message: '手机号长度错误' })
  mobile: string;

  @IsOptional()
  @IsEmail()
  email: string;

  sex: 0 | 1 | 2;

  dept: number;

  job: number;

  post: number;

  status: 0 | 1;

  remark: string;
}

/**
 * 新增用户DTO
 */
export class AddOrEditSystemUserBaseDto extends EditSystemUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
