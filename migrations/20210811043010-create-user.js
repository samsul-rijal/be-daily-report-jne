'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nik: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      jenisKelamin: {
        type: Sequelize.STRING
      },
      noHp: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.TEXT
      },
      foto: {
        type: Sequelize.STRING
      },
      levelId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'levels',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};