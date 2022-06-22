import Sequelize, {Op} from 'sequelize';
import { logger } from '../../config/winston.js';
import Recruitment from '../../models/recruitment.js';
import Company from '../../models/company.js';
import { response, errResponse } from '../../utils/response.js';
import statusCode from '../../utils/statusCode.js';
import message from '../../utils/responseMessage.js';

export const getAllRecruitments = async (req, res) => {
  try{
    const attrs = {
      attributes: [
          'recruitment_id',
          [Sequelize.col('company.name'), 'name'],
          [Sequelize.col('company.nation'), 'nation'],
          [Sequelize.col('company.area'), 'area'],
          'position',
          'compensation',
          'skill'
      ],
      include: {
          model: Company,
          attributes: [],
      },
      order: [['recruitment_id', 'DESC']]
    };

    const {search} = req.query;
    if (search){
      let searchColumns = [
        '$company.name$',
        '$company.nation$',
        '$company.area$',
        'position',
        'compensation',
        'skill'
      ];

      let columns = [];

      for (let searchColumn of searchColumns){
        columns.push({
          [searchColumn]: {
            [Op.like]: `%${search}%`
          }
        })
      }
    
      attrs.where = {
        [Op.or]: columns
      };
    }

    const result = await Recruitment.findAll({...attrs});
    
    if (result.length === 0){
      return res
      .status(statusCode.NOT_FOUND)
      .send(errResponse(statusCode.NOT_FOUND,
        message.NOT_FOUND
      ));
    }

    return res
    .status(statusCode.OK)
    .send(response(statusCode.SUCCESS,
      message.SUCCESS,
      result
    ));
  }catch(err){
    logger.error(`getAllRecruitments Controller Err: ${err}`);
    console.log(err);
    
    return res.
    status(statusCode.INTERNAL_SERVER_ERROR)
    .send(errResponse(statusCode.INTERNAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    ));
  }
};

export const addRecruitment = async (req, res) => {
  try{
    const {company_id, position, compensation, content, skill} = req.body;
    
    const isExistCompanyId = await Company.findByPk(company_id);

    if (!isExistCompanyId){
      return res
      .status(statusCode.NOT_FOUND)
      .send(errResponse(statusCode.NOT_FOUND,
        message.NOT_FOUND
      ));
    }

    await Recruitment.create({
      company_id,
      position,
      compensation,
      content,
      skill
    });

    return res
    .status(statusCode.CREATED)
    .send(response(statusCode.OK,
      message.SUCCESS
    ));
  }
  catch(err){
    logger.error(`addRecruitment Controller Err: ${err}`);
    console.log(err);
    
    return res.
    status(statusCode.INTERNAL_SERVER_ERROR)
    .send(errResponse(statusCode.INTERNAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    ));
  }
}

export const updateRecruitment = async (req, res) => {
  try{
    const {position, compensation, content, skill} = req.body;
    const {recruitment_id} = req.params;
    
    await Recruitment.update({
      position,
      compensation,
      content,
      skill
    }, {
      where: {
        recruitment_id
      }
    });

    return res
    .status(statusCode.OK)
    .send(response(statusCode.OK,
      message.SUCCESS
    ));
  }
  catch(err){
    logger.error(`updateRecruitment Controller Err: ${err}`);
    console.log(err);
    
    return res.
    status(statusCode.INTERNAL_SERVER_ERROR)
    .send(errResponse(statusCode.INTERNAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    ));
  }
}

export const getRecruitment = async (req, res) => {
  try{
    const {recruitment_id} = req.params;

    const isExistRecruitmentId = await Recruitment.findByPk(recruitment_id);
    if (!isExistRecruitmentId){
      return res
      .status(statusCode.NOT_FOUND)
      .send(errResponse(statusCode.NOT_FOUND,
        message.NOT_FOUND
      ));
    };

    const attrs = {
      attributes: [
          'recruitment_id',
          [Sequelize.col('company.name'), 'name'],
          [Sequelize.col('company.nation'), 'nation'],
          [Sequelize.col('company.area'), 'area'],
          [Sequelize.col('company.company_id'), 'company_id'],
          'position',
          'compensation',
          'skill',
          'content'
      ],
      include: {
          model: Company,
          attributes: [],
      }
    };
    const result = await Recruitment.findByPk(recruitment_id, attrs);
    const company_id = result.dataValues.company_id;

    const recruitments = (await Recruitment.findAll({
      attributes: [
        'recruitment_id'
      ],
      where: {
        company_id
      }
    })).map(item => item.recruitment_id);

    result.dataValues.recruitments = recruitments;

    return res
    .status(statusCode.OK)
    .send(response(statusCode.OK,
      message.SUCCESS,
      result
    ));
  }
  catch(err){
    logger.error(`getRecruitment Controller Err: ${err}`);
    console.log(err);
    
    return res.
    status(statusCode.INTERNAL_SERVER_ERROR)
    .send(errResponse(statusCode.INTERNAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    ));
  }
}

export const deleteRecruitment = async (req, res) => {
  try{
    const {recruitment_id} = req.params;

    const isExistRecruitmentId = await Recruitment.findByPk(recruitment_id);
    if (!isExistRecruitmentId){
      return res
      .status(statusCode.NOT_FOUND)
      .send(errResponse(statusCode.NOT_FOUND,
        message.NOT_FOUND
      ));
    };

    await Recruitment.destroy({
      where: {
        recruitment_id
      }
    });

    return res
    .status(statusCode.OK)
    .send(response(statusCode.OK,
      message.SUCCESS));
  }
  catch(err){
    logger.error(`deleteRecruitment Controller Err: ${err}`);
    console.log(err);
    
    return res.
    status(statusCode.INTERNAL_SERVER_ERROR)
    .send(errResponse(statusCode.INTERNAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    ));
  }
}