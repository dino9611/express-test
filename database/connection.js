const Sequelize=require('sequelize')

const sequelize=new Sequelize('users','postgres','tungkal01',{
    host:'localhost',
    dialect:'postgres',
  })

module.exports=sequelize
