'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('modelusers',
    [
      {
        email: "jennifer@gmail.com",
        name: 'jenifer',
        password: "1234jenifer",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        email: "bram@gmail.com",
        name: 'bravo',
        password: "1bravo",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        email: "tom@gmail.com",
        name: 'tom',
        password: "1234jenitom",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        email: "maximillian@gmail.com",
        name: 'max',
        password: "1234jenifer",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        email: "tomo@gmail.com",
        name: 'tom',
        password: "1234jenifer",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        email: "marooke@gmail.com",
        name: 'mar',
        password: "1234jenifer",
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('modelusers', null, {})
  }
};
