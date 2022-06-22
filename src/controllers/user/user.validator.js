import Joi from 'joi';

export const addRecruitment = {
  body: Joi.object({
    recruitment_id: Joi.number().required(),
    user_id: Joi.number().required()
  })
};