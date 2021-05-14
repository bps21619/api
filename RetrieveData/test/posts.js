const axios = require('axios');
const express = require('express');
const router = express.Router();


router.get("/",(req,res,next)=>{
    

    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then( (response)=>{
        let postsArray=[]
   response.data.map((posts)=>{
        postsArray.push(posts)

   }
   )
}

    )
    .catch((err)=>{
        console.log(errr)
    })
    res.render("posts")
})

     module.render("posts")
