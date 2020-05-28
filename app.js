const express = require("express");
const https = require("https"); //native node module
const bodyParser= require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){
const name=req.body.cityName;
url="https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=77b13f5d78b246e1bdaa4daf9df576c7&units=metric"
https.get(url,function(response){

  response.on("data",function(data){
  const weatherData=JSON.parse(data); //----converting unknown to our object format
  const temp = weatherData.main.temp;
  const weatherDesc=weatherData.weather[0].description;
  res.write("<p>The weather is currently " + weatherDesc +"</p>");
  res.write("<h1>The Temperature in "+name+" is "+temp+" degree celcuis");
  res.send();
});
});
});
app.listen(3000,function() {
  console.log("server is running on port 3000..");
})
