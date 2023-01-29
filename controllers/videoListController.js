const videomodel = require("../models/videoModel");

// Function to call the list on the basis of pageNumber
module.exports.getVideoList = async function getVideoList(req, res) {
  try {
    const pageNumber = req.params.pageNumber - 1;
    const limit = 20;
    const skip = pageNumber * limit;
    if (isNaN(pageNumber)) {
      res.status(500).send({ error: "page number not valid" });
    } else {
      const videoList = await videomodel
        .find()
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit);
      if (videoList) {
        res
          .status(200)
          .json({ message: "Data fetched successfully!", data: videoList });
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
