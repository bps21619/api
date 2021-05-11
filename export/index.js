const mysql = require("mysql");
const excel = require("exceljs");
//create a connection to mysql database

const con = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "purna",
    database: "bps"
});  
//open my sql connection
con.connect((err)=>{
    if(err) throw err;
    // query data from my sql
    con.query("select * from customer", function (err,customer,fields){
        const jsonCustomer = JSON.parse(JSON.stringify(customer));
        console.log(jsonCustomer);
    

    let workbook = new excel.Workbook();//creating work book
    let worksheet = workbook.addWorksheet("customer");//creating work sheet
     // Worksheet Header
     worksheet.columns = [
         {header: "id",key: '_id',width: 10},
         {header: "name",key: "name",width: 30},
         {header: 'age',key: "age",width: 10,outlineLevel: 1},
         {header: 'address',key: 'address',width: 30}
         ];
     //add array rows
     worksheet.addRows(jsonCustomer);
     //write to file
     workbook.xlsx.writeFile('customer.xlsx')
     .then(function(){
         console.log("file saved!");
     });

     //close mysql connection
     con.end(function(err){
         if(err){
             return console.log('error'+ err.message);
             }
               console.log("close the databse connection")

            });
            });

        });