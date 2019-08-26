'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user1',
    [
      {
        email: "jennifer@gmail.com",
        name: 'jenifer',
        password: "1234jenifer"
      },
      {
        email: "bram@gmail.com",
        name: 'bravo',
        password: "1bravo"
      },
      {
        email: "tom@gmail.com",
        name: 'tom',
        password: "1234jenitom"
      },
      {
        email: "maximillian@gmail.com",
        name: 'max',
        password: "1234jenifer"
      },
      {
        email: "tomo@gmail.com",
        name: 'tom',
        password: "1234jenifer"
      },
      {
        email: "marooke@gmail.com",
        name: 'mar',
        password: "1234jenifer"
      }
    ]
    
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user1', null, {})
  }
};
