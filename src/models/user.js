import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(sequelize){
    return super.init({
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'user',
      tableName: 'user',
      timestamps: true,
      underscored: true
    })
  };

  static associate(db){
    db.User.hasMany(db.History, {foreignKey: 'user_id'});
  }
};

export default User;
