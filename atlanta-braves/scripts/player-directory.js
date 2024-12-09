import { updateAndLoadPageVisitCount, hamburgerSetup, setLastUpdateTimeStamp } from "./modules.js";

let players = '';

async function loadPlayersFromJson() {
    try {
        const response = await fetch('./data/players.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        players = await response.json();
        displayPlayers("any");
        //console.log(players);
    } catch (error) {
        console.error('Error loading players.json:', error);
    }
}

function displayPlayers(filter) {
    try {
        //console.log(players);
        const playerSearchDiv = document.querySelector('.player-search');
        playerSearchDiv.innerHTML = '';

        let filteredPlayers = players;

        if (filter !== "any") {
            filteredPlayers = players.filter(player => player.position.toUpperCase() === filter.toUpperCase());
        }

        filteredPlayers.forEach(player => {

            //card
            const playerCard = document.createElement('div');
            playerCard.classList.add('card');
            playerCard.classList.add('player');

            //name
            const h3 = document.createElement('h3');
            h3.classList.add('player-name');
            h3.textContent = player.name;
            playerCard.appendChild(h3);

            //image
            const img = document.createElement('img');
            img.src = player.headshot;
            img.alt = player.name;
            img.width = '250';
            img.height = player.image_height;
            img.loading = 'lazy';
            playerCard.appendChild(img);

            //player details
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('player-details');
            const h4Pos = document.createElement('h4');
            h4Pos.textContent = player.position;
            detailsDiv.appendChild(h4Pos);
            const pYears = document.createElement('p');
            pYears.textContent = player.years;
            detailsDiv.appendChild(pYears);
            playerCard.appendChild(detailsDiv);

            //player stats
            const statsDiv = document.createElement('div');
            statsDiv.classList.add('player-stats');
            const h4Stats = document.createElement('h4');
            h4Stats.textContent = 'Stats';
            statsDiv.appendChild(h4Stats);
            const ul = document.createElement('ul');
            for (let stat in player.notable_stats) {
                const li = document.createElement('li');
                li.textContent = `${beautifyJsonProp(stat)}: ${player.notable_stats[stat]}`;
                ul.appendChild(li);
            }
            statsDiv.appendChild(ul);
            playerCard.appendChild(statsDiv);

            playerSearchDiv.appendChild(playerCard);
        });
    } catch (error) {
        console.log('players json is probably not ready yet');
        console.error('Error displaying players:', error);
    }
}

function beautifyJsonProp(property) {

    if (property === 'RBI') {
        property = 'RBIs';
    }

    return property.replace(/_/g, ' ').replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });

}

loadPlayersFromJson();

const positionSelect = document.querySelector('#position-search');
positionSelect.addEventListener('change', function () {
    // console.log(positionSelect.value);
    displayPlayers(positionSelect.value);
});

updateAndLoadPageVisitCount();
hamburgerSetup();
setLastUpdateTimeStamp();