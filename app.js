const express = require("express");
const app = express();
const mongoose = require("mongoose");
const getRefreshedList = require("./jobs/getVideoList");

app.use(express.json());
app.listen(process.env.PORT || 3000);
const videoRouter = require("./routers/videoRouter");

app.use("/", videoRouter);

// Database connection
const db_link = process.env.MONGODB_URL;
mongoose
  .connect(db_link)
  .then((db) => {
    console.log("db connected");
  })
  .catch((err) => {
    //console.log(error);
    console.log("db connection error");
  });

// Cron job
getRefreshedList();
