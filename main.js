const apiKey = "9f687548cb5aaec771559bed1f89bd4b";
const error404 = document.querySelector(".not-found");
const searchBtn = document.querySelector(".search-box button");
const weatherDetails = document.querySelector(".weather-details");
const weatherBox = document.querySelector(".weather-box");
const body = document.getElementById("body");

searchBtn.addEventListener("click", async () => {
  try {
    const city = document.querySelector(".search-box input").value;
    const temperature = document.querySelector(".weather-box .temperature");

    const req = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await req.json();

    if (!city) throw new Error("No city specified");

    if (data.cod === "404") {
      body.style.backgroundColor = "red";
      weatherDetails.style.display = "none";
      weatherBox.style.display = "none";
      error404.style.display = "block";
      error404.classList.add("fade-in");
      return;
    }

    error404.style.display = "none";
    error404.classList.remove("fade-in");

    const img = document.querySelector(".weather-box img");

    if (data.weather[0].main === "Clouds") {
      img.src = "/cloud.png";
      body.style.backgroundImage = `url("/cloudbg.jpg")`;
    }

    if (data.weather[0].main === "Rain") {
      img.src = "/rain.png";
      body.style.backgroundImage = `url("/rainbg.jpg")`;
    }

    if (data.weather[0].main === "Clear") {
      img.src = "/clear.png";
      body.style.backgroundImage = `url("/clearbg.jpg")`;
    }

    if (data.weather[0].main === "Haze") {
      img.src = "/mist.png";
      body.style.backgroundImage = `url("/mistbg.jpg")`;
    }

    if (data.weather[0].main === "Snow") {
      img.src = "/snow.png";
      body.style.backgroundImage = `url("/snowbg.jpg")`;
    }

    const kelvin = parseInt(data.main.temp);
    const celsius = kelvin - 273.15;

    temperature.innerHTML = `${celsius.toFixed(1)} <span>°C</span>`;
    weatherBox.style.display = "block";
    weatherBox.classList.add("fade-in");

    const description = document.querySelector(".weather-box .description");
    description.textContent = data.weather[0].description;

    description.style.textTransform = "capitalize";

    document.querySelector(
      ".weather-details .humidity .text span"
    ).textContent = ` ${data.main.humidity}%`;

    document.querySelector(
      ".weather-details .wind .text span"
    ).textContent = `${data.wind.speed} km/h`;

    weatherDetails.style.display = "flex";
    weatherDetails.classList.add("fade-in");
  } catch (err) {
    alert(err.message);
  }
});
