import { SelectQueryBuilder } from 'typeorm';
import { CustomException } from '@/common/exception/customException';
import { ExceptionEnum } from '@/common/exception/exceptionEnum';
import { PageDto } from '@/common/dto/PageDto';

export interface WrapperResData {
  total: number;
  data: any;
  pageSize: number;
  pageNum: number;
}

export class WrapperPagingRes {
  public static queryParamsHandle<T>(
    queryBuilder: SelectQueryBuilder<T>,
    params: { [key: string]: any },
  ) {
    const aliasName = queryBuilder.expressionMap.mainAlias.name;
    if (typeof params !== 'object')
      throw new CustomException(ExceptionEnum.PARAMS_ERROR);
    queryBuilder.where('1 = 1');
    const [searchParams, pageParams] = splitParams(params);
    for (const key in searchParams) {
      const value = params[key];
      queryBuilder.andWhere(`${aliasName}.${key} = :${key}`, { [key]: value });
    }

    if (pageParams.pageSize && pageParams.pageNum) {
      queryBuilder
        .skip(pageParams.pageSize * (pageParams.pageNum - 1))
        .take(pageParams.pageSize);
    }

    function splitParams(params: { [key: string]: any }): [any, any] {
      const searchParams = {};
      const pageParams = {};
      const paramsKeys = new PageDto();
      for (const key in params) {
        if (paramsKeys[key]) {
          pageParams[key] = params[key];
        } else {
          searchParams[key] = params[key];
        }
      }
      return [searchParams, pageParams];
    }

    return queryBuilder;
  }

  public static wrapperResData<T extends PageDto | Partial<PageDto>>(
    data: any,
    total: number,
    params: T,
  ): WrapperResData {
    return {
      data,
      total,
      pageNum: params.pageNum,
      pageSize: params.pageSize,
    };
  }
}
