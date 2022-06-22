import Sequelize from 'sequelize';
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