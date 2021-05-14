const { response  } = require('express');
const express = require('express');

//const mysql = require('mysql');
const Datastore = require("nedb")
  const app = express();
 app.listen(3000,()=>console.log('listening 3000'))
 app.use(express.static('public'));
  
app.use(express.json({limit: "1mb"}))

const database = new Datastore("database.db")

database.loadDatabase();

app.get('/bps',(req,res)=>{
  database.find({},(err,data)=>{
      if(err){
          res.end();
          return;
      }
      res.json(data)
  })
})

app.post('/bps',(req,res)=>{
    console.log(req.body);
    const data = req.body
    const timestamp = Date.now()
    data.timestamp =timestamp;

    database.insert(data)
    console.log(databse);

    res.json({
        status: "success",
        timestamp: timestamp,
        latitude: data.latitude,
        longitude: data.longitude
    })
});