import * as joi from 'joi';

export const updateJoiSchema = joi.object({
  name: joi.string(),
  color: joi.string(),
  permissions: joi.array().items(joi.string()),
});
