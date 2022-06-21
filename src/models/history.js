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
};

export default History;