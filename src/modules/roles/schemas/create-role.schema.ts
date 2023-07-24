import * as joi from 'joi';

export const createJoiSchema = joi.object({
  name: joi.string().required(),
  color: joi.string().required(),
  permissions: joi.array().items(joi.string()).required(),
  server: joi.string().required(),
  channel: joi.string().required(),
});
