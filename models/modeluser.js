'use strict';
const Sequelize=require('sequelize')
const sequelize=require('./../database/connection')

module.exports=sequelize.define("modeluser",{
  id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
  },
  name:{
      type:Sequelize.STRING(45),
      allowNull:false
  },
  email:{
      type:Sequelize.STRING(45),
      allowNull:false
  },
  password:{
      type:Sequelize.STRING(45),
      allowNull:false
  }
})