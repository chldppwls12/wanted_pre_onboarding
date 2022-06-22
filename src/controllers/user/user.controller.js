import Sequelize, {Op} from 'sequelize';
import { logger } from '../../config/winston.js';
import History from '../../models/history.js';
import Recruitment from '../../models/recruitment.js';
import User from '../../models/user.js';

export const addRecruitment = async (req, res) => {
  try{
    const {recruitment_id, user_id} = req.body;
    
    const isExistRecruitmentId = await Recruitment.findByPk(recruitment_id);
    if (!isExistRecruitmentId){
      return res.status(400).json('존재하지 않는 recruitment_id 입니다');
    };

    const isExistUserId = await User.findByPk(user_id);
    if (!isExistUserId){
      return res.status(400).json('존재하지 않는 user_id 입니다');
    };

    const isApplied = await History.findOne({
      where: {
        recruitment_id,
        user_id
      }
    });
    if (isApplied){
      return res.status(400).json('이미 지원한 채용공고 입니다');
    }

    await History.create({
      recruitment_id,
      user_id
    });

    return res.status(201).json('성공');

  }catch(err){
    logger.error(`addRecruitment Controller Err: ${err}`);
    console.log(err);
    return res.send(err);
  }
};