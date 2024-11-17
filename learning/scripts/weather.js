const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.76&lon=6.64&appid=06e0d5bdf05091672310105b7f6d0e02&units=imperial';

async function apiFetch() {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            displayResults(data);
            console.log(data);
        } else {
            throw new Error(`API response error: ${response.text()}`);
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Optionally rethrow the error to handle it further up the call chain
    }
}

function displayResults(data) {
    currentTemp.textContent = data.main.temp;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('alt', data.weather[0].description);
    weatherIcon.setAttribute('src', iconsrc);
    captionDesc.textContent = `${desc}`;
}

apiFetch();

