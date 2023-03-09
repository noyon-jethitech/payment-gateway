/* eslint-disable no-param-reassign */
const recharge = (sequelize, DataTypes) => {
  const Recharge = sequelize.define('recharge', {
    feature: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minutes_consumed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recharge_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
    tableName: 'recharge',
    timestamps: true,
    underscored: true,
    paranoid: true,
  });

  Recharge.associate = models => {
    console.log(models); // remove this line after uncommenting below lines
    // User.hasMany(models.workspace, {
    //   as: 'workspace_creator',
    //   foreignKey: 'userId',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    // });
    //};
  }

  return Recharge;
}


module.exports = recharge;
