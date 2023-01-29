const { google } = require("googleapis");
const googleAPIKeys = process.env.YOUTUBE_API_KEYS.split(",");

module.exports.getVidoesFromYoutube = async () => {
  for (const apiKey in googleAPIKeys) {
    console.log(googleAPIKeys[apiKey], "Hi");
    let flag = false;
    try {
      if (flag) {
        break;
      } else {
        let gcall = google.youtube({
          version: "v3",
          auth: googleAPIKeys[apiKey],
        });
        // Get Date of 1 month ago
        const publishAfterDateValue = new Date();
        publishAfterDateValue.setMonth(publishAfterDateValue.getMonth() - 1);

        const searchQuery = process.env.YOUTUBE_SEARCH_QUERY;
        const data = await gcall.search.list({
          part: ["snippet"],
          maxResults: 50,
          order: "date",
          q: searchQuery,
          relevanceLanguage: "en",
          publishedAfter: publishAfterDateValue,
        });
        if (data) {
          const list = data.data.items.map((item) => {
            return {
              title: item.snippet.title,
              description: item.snippet.description,
              channelId: item.snippet.channelId,
              channelTitle: item.snippet.channelTitle,
              videoId: item.id.videoId,
              thumbnails: {
                default: item.snippet.thumbnails.default,
                medium: item.snippet.thumbnails.medium,
                high: item.snippet.thumbnails.high,
              },
              publishedAt: item.snippet.publishedAt,
            };
          });
          flag = true;
          console.log("Successfully Fetched Videos");
          return list;
        } else {
          console.log("Vidoes not available");
          //return [];
        }
      }
    } catch (err) {
      console.log("There was some error in getting videos", err);
    }
  }
  return [];
};
