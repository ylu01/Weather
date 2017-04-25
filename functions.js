/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var obj; //the Object extracted from json
var url; //JSON api url
var farStr, celStr; //display strings
$.getJSON("http://ip-api.com/json", function(result){
  obj = result;
  //extract and display City
  //uses ipinfo to get location. 
  document.getElementById("city").innerHTML = "city: " + obj["city"] + "," + " " + obj["country"];
  //document.getElementById("latlong").innerHTML = obj.lat+ " " + obj.lon;
  //make the url to open weather api
  url = "http://api.openweathermap.org/data/2.5/weather?lat=" + obj["lat"] + "&" + "lon=" + obj["lon"] + "&appid=6c6c8be11fd50a9a68863490af30408f";
  
  //now to get the JSON from api
  $.getJSON(url, function(result){
    var array = result;// local var
    var weatherObj = array["weather"]; //weather obj
    changeBG(weatherObj[0].main); //displays correct bg
    document.getElementById("weatherP").innerHTML = "Weather: " + weatherObj[0].main + "," + weatherObj[0].description;
    //temperatures and conversion. 
    var int = parseFloat(array["main"].temp);
    var cel = int - 273.5;
    var faren;
    cel = Math.ceil(cel);
    faren = cel + 32;
    document.getElementById("temp").innerHTML = "Temperature: " + cel + "C";
    farStr = "Temperature: " + faren + "F";
    celStr = "Temperature: " + cel + "C";
    
    
      
    });
  });

// changes the text on the button according to current
function changeTemp(){

      if( document.getElementById("change").innerHTML === "Farenheit"){
        document.getElementById("change").innerHTML = "Celcius";
        document.getElementById("temp").innerHTML = farStr;
        
      }
      else if(document.getElementById("change").innerHTML === "Celcius"){
        document.getElementById("change").innerHTML = "Farenheit";
        document.getElementById("temp").innerHTML = celStr;
      }
     
}
//displays a correct background image for the current weather
//images are hosted on photobucket. 
function changeBG(str){
  var clear = "url('http://i1281.photobucket.com/albums/a515/iamyangandirule/sunny_zpsqo2ouunk.jpg')";
  var rain = "url('http://i1281.photobucket.com/albums/a515/iamyangandirule/rain_zpsrkz17cgj.jpg')";
  var cloudy = "url('http://i1281.photobucket.com/albums/a515/iamyangandirule/cloudy_zpspo19h7oe.jpg')";
  var snow = "url('http://i1281.photobucket.com/albums/a515/iamyangandirule/snow_zpskkdbkqov.jpg')";

  if (str === "Clear"){
    document.body.style.backgroundImage = clear;
  }
  else if(str === "Clouds"){
    document.body.style.backgroundImage = cloudy;
    //changeTextColor();
    
  }
  else if(str === "Snow"){
    changeTextColor();
    document.body.style.backgroundImage = snow;
  }
  else if(str === "Rain"){
    document.body.style.backgroundImage = rain;
    changeTextColor();
  }
    document.body.style.backgroundSize = "cover";
  //document.body.style.opacity = 0.5;
    
  }
//document.getElementById("divBG").style.backgroundImage

//some text colors are changed so they can be seen better
function changeTextColor(){
  document.getElementById("title").style.color = "white";
    document.getElementById("city").style.color = "white";
  document.getElementById("weatherP").style.color = "white";
    document.getElementById("temp").style.color = "white";
}
