//const { Sequelize } = require("sequelize/types");
//const { sequelize } = require("../config/db.config");

module.exports=(sequelize,Sequelize)=>{

const Customer = sequelize.define('customer',{

    id :{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primarykey: true
    },
    name:{
        type: Sequelize.STRING
    },
    addres:{
        type: Sequelize.STRING
    },
    age:{
        type: Sequelize.INTEGER
    }
})
return Customer;

}