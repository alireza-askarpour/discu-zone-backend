import * as Joi from 'joi';

export const createInviteSchema = Joi.object({
  expiresAt: Joi.number(),
  maxUse: Joi.number(),
});
