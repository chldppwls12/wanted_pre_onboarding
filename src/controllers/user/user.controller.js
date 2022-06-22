import Sequelize, {Op} from 'sequelize';
import { logger } from '../../config/winston.js';
import History from '../../models/history.js';
import Recruitment from '../../models/recruitment.js';
import User from '../../models/user.js';
import { response, errResponse } from '../../utils/response.js';
import statusCode from '../../utils/statusCode.js';
import message from '../../utils/responseMessage.js';

export const addRecruitment = async (req, res) => {
  try{
    const {recruitment_id, user_id} = req.body;
    
    const isExistRecruitmentId = await Recruitment.findByPk(recruitment_id);
    if (!isExistRecruitmentId){
      return res
      .status(statusCode.NOT_FOUND)
      .send(errResponse(statusCode.NOT_FOUND,
        message.NOT_FOUND
      ));
    };

    const isExistUserId = await User.findByPk(user_id);
    if (!isExistUserId){
      return res
      .status(statusCode.NOT_FOUND)
      .send(errResponse(statusCode.NOT_FOUND,
        message.NOT_FOUND
      ));
    };

    const isApplied = await History.findOne({
      where: {
        recruitment_id,
        user_id
      }
    });
    if (isApplied){
      return res
      .status(statusCode.CONFLICT)
      .send(errResponse(statusCode.CONFLICT,
        message.DUPLICATED
      ));
    }

    await History.create({
      recruitment_id,
      user_id
    });

    return res
    .status(statusCode.CREATED)
    .send(response(statusCode.CREATED,
      message.SUCCESS
    ));

  }catch(err){
    logger.error(`addRecruitment Controller Err: ${err}`);
    console.log(err);
    
    return res.
    status(statusCode.INTERNAL_SERVER_ERROR)
    .send(errResponse(statusCode.INTERNAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    ));
  }
};