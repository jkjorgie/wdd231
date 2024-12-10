import { updateAndLoadPageVisitCount, hamburgerSetup, setLastUpdateTimeStamp } from "./modules.js";

let urlParams = window.location.href.split('?')[1].split('&');

console.log(urlParams);

function show(dataElement) {
    console.log(dataElement);
    let result = "";
    urlParams.forEach((element) => {
        if (element.startsWith(dataElement)) {
            result=element.split('=')[1].replace("%40", "@");
            result=result.split("%3A").join(":");
            result=result.split("+").join(" ");
            result=result.split("%2F").join("/");
        }
    })
    return(result);
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