async function generateBusinessCards() {

    // console.log('generating business cards');

    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error('Could not fetch business directory data');
        }

        const members = await response.json();

        // console.log(members);

        const businessesDiv = document.querySelector('.businesses');
        businessesDiv.innerHTML = '';

        members.forEach(business => {
            const businessDiv = document.createElement('div');
            businessDiv.classList.add('business');

            //business header
            const businessHeader = document.createElement('div');
            businessHeader.classList.add('business-header');
            const h4 = document.createElement('h4');
            h4.textContent = business.name;
            businessHeader.appendChild(h4);
            const pTag = document.createAttribute('p');
            pTag.textContent = business.description;
            //businessHeader.appendChild(pTag);

            //business details
            const businessDetails = document.createElement('div');
            businessDetails.classList.add('business-details');
            const logo = document.createElement('img');
            logo.src = business.image;
            logo.alt = 'Logo';
            logo.width = 100;
            logo.height = 100;
            businessDetails.appendChild(logo);
            const contactInfo = document.createElement('div');
            contactInfo.classList.add('business-contact-info');
            // const nameP = document.createElement('p');
            // nameP.textContent = business.name;
            // contactInfo.appendChild(nameP);
            const addrP = document.createElement('p');
            addrP.textContent = business.address;
            contactInfo.appendChild(addrP);
            const phoneP = document.createElement('p');
            phoneP.textContent = business.phone;
            contactInfo.appendChild(phoneP);
            const link = document.createElement('a');
            link.classList.add('grid-link');
            link.href = business.website;
            link.textContent = business.website;
            link.target = '_blank';
            contactInfo.appendChild(link);
            businessDetails.appendChild(contactInfo);


            businessDiv.appendChild(businessHeader);
            businessDiv.appendChild(businessDetails);

            businessesDiv.appendChild(businessDiv);
        });

    } catch (error) {
        console.error("Encountered error during fetch:", error);
    }
}

async function generateBusinessTable() {
    // console.log('generating business cards');

    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error('Could not fetch business directory data');
        }

        const members = await response.json();

        // console.log(members);

        const tableBody = document.querySelector('#businesses-list-table-body');
        tableBody.innerHTML = '';

        members.forEach(business => {
            const row = document.createElement('tr');
            const tdName = document.createElement('td');
            tdName.classList.add('table-business-name');
            const tdAddr = document.createElement('td');
            const tdPhone = document.createElement('td');
            const tdWebsite = document.createElement('td');
            tdName.textContent = business.name;
            tdAddr.textContent = business.address;
            tdPhone.textContent = business.phone;
            //tdWebsite.textContent = business.website;
            const link = document.createElement('a');
            link.classList.add('table-link');
            link.href = business.website;
            link.textContent = business.website;
            link.target = '_blank';
            tdWebsite.appendChild(link);
            row.appendChild(tdName);
            row.appendChild(tdAddr);
            row.appendChild(tdPhone);
            row.appendChild(tdWebsite);

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Encountered error during fetch:", error);
    }
}

//view control event listeners
const gridViewBtn = document.querySelector('#grid-view-button');
const listViewBtn = document.querySelector('#list-view-button');
gridViewBtn.addEventListener('click', function () {
    gridViewBtn.classList.add('active-view');
    listViewBtn.classList.remove('active-view');

    const grid = document.querySelector('#businesses-grid');
    grid.classList.remove('hide');
    grid.classList.add('businesses');

    const list = document.querySelector('#businesses-list');
    list.classList.add('hide');
    
});

listViewBtn.addEventListener('click', function () {
    listViewBtn.classList.add('active-view');
    gridViewBtn.classList.remove('active-view');
    
    const grid = document.querySelector('#businesses-grid');
    grid.classList.add('hide');
    grid.classList.remove('businesses');

    const list = document.querySelector('#businesses-list');
    list.classList.remove('hide');
});

generateBusinessCards();
generateBusinessTable();