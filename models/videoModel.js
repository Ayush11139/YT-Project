const mongoose = require("mongoose");
const mongooseFuzzySearching = require("mongoose-fuzzy-searching");

const videomodel = new mongoose.Schema(
  {
    title: String,
    channelId: String,
    channelTitle: String,
    videoId: String,
    description: String,
    thumbnails: {
      default: {
        url: String,
        width: Number,
        height: Number,
      },
      medium: {
        url: String,
        width: Number,
        height: Number,
      },
      high: {
        url: String,
        width: Number,
        height: Number,
      },
    },
    publishedAt: Date,
  },
  {
    timestamps: true,
  }
);

videomodel.plugin(mongooseFuzzySearching, {
  fields: ["title", "description"],
});

module.exports = mongoose.model("Video", videomodel);
