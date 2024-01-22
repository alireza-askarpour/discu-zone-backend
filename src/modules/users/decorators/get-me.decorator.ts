import { Get, applyDecorators } from '@nestjs/common';
import { ApiGetMe } from '../docs/get-me.doc';

export const GetMeDecorator = () => {
  return applyDecorators(ApiGetMe(), Get('@me'));
};
