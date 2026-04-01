'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favourites', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },  

    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    propertyId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Properties',
        key: 'id'
      }
    },
    

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    
  );

    await queryInterface.addConstraint('Favourites', {
      fields: ['userId', 'propertyId'],
      type: 'unique',
      name: 'unique_user_property_favourite'
    });

   
    await queryInterface.addIndex('Favourites', ['userId']);
    await queryInterface.addIndex('Favourites', ['propertyId']);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favourites');
  }
};