const {urlModel } = require("../model/url");
const { nanoid } = require("nanoid");
require("dotenv").config({
    path : "../.env"
})

// errors pertaining ES MODULE for latest version of nanoid, so using version 3 of nanoid
// import nanoid;
// import {nanoid} from 'nanoid'

async function handleGenerateShortURL(req, res){
    try{
        const str = nanoid(5);
        if(!req.body.url){
            return res.status(403).json({
                err : "please provide the URL to be shortened"
            })
        }
        const foundURL = await urlModel.findOne({
            redirectURL : req.body.url
        })
        if(foundURL){

            // return res.json({
            //     foundURL
            // })


            const encodedData = encodeURIComponent(JSON.stringify(foundURL));
            const url = `${process.env.BASE_URL}/frontend/url/?data=${encodedData}`
            return res.redirect(url);
            
        }
        const newEntry = await urlModel.create({
            shortParam : str,
            shortId : `${process.env.BASE_URL}/${str}`,
            redirectURL : req.body.url,
            visitHistory : []
        })

        // Sending JSON as response from backend API ------------------ Instead of sending json as response now we render server side templating engines
        // return res.json({
        //     shortId : `unique id for your given url : ${newEntry.shortParam}`,
        //     shortUrl : `shortened url : ${newEntry.shortId}`,
        //     getAnalytics : `go to see noOfVists : http://localhost:${process.env.PORT}/api/urlShortner/analytics/${newEntry.shortParam}`
        // })
        

        // directing to frontend static router with whole newEntry document -----------------------
        const encodedData = encodeURIComponent(JSON.stringify(newEntry));
        return res.redirect(`${process.env.BASE_URL}/frontend/url/?data=${encodedData}`);



    
        // console.log(str.length);    
    }
    catch(e){
        res.status(500).json({
            err : `error for nowww : ${e.message}`
        })
    }
}

/* async function handleRedirectToOriginalURL(req,res){
        try{
            shortParam = req.params.id;
            console.log(shortParam);
            const found = await urlModel.findOne({
                shortParam
            })

            let visits = found.visitHistory;
            console.log(visits);
            visits.push({
                timestamp : Date.now() 
            });
            console.log(visits);
    
            await urlModel.updateOne({
                _id : found._id
            },{
            //    $push : {
            //     visitHistory : {timestamp : Date.now()}
            //    }
                visitHistory : visits
            })
    
            res.redirect(found.redirectURL); 

        }
        catch(e){
            res.status(500).json({
                err : `error : ${e.message}`
            })
        }
    } */

async function handleGetAnalytics(req, res){
    try{
        const shortId = req.params.id;
        const found = await urlModel.findOne({
            shortParam : shortId
        })

        const encodedData = encodeURIComponent(JSON.stringify({
            noOfVisits : (found.visitHistory).length,
            analytics : found.visitHistory,
            shortId : found.shortId
        }));

        return res.redirect(`${process.env.BASE_URL}/frontend/analytics/?data=${encodedData}`);

        // res.json({
        //     noOfVists : (found.visitHistory).length,
        //     analytics : found.visitHistory
        // })
    }
    catch(e){
        res.status(500).json({
            err : `some error occured : ${e.message}`
        })
    }
}

module.exports = {
    handleGenerateShortURL,
    // handleRedirectToOriginalURL,
    handleGetAnalytics
}