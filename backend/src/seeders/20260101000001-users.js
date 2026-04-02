'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = '$2b$10$8/ll4CPyfZuYiJasxSbnIOdz0rqLap/AAc2epogRvaLvx06t/TJUC';
    const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiajFAZ21haWwuY29tIiwiaWQiOiI0ZGQyODNhMS05ZDZlLTQyYmItYTY0ZS1jMzdlN2UyNjY5OTEifSwiaWF0IjoxNzc1MDYyMDU3LCJleHAiOjE3NzU2NjY4NTd9.kfY8iYy3Oh03KIjlaCnmHhvjyVVM6u5o65Hr7WrbVj8';

    await queryInterface.bulkInsert('Users', [
      
      {
        id: 'b2c3d4e5-f6a7-4890-b123-456789abcdef',
        email: 'mahesh@gmail.com',
        username: 'manesh',
        password: hashedPassword,
        refreshToken: refreshToken,
        role: 'AGENT',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6a604986-52e5-4104-a266-04f27081cdce',
        email: 'roshan@gmail.com',
        username: 'roshan',
        password: hashedPassword,
        refreshToken: refreshToken,
        role: 'AGENT',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '876461ce-dd71-4e96-bf24-bb96f650e6f8',
        email: 'anush@gmail.com',
        username: 'anush',
        password: hashedPassword,
        refreshToken: refreshToken, 
        role: 'BUYER',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '265c5d4e-9e4e-4395-9afb-a7694e14f02a',
        email: 'prakash@gmail.com',
        username: 'prakash',
        password: hashedPassword,
        refreshToken: refreshToken,
        role: 'BUYER',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { 
      ignoreDuplicates: true 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: {
        [Sequelize.Op.in]: [
          'mahesh@gmail.com',
          'roshan@gmail.com',
          'anush@gmail.com',
          'prakash@gmail.com',
        ]
      }
    }, {});
  }
};