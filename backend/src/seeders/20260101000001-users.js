'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = '$2b$10$8/ll4CPyfZuYiJasxSbnIOdz0rqLap/AAc2epogRvaLvx06t/TJUC';
    const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiajFAZ21haWwuY29tIiwiaWQiOiI0ZGQyODNhMS05ZDZlLTQyYmItYTY0ZS1jMzdlN2UyNjY5OTEifSwiaWF0IjoxNzc1MDYyMDU3LCJleHAiOjE3NzU2NjY4NTd9.kfY8iYy3Oh03KIjlaCnmHhvjyVVM6u5o65Hr7WrbVj8';

    await queryInterface.bulkInsert('Users', [
      {
        id: '96108474-dfe3-4636-862d-2f453935ea41',
        email: 'JohnbBuyer@gmail.com',
        username: 'John',
        password: hashedPassword,
        refreshToken: refreshToken,
        role: 'BUYER',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
        email: 'SaritaBuyer@gmail.com',
        username: 'Sarita',
        password: hashedPassword,
        refreshToken: refreshToken,
        role: 'BUYER',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
    ], { 
      ignoreDuplicates: true 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: {
        [Sequelize.Op.in]: [
          'JohnbBuyer@gmail.com',
          'SaritaBuyer@gmail.com',
          'mahesh@gmail.com',
          'roshan@gmail.com'
        ]
      }
    }, {});
  }
};