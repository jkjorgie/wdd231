import { updateAndLoadPageVisitCount, hamburgerSetup, setLastUpdateTimeStamp } from "./modules.js";

let urlParams = window.location.href.split('?')[1].split('&');

function show(dataElement) {
    let result = "";
    let temp = "";
    urlParams.forEach((element) => {
        if (element.startsWith(dataElement)) {
            temp = element.split('=')[1].replace("%40", "@");
            temp = temp.split("%3A").join(":");
            temp = temp.split("+").join(" ");
            temp = temp.split("%2F").join("/");
            if (result !== '') {
                result += ', ';
            }
            result += temp;
        }
    })
    return (result);
}

const formData = document.querySelector('.form-data');

formData.innerHTML = `
<p><strong>Name:</strong> ${show('name')}</p>
<p><strong>Email:</strong> ${show('email')}</p>
<p><strong>Preferences:</strong> ${show('preferences')}</p>
`;

updateAndLoadPageVisitCount();
hamburgerSetup();
setLastUpdateTimeStamp();