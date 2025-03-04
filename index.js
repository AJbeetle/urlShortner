const express = require("express");
const mongoose = require("mongoose");
const { URLrouter }  = require("./routes/url");
const {urlModel} = require("./model/url");
require("dotenv").config();
const PORT = process.env.PORT;

// const user = process.env.user;
// const password = process.env.password;
// const database = process.env.database;

mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.password}@cluster0.k8p8l.mongodb.net/${process.env.database}`).then(()=>{
    console.log("database connected");
})
const app= express();
app.use(express.json());
app.get("/api/shortURL/",function(req,res){
    res.json({
        message : "go to different endpoint of this api : http://localhost:8000/api/urlShortner and this is post request containing body with the actual url "
    })
})

app.get("/:id",async function(req, res){
    try{
        shortParam = req.params.id;
        console.log(shortParam);
        const found = await urlModel.findOne({
            shortParam
        })

        // let visits = found.visitHistory;
        // console.log(visits);
        // visits.push({
        //     timestamp : Date.now() 
        // });
        // console.log(visits);

        await urlModel.updateOne({
            _id : found._id
        },{
           $push : {
            visitHistory : {timestamp : Date.now()}
           }
            // visitHistory : visits
        })

        res.redirect(found.redirectURL); 

    }
    catch(e){
        res.status(500).json({
            err : `error : ${e.message}`
        })
    }
})

app.use("/api/urlShortner/",URLrouter);


app.listen(PORT,()=>{
    console.log("listening on port",PORT);
})