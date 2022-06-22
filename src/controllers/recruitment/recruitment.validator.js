import Joi from 'joi';

export const addRecruitment = {
  body: Joi.object({
    company_id: Joi.number().required(),
    position: Joi.string().max(30).required(),
    compensation: Joi.number().max(20).required(),
    content: Joi.string().max(2000).required(),
    skill: Joi.string().max(20).required(),
  })
};