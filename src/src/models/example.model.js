/* eslint-disable no-param-reassign */
const example = (sequelize, DataTypes) => {
  const Example = sequelize.define('example', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastpasswordupdate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    wrongOtpAttempt: {
      type: DataTypes.INTEGER,
      required: false,
      defaultValue: 0,
    },
    otpExpireTime: {
      type: DataTypes.DATE,
      required: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      required: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDisabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLoggedIn: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
    tableName: 'example',
    timestamps: true,
    underscored: true,
    paranoid: true,
  });

  Example.associate = models => {
    console.log(models); // remove this line after uncommenting below lines
    // User.hasMany(models.workspace, {
    //   as: 'workspace_creator',
    //   foreignKey: 'userId',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    // });
  };

  return Example;
};

module.exports = example;
