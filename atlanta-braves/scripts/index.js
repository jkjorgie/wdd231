const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
// const weatherDescr = document.querySelector('#weather-descr');
const tempMax = document.querySelector('#temp-max');
const tempMin = document.querySelector('#temp-min');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=33.89&lon=-84.47&appid=06e0d5bdf05091672310105b7f6d0e02&units=imperial';
//const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.38&lon=-111.80&appid=06e0d5bdf05091672310105b7f6d0e02&units=imperial';

async function apiFetch() {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            displayResults(data);
            //console.log(data);
        } else {
            throw new Error(`API response error: ${response.text()}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Optionally rethrow the error to handle it further up the call chain
    }
}

async function forecastApiFetch() {
    try {
        let response = await fetch(forecastUrl);
        if (response.ok) {
            let data = await response.json();
            displayForecast(data);
            //console.log(data);
        } else {
            throw new Error(`API response error: ${response.text()}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Optionally rethrow the error to handle it further up the call chain
    }
}

function convertUnixToHHMM(unixTime) {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let mornOrAft = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 hour to 12 for AM/PM format
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${mornOrAft}`;
}

function displayResults(data) {
    currentTemp.textContent = data.main.temp;
    // weatherDescr.textContent = data.weather[0].description;
    tempMax.textContent = data.main.temp_max;
    tempMin.textContent = data.main.temp_min;
    humidity.textContent = data.main.humidity;
    sunrise.textContent = convertUnixToHHMM(data.sys.sunrise);
    sunset.textContent = convertUnixToHHMM(data.sys.sunset);
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('alt', data.weather[0].description);
    weatherIcon.setAttribute('src', iconsrc);
}

apiFetch();
//forecastApiFetch();