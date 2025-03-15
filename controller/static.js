const {urlModel} = require("../model/url");
require("dotenv").config({
    path : "../.env"
})

async function handleHomePage(req,res){
    try{
        const getAllUrls = await urlModel.find({});
        // for exposing whole dataset
        /* return res.render("home",{
            urls : getAllUrls
        }) */
    
        return res.render("home",{
            urls : getAllUrls,
            BASE_URL : process.env.BASE_URL
        });
    }
    catch(e){
        res.status(500).json({
            error : `${e.message}`
        })
    }
}

async function handleURLgenerated(req, res){

    try{
        const getAllUrls = await urlModel.find({});
    
        const encodedData = req.query.data;
        const ob = JSON.parse(decodeURIComponent(encodedData));
        // earlier I was rendering whole new ejs file [info.ejs], now making changes to home.ejs only
        return res.render("home",{
            urls : getAllUrls,
            shortURL : ob.shortId,
            analyticsLink : `${process.env.BASE_URL}/api/urlShortner/analytics/${ob.shortParam}`,
            BASE_URL : process.env.BASE_URL
        });

    }
    catch(e){
        res.status(500).json({
            error : `${e.message}`
        })
    }
}

async function handleAnalytics(req,res){
    try{
        const getAllUrls = await urlModel.find({});
    
        const encodedData = req.query.data;
        const ob = JSON.parse(decodeURIComponent(encodedData));
        // earlier I was rendering whole new ejs file [analytics.ejs], now making changes to home.ejs only
        return res.render("home",{
            urls : getAllUrls,
            noOfVisits : ob.noOfVisits,
            analytics : ob.analytics,
            shortURL : ob.shortId,
            BASE_URL : process.env.BASE_URL
        })
    }
    catch(e){
        res.status(500).json({
            error : `${e.message}`
        })
    }
}

module.exports = {
    handleHomePage,
    handleURLgenerated,
    handleAnalytics
}