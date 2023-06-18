const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.cityName; // name of input from HTML
  const apiKey = "a4a15e05e864b95b0b49ea877f322f92";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(
        `<h1>The temperature in ${query} is  ${temp} degrees Celsius.</h1>`
      );
      res.write(`<h2>The weather is currently ${weatherDescription}.</h2>`);
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
