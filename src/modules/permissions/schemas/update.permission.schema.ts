import * as joi from 'joi';

export const updatePermissionSchema = joi.object({
  name: joi.string(),
  description: joi.string(),
});
