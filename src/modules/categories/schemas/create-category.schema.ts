import * as joi from 'joi';
import { uuidv4Pattern } from 'src/core/constants/pattern.constant';

export const createCategorySchema = joi.object({
  name: joi.string().required(),
  server: joi.string().pattern(uuidv4Pattern).required(),
  private: joi.boolean().required(),
});
