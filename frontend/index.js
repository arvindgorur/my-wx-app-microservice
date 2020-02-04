const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const chalk = require("chalk");
const path = require("path");

const router = express.Router();
const port = 3000;
const wxBackend = `http://${process.env.WX_BE_URL}:8081/`;

let app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

router.route("/hello").get((req, res) => {
  res.send("Hello, World!");
});

app.use("/", router);

app.get("/", (req, res) => {
  res.render("index", { cityName: null, weather: null, error: null });
});

app.post("/", (req, res) => {
  let city = req.body.cityName;
  let wxType = req.body.wxType;
  let url = "";

  if (wxType == "Regular") {
    url = `${wxBackend}weather/${city}`;
  } else {
    url = `${wxBackend}${wxType.toLowerCase()}/${city}`;
  }

  request(url, (err, response, body) => {
    console.log(body);
    let results = JSON.parse(body);

    if (wxType == "Regular") {
      if (results.main == undefined) {
        let errorMsg = `Error: No city by the name '${city}' was found. Please check and try again!`;
        res.render("index", { cityName: null, error: errorMsg });
      } else {
        let temperature = results.main.temp;
        let skyCondition = results.weather[0].description;
        let city = results.name;
        let countryCode = results.country;
        let currentWeather = `The current weather in ${city} is ${temperature} degrees Celsius with ${skyCondition}.`;
        res.render("index", { cityName: city, weather: currentWeather, error: null });
      }
    } else {
      let wxResults = results.data[0];
      res.render("index", { cityName: city, weather: wxResults, error: null });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${chalk.green(port)}`);
});
