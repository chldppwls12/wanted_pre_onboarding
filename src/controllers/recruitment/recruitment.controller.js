import Sequelize, {Op} from 'sequelize';
import { logger } from '../../config/winston.js';
import Recruitment from '../../models/recruitment.js';
import Company from '../../models/company.js';

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
      return res.status(404).json('등록된 채용 공고가 없습니다');
    }

    return res.status(200).json(result);
  }catch(err){
    logger.error(`getAllRecruitments Controller Err: ${err}`);
    console.log(err);
    return res.send(err);
  }
};

export const addRecruitment = async (req, res) => {
  try{
    const {company_id, position, compensation, content, skill} = req.body;
    
    const isExistCompanyId = await Company.findByPk(company_id);

    if (!isExistCompanyId){
      return res.status(400).json('존재하지 않는 company_id 입니다');
    }

    await Recruitment.create({
      company_id,
      position,
      compensation,
      content,
      skill
    });

    return res.status(201).json('성공');
  }
  catch(err){
    logger.error(`addRecruitment Controller Err: ${err}`);
    console.log(err);
    return res.send(err);
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

    return res.status(200).json('성공');
  }
  catch(err){
    logger.error(`updateRecruitment Controller Err: ${err}`);
    console.log(err);
    return res.send(err);
  }
}

export const getRecruitment = async (req, res) => {
  try{
    const {recruitment_id} = req.params;

    const isExistRecruitmentId = await Recruitment.findByPk(recruitment_id);
    if (!isExistRecruitmentId){
      return res.status(400).json('존재하지 않는 recruitment_id 입니다');
    };

    const attrs = {
      attributes: [
          'recruitment_id',
          [Sequelize.col('company.name'), 'name'],
          [Sequelize.col('company.nation'), 'nation'],
          [Sequelize.col('company.area'), 'area'],
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
    console.log(result)

    return res.status(200).json(result);
  }
  catch(err){
    logger.error(`getRecruitment Controller Err: ${err}`);
    console.log(err);
    return res.send(err);
  }
}