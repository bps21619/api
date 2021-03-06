const env = require("./env.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database,env.username,env.password,{
    host: env.host,
    dailect: env.dailect,
    operatorsAliases: false,

    pool:{
        max: env.max,
        min: env.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }

});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize
db.Customer = require("../models/customer.model.js")(sequelize,Sequelize)

module.exports=db;