import { ObjectSchema } from 'joi';
import { BadRequestException } from '@nestjs/common';

export const joiValidator = (schema: ObjectSchema, value: any) => {
  const { error } = schema.validate(value);

  if (error) {
    throw new BadRequestException({
      error: 'Validator failed',
      message: error.message.replace(/(\"|\[|\d\])/g, ''),
    });
  }
};
