import { updateAndLoadPageVisitCount, hamburgerSetup, setLastUpdateTimeStamp } from "./modules.js";

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const tempMax = document.querySelector('#temp-max');
const tempMin = document.querySelector('#temp-min');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=33.89&lon=-84.47&appid=06e0d5bdf05091672310105b7f6d0e02&units=imperial';

async function apiFetch() {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            displayResults(data);
        } else {
            throw new Error(`API response error: ${response.text()}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
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
    }
}

function convertUnixToHHMM(unixTime) {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let mornOrAft = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${mornOrAft}`;
}

function displayResults(data) {
    currentTemp.textContent = data.main.temp;
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

//modal
const modal = document.querySelector('#modal');
const article1OpenButton = document.querySelector('#article1');
const article3OpenButton = document.querySelector('#article3');
const modalCloseButton = modal.querySelector('.modal-close');

article1OpenButton.addEventListener('click', () => {
    const iframe = document.querySelector('.modal-iframe');
    iframe.src = 'https://www.si.com/mlb/yankees/news/max-fried-expected-to-sign-with-yankees-or-red-sox-per-insider-john9';
    if (window.innerWidth >= 650) {
        iframe.width = '600';
    } else {
        iframe.width = window.innerWidth - 50;
    }
    iframe.height = '400';
    iframe.title = 'Article';
    modal.showModal();
});

article3OpenButton.addEventListener('click', () => {
    const iframe = document.querySelector('.modal-iframe');
    iframe.src = 'https://www.si.com/mlb/braves/news/atlanta-braves-miss-out-on-premier-shortstop-01jehnwvjeyj';
    if (window.innerWidth >= 650) {
        iframe.width = '600';
    } else {
        iframe.width = window.innerWidth - 50;
    }
    iframe.height = '400';
    iframe.title = 'Article';
    modal.showModal();
});

modalCloseButton.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

apiFetch();
updateAndLoadPageVisitCount();
hamburgerSetup();
setLastUpdateTimeStamp();