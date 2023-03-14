/* eslint-disable no-param-reassign */
const subscriptionTrack = (sequelize, DataTypes) => {
  const SubscriptionTrack = sequelize.define('subscriptionTrack', {
    reamainingSecond: {
      type: DataTypes.INT,
      allowNull: true,
    },
    remainingMinute: {
      type: DataTypes.INT,
      allowNull: true,
    },
    consumedSecond: {
      type: DataTypes.INT,
      allowNull: true,
    },
    consumedMinute: {
      type: DataTypes.INT,
      allowNull: true,
    },
    paymentId: {
      type: DataTypes.INT,
      allowNull: true,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
    tableName: 'subscriptionTrack',
    timestamps: true,
    underscored: true,
    paranoid: true,
  });

  SubscriptionTrack.associate = models => {
    console.log(models); // remove this line after uncommenting below lines
    // User.hasMany(models.workspace, {
    //   as: 'workspace_creator',
    //   foreignKey: 'userId',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    // });
  };

  return SubscriptionTrack;
};

module.exports = subscriptionTrack;
