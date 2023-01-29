const express = require("express");
const videoRouter = express.Router();

const { getVideoList } = require("../controllers/videoListController");
const { getVideoByQuery } = require("../controllers/videoSearchController");

videoRouter.route("/list/:pageNumber").get(getVideoList);

videoRouter.route("/search/:searchQuery/:pageNumber").get(getVideoByQuery);

module.exports = videoRouter;
