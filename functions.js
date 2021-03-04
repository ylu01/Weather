/*------------------------------
|      functions.js            |
------------------------------*/

var obj; //the Object extracted from json
var url; //JSON api url
var farStr, celStr; //display strings


$.getJSON('https://ipinfo.io', function(a){
var location = a.loc;
  //alert(location);
    locationArray = location.split(',');
    var aa = locationArray[0];
    var bb = locationArray[1];
  document.getElementById("city").innerHTML = "city: " + a.city + ", " + a.country;
  url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + aa + "&" + "lon=" + bb + "token";
  //document.getElementById("title").innerHTML = url;
 
  $.getJSON(url, function(result){
    //
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
  
  //alert("AAAAAAAAAAAAAAAA");
  //alert(a.country);
    //alert("lat: " + aa + " long:" + bb);
    
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
  var clear = "url('img/sunny.jpg')";
  var rain = "url('img/rain.jpg')";
  var cloudy = "url('img/cloudy.jpg')";
  var snow = "url('img/snow.jpg')";

  if (str === "Clear"){
    document.body.style.backgroundImage = 'sunny.jpg';
  }
  else if(str === "Clouds"){
      
    document.body.style.backgroundImage = clear;
    //changeTextColor();
    
  }
  else if(str === "Snow"){
    changeTextColor();
    document.body.style.backgroundImage = 'sunny.jpg';
  }
  else if(str === "Rain"){
    document.body.style.backgroundImage = 'sunny.jpg';
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
