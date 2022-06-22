import Joi from 'joi';

export const getAllRecruitments = {
  query: Joi.object({
    search: Joi.string(),
  })
};

export const addRecruitment = {
  body: Joi.object({
    company_id: Joi.number().required(),
    position: Joi.string().max(30).required(),
    compensation: Joi.number().required(),
    content: Joi.string().max(2000).required(),
    skill: Joi.string().max(20).required(),
  })
};

export const updateRecruitment = {
  params: Joi.object({
    recruitment_id: Joi.number().required()
  }),
  body: Joi.object({
    position: Joi.string().max(30),
    compensation: Joi.number().max(20),
    content: Joi.string().max(2000),
    skill: Joi.string().max(20),
  })
};