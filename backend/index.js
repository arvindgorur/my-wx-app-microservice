const express = require("express");
const request = require("request");
const chalk = require("chalk");
const path = require("path");

const apiKey = process.env.OPEN_WX_API_KEY;
const avWxAPIKey = process.env.AV_WX_API_KEY;

const router = express.Router();
const port = 8081;

let app = express();

app.use("/", router);

app.get("/metar/:id", (req, res) => {
  let station = req.params.id
  let url = `https://api.checkwx.com/metar/${station}`;
  let options = {
    url: url,
    headers: {
      "X-API-Key": avWxAPIKey
    }
  };
  request(options, (err, response, body) => {
    let results = JSON.parse(body);
    res.send(results)
  });    
});

app.get("/taf/:id", (req, res) => {
  let station = req.params.id
  let url = `https://api.checkwx.com/taf/${station}`;
  let options = {
    url: url,
    headers: {
      "X-API-Key": avWxAPIKey
    }
  };
  request(options, (err, response, body) => {
    let results = JSON.parse(body);
    res.send(results)
  });    
});

app.listen(port, () => {
  console.log(`Listening on port ${chalk.green(port)}`);
});
