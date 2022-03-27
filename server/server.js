require("dotenv").config();
const path = require("path");

const express = require("express"),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require("mongoose"),
  image = require("./routes/Image");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/nasa-mongodb-material-ui"
// );

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/nasa-mongodb-material-ui";

// console.log("MONGODB_URI", MONGODB_URI);

// Connection URL
mongoose.Promise = global.Promise;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"));

// Test connection
const db = mongoose.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});
app.use("/image", image);

// app.listen(port, () => console.log("server is up"));
app.listen(port, () => console.log(`app listening on port ${port}!`));

// var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// .then((connection) => {
//   console.log(connection.connection.db.listCollections().toArray());
//   // return connection.connection.db.listCollections().toArray();
// })
// .then((collections) => {
//   console.log(collections);

//   return Promise.resolve({
//     success: true,
//     collections,
//   });

// db.once("open", function callback() {
//   console.log("h");
// });

// mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
// .then((connection) => {
//  return connection.connection.db.listCollections().toArray();
// })
// .then((collections) => {
//  return Promise.resolve({
//   success: true,
//   collections
//  });
// })
// .catch((err) => Promise.reject(err.message || err));

// var db = mongoose.connection;

// connection.on("open", function () {
//   connection.db.listCollections().toArray(function (err, names) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(names);
//     }

//     mongoose.connection.close();
//   });
// });

// db.findOne(
//   {
//     name,
//   },
//   (err, obj) => {
//     console.log(obj);
//   }
// );

// console.log(
//   "Collection Names: ",
//   db.runCommand({
//     listCollections: 1.0,
//     authorizedCollections: true,
//     nameOnly: true,
//   })
// );
