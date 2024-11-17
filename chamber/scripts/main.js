const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDescr = document.querySelector('#weather-descr');
const tempMax = document.querySelector('#temp-max');
const tempMin = document.querySelector('#temp-min');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const forecastToday = document.querySelector('#forecast-today');
const forecastTomorrow = document.querySelector('#forecast-tomorrow');
const forecastNextDay = document.querySelector('#forecast-next-day');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=40.38&lon=-111.80&appid=06e0d5bdf05091672310105b7f6d0e02&units=imperial';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.38&lon=-111.80&appid=06e0d5bdf05091672310105b7f6d0e02&units=imperial';

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
    weatherDescr.textContent = data.weather[0].description;
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

function displayForecast(data) {
    //assuming [0] is today, [1] is tomorrow, and [2] is the next day
    forecastToday.textContent = data.list[0].main.temp_max;
    forecastTomorrow.textContent = data.list[1].main.temp_max;
    forecastNextDay.textContent = data.list[2].main.temp_max;
}

async function getBusinessData() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error('Could not fetch business directory data');
        }

        const members = await response.json();

        const goldAndSilvers = members.filter(business => business.membership_level === 'gold' || business.membership_level === 'silver');
        goldAndSilvers.sort(() => Math.random() - 0.5);
        const random3 = goldAndSilvers.slice(0, 3);
        const businessElements = document.querySelectorAll('.business');
        businessElements.forEach((element, index) => {

            let featuredBusiness = goldAndSilvers[index];

            console.log(featuredBusiness);

            let busHdr = document.createElement('div');
            busHdr.classList.add('business-header');
            let h4 = document.createElement('h4');
            h4.textContent = featuredBusiness.name;
            let p = document.createElement('p');
            p.textContent = featuredBusiness.description;
            busHdr.appendChild(h4);
            busHdr.appendChild(p);

            let busDtls = document.createElement('div');
            busDtls.classList.add('business-details');
            let img = document.createElement('img');
            img.src = 'images/logo-100x100.webp';
            img.alt = featuredBusiness.name;
            img.width = '98';
            img.height = '100';
            busDtls.appendChild(img);
            let busContact = document.createElement('div');
            busContact.classList.add('business-contact-info');

            //url
            p = document.createElement('p');
            // p.innerHTML = `<b>URL:</b> ${featuredBusiness.website}`;
            p.innerHTML = `<a href=${featuredBusiness.website} class='grid-link' target='_blank'>Website</a>`;
            busContact.appendChild(p);
            //phone
            p = document.createElement('p');
            // p.innerHTML = `<b>PHONE:</b> ${featuredBusiness.phone}`;
            p.innerHTML = `${featuredBusiness.phone}`;
            busContact.appendChild(p);
            //address
            p = document.createElement('p');
            // p.innerHTML = `<b>Address:</b> ${featuredBusiness.address}`;
            p.innerHTML = `${featuredBusiness.address}`;
            busContact.appendChild(p);
            //membership level
            p = document.createElement('p');
            // p.innerHTML = `<b>Membership:</b> ${featuredBusiness.membership_level}`;
            p.innerHTML = `<b>Membership:</b> ${featuredBusiness.membership_level}`;
            busContact.appendChild(p);
            busDtls.appendChild(busContact);

            element.appendChild(busHdr);
            element.appendChild(busDtls);
        });

    } catch (error) {
        console.error("Encountered error during fetch:", error);
    }
}

getBusinessData();

apiFetch();
forecastApiFetch();