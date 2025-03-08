const {Router} = require("express");
const staticRouter = Router();
const {handleHomePage, handleURLgenerated, handleAnalytics} = require("../controller/static");

staticRouter.get("/home",handleHomePage);

staticRouter.get("/url",handleURLgenerated);

staticRouter.get("/analytics",handleAnalytics);

module.exports = {
    staticRouter
}