const axios = require('axios');
const mysql = require("mysql")
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password:"purna",
    database: "bps"
})
async function  bps()

{
const nonMiddleAgedJennifers = await Person.query()
  .where(builder => builder.where('age', '<', 40).orWhere('age', '>', 60))
  .where('firstName', 'Jennifer')
  .orderBy('lastName');

console.log('The last name of the first non middle aged Jennifer is');
console.log(nonMiddleAgedJennifers[0].lastName);
}bps()