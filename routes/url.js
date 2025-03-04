const {Router} = require("express");
const URLrouter = Router();

const { handleGenerateShortURL, handleGetAnalytics} = require("../controller/url");

URLrouter.post("/url",handleGenerateShortURL);

// URLrouter.get("/:id",handleRedirectToOriginalURL);

URLrouter.get("/analytics/:id",handleGetAnalytics);


module.exports = {
    URLrouter
}