const {urlModel} = require("../model/url");

async function handleHomePage(req,res){
    const getAllUrls = await urlModel.find({});
    // for exposing whole dataset
    /* return res.render("home",{
        urls : getAllUrls
    }) */

    return res.render("home",{
        urls : getAllUrls
    });
}

async function handleURLgenerated(req, res){
    const encodedData = req.query.data;
    const ob = JSON.parse(decodeURIComponent(encodedData));
    // earlier I was rendering whole new ejs file [info.ejs], now making changes to home.ejs only
    return res.render("home",{
        shortURL : ob.shortId,
        analyticsLink : `http://localhost:${process.env.PORT}/api/urlShortner/analytics/${ob.shortParam}`
    });
}

async function handleAnalytics(req,res){
    const encodedData = req.query.data;
    const ob = JSON.parse(decodeURIComponent(encodedData));
    // earlier I was rendering whole new ejs file [analytics.ejs], now making changes to home.ejs only
    return res.render("home",{
        noOfVisits : ob.noOfVisits,
        analytics : ob.analytics
    })
}

module.exports = {
    handleHomePage,
    handleURLgenerated,
    handleAnalytics
}