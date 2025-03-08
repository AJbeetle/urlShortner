const {urlModel} = require("../model/url");

async function handleHomePage(req,res){
    const getAllUrls = await urlModel.find({});
    // for exposing whole dataset
    /* return res.render("home",{
        urls : getAllUrls
    }) */

    return res.render("home");
}

async function handleURLgenerated(req, res){
    const encodedData = req.query.data;
    const ob = JSON.parse(decodeURIComponent(encodedData));
    return res.render("info",{
        shortURL : ob.shortId,
        getAnalytics : `http://localhost:8000/api/urlShortner/analytics/${ob.shortParam}`
    });
}

async function handleAnalytics(req,res){
    const encodedData = req.query.data;
    const ob = JSON.parse(decodeURIComponent(encodedData));
    return res.render("analytics",{
        noOfVisits : ob.noOfVisits,
        analytics : ob.analytics
    })
}

module.exports = {
    handleHomePage,
    handleURLgenerated,
    handleAnalytics
}