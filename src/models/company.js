import { Model, DataTypes } from 'sequelize';

class Company extends Model {
  static init(sequelize){
    return super.init({
      company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      nation: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      area: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'company',
      tableName: 'company',
      timestamps: true,
      underscored: true
    })
  };

  static associate(db){
    db.Company.hasMany(db.Recruitment, {foreignKey: 'company_id'});
  }
};

export default Company;