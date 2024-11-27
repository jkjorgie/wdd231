let urlParams = window.location.href.split('?')[1].split('&');

console.log(urlParams);

function show(dataElement) {
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
<p><strong>Name:</strong> ${show('firstName')} ${show('lastName')}</p>
<p><strong>Organization Title:</strong> ${show('organizationTitle')}</p>
<p><strong>Email:</strong> ${show('email')}</p>
<p><strong>Phone:</strong> ${show('phone')}</p>
<p><strong>Organization:</strong> ${show('organizationName')}</p>
<p><strong>Description:</strong> ${show('organizationDescription')}</p>
<p><strong>Time Stamp:</strong> ${show('timestamp')}</p>
`;