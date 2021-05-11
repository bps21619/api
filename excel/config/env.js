const env= {

    database : "bps",
    username: "root",
    password: "purna",
    host: "127.0.0.1",
    dailect: 'mysql',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

module.exports = env;