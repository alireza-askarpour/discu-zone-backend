import * as joi from 'joi';

export const createPermissionSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
});
