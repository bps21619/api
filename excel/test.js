const fs = require('fs');
const mysql = require('mysql');
const path = require("path")

const multer = require('multer');
const express = require('express');

const readXlsxFile = require('read-excel-file/node');

const app = express();
 
global.__basedir = __dirname;
 
// -> Multer Upload Storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	   cb(null, __basedir + '/uploads/')
	},
	filename: (req, file, cb) => {
	   cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
	}
});

const upload = multer({storage: storage});

// -> Express Upload RestAPIs
app.post('/api/uploadfiles', upload.single("uploadfile"), (req, res) =>{
	importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename);
	res.json({
				'msg': 'File uploaded/import successfully!', 'file': req.file
			});
});

// -> Import Excel Data to MySQL database
function importExcelData2MySQL(filePath){
	// File path.
	readXlsxFile(filePath).then((rows) => {
		// `rows` is an array of rows
		// each row being an array of cells.	 
		console.log(rows);
	 
		/**
		[ [ 'Id', 'Name', 'Address', 'Age' ],
		[ 1, 'Jack Smith', 'Massachusetts', 23 ],
		[ 2, 'Adam Johnson', 'New York', 27 ],
		[ 3, 'Katherin Carter', 'Washington DC', 26 ],
		[ 4, 'Jack London', 'Nevada', 33 ],
		[ 5, 'Jason Bourne', 'California', 36 ] ] 
		*/
	 
		// Remove Header ROW
		rows.shift();
	 
		// Create a connection to the database
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'purna',
			database: 'bps'
		});
	 
		// Open the MySQL connection
		connection.connect((error) => {
			if (error) {
				console.error(error);
			} else {
                console.log("connect db")
				let query = 'INSERT INTO customer (id, address, name, age) VALUES ?';
				connection.query(query, [rows], (error, response) => {
				console.log(error || response);

				/**
				OkPacket {
				fieldCount: 0,
				affectedRows: 5,
				insertId: 0,
				serverStatus: 2,
				warningCount: 0,
				message: '&Records: 5  Duplicates: 0  Warnings: 0',
				protocol41: true,
				changedRows: 0 } 
				*/
				});
			}
		});
	})
}

// Create a Server
let server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port) 
})