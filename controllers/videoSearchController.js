const videomodel = require("../models/videoModel");

// Function to call the list on the basis of query and pagenumber
module.exports.getVideoByQuery = async function getVideoByQuery(req, res) {
  try {
    const pageNumber = req.params.pageNumber - 1;
    const limit = 20;
    const skip = pageNumber * limit;
    if (isNaN(pageNumber)) {
      res.status(500).send({ error: "page number not valid" });
      return;
    }
    const searchQuery = req.params.searchQuery;
    if (!searchQuery || searchQuery === "") {
      res.status(500).json({ error: "search query not valid" });
      return;
    } else {
      const videoListByQuery = await videomodel
        .fuzzySearch(searchQuery)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit);
      if (videoListByQuery) {
        res.status(200).json({
          message: "Data fetched successfully!",
          data: videoListByQuery,
        });
      } else {
        res
          .status(500)
          .json({ message: "There was some error in fetching data" });
      }
    }
  } catch {
    res.status(500).json({ message: "There has beeen error in fetching data" });
  }
};
