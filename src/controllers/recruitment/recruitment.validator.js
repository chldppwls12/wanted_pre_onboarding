import Joi from 'joi';

export const addRecruitment = {
  body: Joi.object({
    company_id: Joi.number().required(),
    position: Joi.string().required(),
    compensation: Joi.number().required(),
    content: Joi.string().required(),
    skill: Joi.string().required(),
  })
};