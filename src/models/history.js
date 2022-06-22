import { Model, DataTypes } from 'sequelize';

class History extends Model {
  static init(sequelize){
    return super.init({
      history_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'history',
      tableName: 'history',
      timestamps: true,
      underscored: true
    })
  };

  static associate(db){
    db.History.belongsTo(db.Recruitment, {foreignKey: 'recruitment_id'});
    db.History.belongsTo(db.User, {foreignKey: 'user_id'});
  }
};

export default History;