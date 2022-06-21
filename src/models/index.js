import dotenv from "dotenv";
dotenv.config();

import Sequelize from 'sequelize';
import User from './user.js';
import Company from './company.js';
import History from './history.js';
import Recruitment from './recruitment.js';

const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

db.sequelize = sequelize;
db.User = User;
db.Company = Company;
db.History = History;
db.Recruitment = Recruitment;


User.init(sequelize);
Company.init(sequelize);
History.init(sequelize);
Recruitment.init(sequelize);

User.associate(db);
Company.associate(db);
Recruitment.associate(db);

export default db;
