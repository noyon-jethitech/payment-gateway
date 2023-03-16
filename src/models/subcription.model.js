/* eslint-disable no-param-reassign */
const rechargeTrack = (sequelize, DataTypes) => {
  // Track Table (
  //   user_id
  //   recharge_id
  //   recharge_date_time
  //   consumption_date_time
  // )


  const RechargeTrack = sequelize.define('recharge_track', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    recharge_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    recharge_date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    consumption_date_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
    tableName: 'subscription',
    timestamps: true,
    underscored: true,
    paranoid: true,
  });

  RechargeTrack.associate = models => {
    console.log(models); // remove this line after uncommenting below lines
    // User.hasMany(models.workspace, {
    //   as: 'workspace_creator',
    //   foreignKey: 'userId',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    // });
  };

  return RechargeTrack;
};

module.exports = rechargeTrack;
