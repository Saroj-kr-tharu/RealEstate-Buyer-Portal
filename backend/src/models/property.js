'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Property.belongsToMany(models.User, {
        through: models.Favourite,
        foreignKey: 'propertyId',
        as: 'favoritedBy',
        onDelete: 'CASCADE'
      });

      Property.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'agent'
      });

    }
  }
  Property.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: DataTypes.STRING,

    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }

  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};