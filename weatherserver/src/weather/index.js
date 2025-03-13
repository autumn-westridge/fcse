'use strict';

const errors = require('../errors');
/* Group: ___, ___
Project description:

*/

const seasons = {
  name: ["spring", "summer", "fall", "winter"],
  temp_mean: [50, 85, 50, 15],
  temp_diff: [40, 20, 40, 30]
}
const weather_list = ["sunny", "partially cloudy", "cloudy", "rain", "thunderstorm"];
const dir_list = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

exports.getWeather = (req, res, next) => {
  // Simulate weather conditions
  let weather = {};

  let season = Math.floor(Math.random() * 4);
  weather = getSeasonWeather(season);
  console.log(weather);

  res.status(200).json(weather);
};

function getSeasonWeather(season) {
  let weather = {};
  weather.season = seasons.name[season];

  // Doing this in multiple steps to make it more obvious.
  // Should result in a number that puts the MEAN in the middle, with it above the mean half the time and below the other half
  let new_diff = seasons.temp_diff[season] / 2; // half of the difference
  let diff = new_diff - (Math.random() * seasons.temp_diff[season]); // Randomize between 0 and the full diff, then subtract
  let temp = seasons.temp_mean[season] + diff;
  weather.temp = Number(temp.toFixed(2)); // don't judge me

  // get a random weather from the list
  let top_weather = weather_list[Math.floor(Math.random() * weather_list.length)];
  if (temp <= 32 && (top_weather === "rain" || top_weather === "thunderstorm")) {
    top_weather = "snow";
  }
  // it usually doesn't rain in the summer
  if (season === 1) {
    if (Math.random() < 0.8) { // 80% chance of excluding rain or thunderstorm
      top_weather = weather_list[Math.floor(Math.random() * (weather_list.length - 2))];
    }
  }
  weather.weather = top_weather;

  let rain;
  if (top_weather === "rain" || top_weather === "thunderstorm" || top_weather === "snow") {
    // if it's currently raining, there's at least a 50% chance of rain
    rain = 0.5 + (Math.random() / 2);
  }
  else if (season === 1) {
    // in summer, no more than a 20% chance
    rain = Math.random() / 5;
  }
  else {
    // otherwise, no more than a 50% chance
    rain = Math.random() / 2;
  }
  weather.rain = Number(rain.toFixed(2));

  // randomly between 0 and 15 knots
  let wind_spd = Math.floor(((Math.random()) * 20) / 5) * 5;
  weather.wind_spd = wind_spd;

  // 0: N, 1: NE ... 7: NW
  let wind_dir = dir_list[Math.floor(Math.random() * dir_list.length)];
  weather.wind_dir = wind_dir;

  return weather;
}

exports.buggyRoute = (req, res, next) => {
  // Simulate a custom error
  next(errors.newHttpError(400, 'bad request'));
};
