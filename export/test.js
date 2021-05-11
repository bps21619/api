const mysql = require ('mysql');
const excel = require('exceljs')

// creating databse connection 
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "purna",
    database: "bluepal1" 
});
//establish mysql connection

con.connect((err)=>{
    if(err) throw err;
//excucte sql query
var sql = "select * from employees";
con.query(sql,function(err,employees,fields){

         const emp = JSON.parse(JSON.stringify(employees));
         console.log(emp);
         // cretaing workbook and work sheet
         let workbook = new excel.Workbook();
         let worksheet = workbook.addWorksheet('employees');
          //create work sheet headers
          worksheet.columns =[

            {header: 'empId' ,key: "_empId",width: 5},
            {header: 'empName' ,key: "empName", width: 50},
            {header: "addres", key: "addres",width: 50 },
            {header: "phone" , key: "phone",width:10}

          ]

            // add array rows
            worksheet.addRows(emp);
            //to write excel file
            workbook.xlsx.writeFile("employes2.xlsx")
            .then(function(){console.log("saved file")})
               
               //close mySql database connection
              /* con.end((err)=>{
                   if(err)
                   return console.log('error'+err.message)

                   console.log("closed connection!")
               })*/
            })
})
