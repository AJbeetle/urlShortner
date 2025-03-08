const express = require("express");
const mongoose = require("mongoose");
const { URLrouter }  = require("./routes/url");
const { staticRouter } = require("./routes/staticRouter");
const {urlModel} = require("./model/url");
require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT;

// const user = process.env.user;
// const password = process.env.password;
// const database = process.env.database;
const app= express();



mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.password}@cluster0.k8p8l.mongodb.net/${process.env.database}`).then(()=>{
    console.log("database connected");
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.json());
app.use(express.static("public"));
//middleware used to parse form data
app.use(express.urlencoded({extended : true}))

// app.get("/favicon.ico", function(req,res){
//     res.status(204); //no content response
// })
app.get("/api/shortURL/",function(req,res){
    res.json({
        message : "go to different endpoint of this api : http://localhost:8000/api/urlShortner and this is post request containing body with the actual url "
    })
})

//exposing whole database to template engine - not needed anymore 
/* app.get("/getAllUrls",async function(req,res){
    try{
        const allURL = await urlModel.find({});
        res.json(allURL);
    }
    catch(e){
        res.status(500).json({
            err : `error : ${e.message}`
        })
    }
}) */



/* app.get("/testFrontend",async function(req, res){
    // return res.end("<h1>Hey from server</h1>")
    // we will use templating engines : like pubjs, ejs and handlebars

    //some example of bad server side rendering

    // const allURL = await urlModel.find({});
    // return res.end(
    //     `
    //         <html>
    //         <body>
    //         <ol>
    //         ${allURL.map(url => `<li>${url.shortParam} - ${url.redirectURL} - ${(url.visitHistory).length}</li>`).join("")}
    //         </ol>
    //         </body>
    //         </html>
    //     `
    // )

    // res.json(allURL).render("home"); //wrong

    const allUrls = await urlModel.find({});
    // res.render("home");  //1st way of doing
    
    //correct way :-
    res.render("home",{
        urls : allUrls
    });


}) */

    
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
app.use("/frontend",staticRouter);

app.listen(PORT,()=>{
    console.log("listening on port",PORT);
})