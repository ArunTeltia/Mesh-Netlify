const express = require("express");
const serverless = require("serverless-http");
const fetch = require("node-fetch");
var bodyParser = require("body-parser");

const app = express();
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbywvDD9cDyJR_4d3gpiTSa_OmE8BZwaOorQwEBg2wjKSwUdc3InHs76be2dNi2lg349lA/exec";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.render("dashboard");
});

router.post("/", (req, res) => {
  const email = req.body.email;
  const organisation = req.body.organisation;
  console.log(req.body);
  console.log(organisation);
  const url = `${GOOGLE_SHEET_URL}?Email=${encodeURIComponent(
    email
  )}&Organisation=${encodeURIComponent(organisation)}`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => console.log("google sheet res", { res }))
    .catch((error) => console.error(error));

  res.send("success");
});
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
