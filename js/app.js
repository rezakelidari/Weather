// https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=&units=meteric

const form = document.querySelector("form");
const query = document.querySelector("form .form-city");
const err = document.querySelector(".err");
const result = document.querySelector(".result");

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const appid = "4a672d842a9eb024a0c7a9d737429172";
const units = "metric";

localStorage.getItem("city") !== null
  ? ((query.value = localStorage.getItem("city")),
    search(localStorage.getItem("city")))
  : false;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  search(query.value);
});

async function search(index) {
  const url = `${baseUrl}?q=${index}&units=${units}&appid=${appid}`;

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let responseCode = data.cod;
      if (responseCode === "200" || responseCode === 200) {
        result.innerHTML = "";
        localStorage.setItem("city", data.name);
        showData(data);
      } else {
        err.innerHTML = data.message;
        err.classList.toggle("hidden");
        setTimeout(() => {
          err.classList.toggle("hidden");
        }, 2000);
      }
    });
}

function showData(data) {
  let containerTag = document.createElement("div");
  containerTag.classList.add("container");

  let cityNameTag = document.createElement("h1");
  cityNameTag.classList.add("city-name");
  cityNameTag.innerHTML = `${data.name} <span>${data.sys.country}</span>`;

  let weatherTag = document.createElement("div");
  weatherTag.classList.add("weather");
  weatherTag.innerHTML = `Clear <span class="temp">${Math.round(
    data.main.temp
  )} C°</span>`;

  let weatherDescTag = document.createElement("div");
  weatherDescTag.classList.add("weather-desc");

  let windTag = document.createElement("div");
  windTag.classList.add("wind");
  windTag.innerHTML = `Wind: ${data.wind.speed} <span>m/s</span> <span>(${data.wind.deg}°)</span>`;

  let visiblityTag = document.createElement("div");
  visiblityTag.classList.add("visiblity");
  visiblityTag.innerHTML = `Visibility: ${
    data.visibility / 1000
  } <span>km</span>`;

  let pressureTag = document.createElement("div");
  pressureTag.classList.add("pressure");
  pressureTag.innerHTML = `Pressure: ${data.main.pressure} <span>hPa</span>`;

  let sunriseTag = document.createElement("div");
  let sunriseTime = new Date(data.sys.sunrise * 1000);
  let sunriseHour =
    sunriseTime.getHours() < 10
      ? "0" + sunriseTime.getHours()
      : "" + sunriseTime.getHours();
  let sunriseMinute =
    sunriseTime.getMinutes() < 10
      ? "0" + sunriseTime.getMinutes()
      : "" + sunriseTime.getMinutes();
  let sunriseSecond =
    sunriseTime.getSeconds() < 10
      ? "0" + sunriseTime.getSeconds()
      : "" + sunriseTime.getSeconds();
  sunriseTag.classList.add("sunrise");
  sunriseTag.innerHTML = `Sunrise: ${sunriseHour} : ${sunriseMinute} : ${sunriseSecond}`;

  let sunsetTag = document.createElement("div");
  let sunsetTime = new Date(data.sys.sunset * 1000);
  let sunsetHour =
    sunsetTime.getHours() < 10
      ? "0" + sunsetTime.getHours()
      : "" + sunsetTime.getHours();
  let sunsetMinute =
    sunsetTime.getMinutes() < 10
      ? "0" + sunsetTime.getMinutes()
      : "" + sunsetTime.getMinutes();
  let sunsetSecond =
    sunsetTime.getSeconds() < 10
      ? "0" + sunsetTime.getSeconds()
      : "" + sunsetTime.getSeconds();
  sunsetTag.classList.add("sunset");
  sunsetTag.innerHTML = `Sunset: ${sunsetHour} : ${sunsetMinute} : ${sunsetSecond}`;

  let humidityTag = document.createElement("div");
  humidityTag.classList.add("humidity");
  humidityTag.innerHTML = `Humidity: ${data.main.humidity}%`;

  let rainTag = document.createElement("div");
  rainTag.classList.add("rain")
  rainTag.innerHTML = `Chance of rain: ${data.clouds.all}%`

  weatherDescTag.appendChild(windTag);
  weatherDescTag.appendChild(visiblityTag);
  weatherDescTag.appendChild(pressureTag);
  weatherDescTag.appendChild(sunriseTag);
  weatherDescTag.appendChild(sunsetTag);
  weatherDescTag.appendChild(humidityTag);
  weatherDescTag.appendChild(rainTag);

  containerTag.appendChild(cityNameTag);
  containerTag.appendChild(weatherTag);
  containerTag.appendChild(weatherDescTag);

  result.appendChild(containerTag);
}