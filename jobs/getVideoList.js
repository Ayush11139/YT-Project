const cron = require("node-cron");
const { getVidoesFromYoutube } = require("../helpers/googleAPICaller");
const videoModel = require("../models/videoModel");

getRefreshedList = () => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const videoList = await getVidoesFromYoutube();
      if (videoList) {
        const insertToDB = await videoModel.insertMany(videoList);
        if (!insertToDB) {
          console.log("Error in saving new videos to database");
        } else {
          console.log("Successfully saved refreshed data to db");
        }
      } else {
        console.log("Error getting vidoes from Youtube");
      }
    } catch (err) {
      console.log(
        "There was some error in refreshing the video list from one of the keys",
        err
      );
    }
    console.log("Ruuning Job in every 10 seconds");
  });
};

module.exports = getRefreshedList;
