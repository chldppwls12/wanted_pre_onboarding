import { Model, DataTypes } from 'sequelize';

class Recruitment extends Model {
  static init(sequelize){
    return super.init({
      recruitment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      position: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      content: {
        type: DataTypes.STRING(2000),
        allowNull: false
      },
      compensation: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      skill: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'recruitment',
      tableName: 'recruitment',
      timestamps: true,
      underscored: true
    })
  };

  static associate(db){
    db.Recruitment.belongsTo(db.Company, {foreignKey: 'company_id'});
    
    db.Recruitment.hasMany(db.History, {foreignKey: 'recruitment_id'})
  }
};

export default Recruitment;
