var backgrounds = {
  snow: "https://bit.ly/29bsQqH",
  hail: "https://bit.ly/29gktuZ",
  clear: "https://bit.ly/29m1Toy",
  cloudy: "https://bit.ly/29nzWgI",
  thunderstorm: "https://bit.ly/29DoQjR",
  rain: "https://bit.ly/29fBHcu",
  fog: "https://bit.ly/29b6Wrp",
  dust: "https://bit.ly/29lNRCb",
}

function unitViewer(){
  $(".unit-switch").hide();
  $("#temperature").hover(function(){
    $(".unit-switch").show(500);
  },function(){
    $(".unit-switch").hide(500);
  });
}

function setWeatherBG(cond){
  var weatherCondition = cond.toLowerCase().replace(/^[light|heavy]+[\s]/gi, "");
  switch(weatherCondition){
   //SNOWY
    case "snow":
    case "snow grains":
    case "low drifting snow":
    case "blowing snow":
    case "snow showers":
    case "snow blowing snow mist":
      $("body").css({"background":"url("+backgrounds.snow+") no-repeat center fixed","background-size": "cover"});
      $("#box-holder").css({"color":"#001e2e","background":"rgba(255,255,255,0.7)"});
      $(".content-circles").css({"border-bottom":"5px solid #e28200"});
      $(".unit-switch").css({"background":"white"});
    break;
    
   //HAIL
    case "ice crystals":
	  case "ice pellets":
	  case "hail":
	  case "ice pellet showers":
	  case "hail showers":
	  case "small hail showers":
	  case "freezing drizzle":
	  case "freezing rain":
	  case "freezing fog":
	  case "small hail":
      $("body").css({"background":"url("+backgrounds.hail+") no-repeat center fixed","background-size": "cover"});
      $("#box-holder").css({"background":"rgba(26,28,37,0.8)","color":"#dcd1c4"});
      $(".content-circles").css({"border-bottom":"5px solid #73a09e"});
      $(".unit-switch").css({"background":"rgb(26,28,37)"});
    break;
    
   //CLEAR SKY
    case "clear":
      $("body").css({"background":"url("+backgrounds.clear+") no-repeat center fixed","background-size":"cover"});
      $("#box-holder").css({"background":"rgba(51, 167, 97, 0.8)","color":"#a5d6c2"});
      $(".content-circles").css({"border-bottom":"5px solid #0b7147"})
      $(".unit-switch").css({"background":"rgb(51, 167, 97)"});
    break;
    
  //CLOUDY
    case "partly cloudy":
	  case "mostly cloudy":
	  case "scattered clouds":
	  case "funnel cloud":
	  case "squalls":
	  case "overcast":
      $("body").css({"background":"url("+backgrounds.cloudy+") no-repeat center fixed","background-size":"cover"});
      $("#box-holder").css({"background":"rgba(59, 64, 74, 0.6)","color":"#bfcef1"});
      $(".content-circles").css({"border-bottom":"5px solid #346886"});
      $(".unit-switch").css({"background":"rgba(68,96,107,0.6)"});
    break;
    
  //THUNDERSTORMS
    case "thunderstorm":
	  case "thunderstorms and rain":
	  case "thunderstorms and snow":
	  case "thunderstorms and ice pellets":
	  case "thunderstorms with hail":
	  case "thunderstorms with small hail":
       $("body").css({"background":"url("+backgrounds.thunderstorm+") no-repeat center fixed","background-size": "cover"});
       $("#box-holder").css({"background":"rgba(68,96,107,0.3)","color":"#92afaa"});
       $(".content-circles").css({"border-bottom":"5px solid #8db3a4"})
       $(".unit-switch").css({"background":"rgba(68,96,107,0.6)"});
    break;
    
  //RAINING
    case "drizzle":
	  case "rain":
	  case "rain showers":
	  case "spray":
	  case "rain mist":
      $("body").css({"background":"url("+backgrounds.rain+") no-repeat center fixed","background-size": "cover"});
      $("#box-holder").css({"background":"rgba(0,0,0,0.8)","color":"white"});
      $(".content-circles").css({"border-bottom":"5px solid white"});
      $(".unit-switch").css({"background":"rgba(0,0,0,0.7)"});
    break;
    
   //FOGGY
    case "mist":
	  case "fog":
	  case "fog patches":
	  case "smoke":
	  case "volcanic ash":
	  case "haze":
	  case "patches of fog":
	  case "shallow fog":
	  case "partial fog":
      $("body").css({"background":"url("+backgrounds.fog+") no-repeat center fixed","background-size": "cover"});
      $("#box-holder").css({"background":"rgba(43, 55, 62, 0.78)","color":"#aab0b3"});
      $(".content-circles").css({"border-bottom":"5px solid #aab0b3"});
      $(".unit-switch").css({"background":"rgba(43, 55, 62,0.9)"});
    break;
    
  //DUST or SANDSTORMS
    case "widespread dust":
	  case "sand":
	  case "dust whirls":
	  case "sandstorm":
	  case "low drifting widespread dust":
	  case "low drifting sand":
	  case "blowing widespread dust":
	  case "blowing sand":
      $("body").css({"background":"url("+backgrounds.dust+") no-repeat center fixed","background-size": "cover"});
      $("#box-holder").css({"background":"rgba(255,59,0,0.7)","color": "#b90707"});
      $(".content-circles").css({"border-bottom":"5px solid #b90707"})
      $(".unit-switch").css({"background":"rgba(255,59,0,0.9)"});
    break;
  }
}

function getWeather(lat,lon){
  var head = "https://api.wunderground.com/api/";
  var key = "38327c71324eaa8e";
  var con = "/conditions/q/";
  var query = lat+","+lon+".json";
  var url= head+key+con+query;
  
  
  $.getJSON(url,function(data){
    var info = data.current_observation;
    var degUnit = "°F";
    var tempC = Math.floor(info.temp_c);
    var tempF = Math.floor(info.temp_f);
    
    $("#temp").text(info.temp_f);
    $(".unit").text(degUnit);
    $("#weather").text(info.weather);
    $("#location").text(info.display_location.full);
    $("#icon").attr("src", info.icon_url);
    $("#hitbox").on("click",function(){
      switch(degUnit){
          case "°F":
            degUnit = "°C";
            $(".unit").text(degUnit);
            $("#temp").text(tempC);
          break;
          case "°C":
            degUnit = "°F";
            $(".unit").text(degUnit);
            $("#temp").text(tempF);
          break;
      }
    });
    setWeatherBG(info.weather);
  });
}

function getCoords(){
  if(navigator.geolocation){   navigator.geolocation.getCurrentPosition(function(position){
        var lati = position.coords.latitude;
        var long = position.coords.longitude;
        getWeather(lati,long);
      });
  }
  else{
    alert("Geolocation is not supported by browser");
  }
}

$(document).ready(function(){
  getCoords();
  unitViewer();
});