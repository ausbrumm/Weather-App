const container = document.querySelector(".container");
const search = document.getElementById("search-button");
const getLocation = document.getElementById("get-location");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const degreeToggle = document.querySelector(".switch input");

search.addEventListener("click", () => {
  const APIKey = "aad696b7b2e7309324925ef841ee970f";
  const input = document.querySelector(".search-box input").value.split(",");
  const city = input[0];
  const state = input[1];
  const country = input[2];
  const isFarenheight = degreeToggle.checked;
  const units = isFarenheight ? "imperial" : "metric";
  const degreeSymbol = isFarenheight ? "&degF" : "&degC";
  const windSymbol = isFarenheight ? "Mi/h" : "Km/h";
  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}, ${state}, ${country}&units=${units}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.code === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const windSpeed = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "/images/clear.png";
          break;
        case "Rain":
          image.src = "/images/rain.png";
          break;
        case "Haze":
          image.src = "/images/mist.png";
          break;
        case "Snow":
          image.src = "/images/snow.png";
          break;
        case "Clouds":
          image.src = "/images/cloud.png";
          break;
      }

      temperature.innerHTML = `${parseInt(
        json.main.temp
      )}<span>${degreeSymbol}</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      windSpeed.innerHTML = `${parseInt(json.wind.speed)} ${windSymbol}`;
      console.log(json.coord);

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});

getLocation.addEventListener("click", () => {
  const successCallback = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const APIKey = "aad696b7b2e7309324925ef841ee970f";
    const isFarenheight = degreeToggle.checked;
    const units = isFarenheight ? "imperial" : "metric";
    const degreeSymbol = isFarenheight ? "&degF" : "&degC";
    const windSymbol = isFarenheight ? "Mi/h" : "Km/h";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.code === "404") {
          container.style.height = "400px";
          weatherBox.style.display = "none";
          weatherDetails.style.display = "none";
          error404.display = "block";
          error404.classList.add("fadeIn");
          return;
        }

        error404.style.display = "none";
        error404.classList.remove("fadeIn");

        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(
          ".weather-details .humidity span"
        );
        const windSpeed = document.querySelector(".weather-details .wind span");
        const input = document.querySelector(".search-box input");
        switch (json.weather[0].main) {
          case "Clear":
            image.src = "/images/clear.png";
            break;
          case "Rain":
            image.src = "/images/rain.png";
            break;
          case "Haze":
            image.src = "/images/mist.png";
            break;
          case "Snow":
            image.src = "/images/snow.png";
            break;
          case "Clouds":
            image.src = "/images/cloud.png";
            break;
        }

        temperature.innerHTML = `${parseInt(
          json.main.temp
        )}<span>${degreeSymbol}</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        windSpeed.innerHTML = `${parseInt(json.wind.speed)} ${windSymbol}`;
        input.value = `${json.name}`;
        console.log(json.coord);
        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "590px";
      });
  };

  const errorCallback = (error) => {
    console.log(error);
    return [];
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
});
