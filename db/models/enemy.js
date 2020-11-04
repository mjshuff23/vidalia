'use strict';
module.exports = (sequelize, DataTypes) => {
  const Enemy = sequelize.define('Enemy', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    size: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    subtype: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    alignment: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    armorClass: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hitPoints: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    hitDice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    challenge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stength: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dexterity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    constitution: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    intelligence: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wisdom: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    charisma: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    xpReward: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Enemy.associate = function(models) {
    // associations can be defined here
  };
  return Enemy;
};