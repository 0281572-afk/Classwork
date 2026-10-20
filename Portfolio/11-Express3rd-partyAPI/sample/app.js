const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// const axios = require("axios");
// const FormData = require("form-data");
// const { RedirectHandler } = require("undici-types");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "4d551ccf0178a766ea1ab2b7dac18502";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  //https method call service
  https.get(url, (response) => { //handles the response when a connection is succesful
    let rawData = "";

    //using response.on("data", callback) method
    response.on("data", (chunk) => { //the fragments of data recieved by api are accumalted, fires multiple times
      rawData += chunk; //asamble the data chunks into one string
    });

    response.on("end", () => { //once no more data is coming, fires once
      try{
        const weatherData = JSON.parse(rawData);

        if(response.statusCode===200){
          const temp = weatherData.main.temp; //show temp in c
          const weatherDescription = weatherData.weather[0].description; //provide description
          const icon = weatherData.weather[0].icon; //image describing description
          const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          res.write(`<h1>The temperature in ${query} is ${temp} degrees Celsius.</h1>`);
          res.write(`<p>The weather is currently ${weatherDescription}</p>`);
          res.write(`<img src="${imageURL}" alt="${weatherDescription}">`);
          res.write(`<br><br><a href="/">Back to home page</a>`);

          res.send();
        } else {
          res.write(`<h1>Error ${response.statusCode}: ${weatherData.message || "City not found"}</h1>`);
          res.write(`<br><a href="/">Back to home page</a>`);
          
          res.send();
        }
      } catch (error) {
        res.write(`<h1>Error parsing weather data</h1>`);
        res.write(`<br><a href="/">Back to home page</a>`);
        res.send();
      }
    });
  }).on("error", (error) => { //handles request errors
    res.write(`<h1>Network Error: ${error.message}</h1>`);
    res.write(`<br><a href="/">Back to home page</a>`);

    res.send();
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});


/*
// https get
app.get("/", (req, res) => {
  var url = "http://placekitten.com/g/300/300";
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      res.write(data);
      res.send();
    });
  });
});

// https post
app.get("/dictionary", (req, res) => {
  var url = "https://api.toys/api/check_dictionary";
  const form_data = new FormData();
  form_data.append("text", "marry");
  const options = {
    method: "POST",
    headers: form_data.getHeaders(),
  };
  var soapRequest = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      response
        .on("data", (data) => {
          var jsonResp = JSON.parse(data);
          console.log(jsonResp);
          res.send("Success");
        })
        .on("error", (e) => {
          res.send("Error ${e.message}");
        });
    } else {
      res.send("Error");
    }
  });
  form_data.pipe(soapRequest);
});

// axios post
app.get("/temp", (req, res) => {
  var url = "https://api.toys/api/check_dictionary";
  const form_data = new FormData();
  form_data.append("text", "marry");
  axios
    .post(url, form_data, { headers: form_data.getHeaders() })
    .then((response) => {
      var data = response.data;
      console.log(data);
      if (!data.hasOwnProperty("error")) {
        console.log("no error");
        res.send("Success");
      } else {
        console.log("Fail");
        res.send("Fail");
      }
    })
    .catch((err) => {
      console.log(err.code + ": " + err.message);
      console.log(err.stack);
      res.send("Fail error");
    });
});
*/
