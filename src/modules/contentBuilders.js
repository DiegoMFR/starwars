export default function contentBuilders () {
    
    /**
     * @param {{ results: any[]; }} data
     */
    const getCharacterList = function (data) {
        const characterList = document.createElement('ul');
        characterList.classList.add('main-list');
        data.results.forEach((dataEl, index) => {
            const characterItem = getCharacterItem(dataEl, index);
            characterList.appendChild(characterItem);
        });
        return characterList;
    }
    
    /**
     * @param {{ name: string; url: string; }} dataEl
     * @param {number} index
     */
    const getCharacterItem = function (dataEl, index) {
        const { name, url } = dataEl;
        const listItem = document.createElement('li');
        listItem.classList.add('main-list--item');
        listItem.setAttribute('style', `--index: ${(index + 1)};`);
        listItem.innerHTML = 
            `<button class="main-list--item--btn js-list-item" data-url="${getHttps(url)}">
                ${name}
            </button>`;
        return listItem;
    }

    const getCharacterPage = function(data) {
        const {
            name, height, mass, hair_color: hairColor, eye_color: eyeColor,
            birth_year: birthYear, gender,
        } = data;
        const page = document.createElement('section');
        page.classList.add('character-modal--page');
        page.innerHTML = 
            `<i class="close js-close-modal" name="close" role="button"> &#10005 </i>
            <h2>${name}</h2>
            <ul class="simple-list">
                <li> <span> Height: ${height} </span> </li>
                <li> <span> Mass: ${mass} </span> </li>
                <li> <span> Hair: ${hairColor} </span> </li>
                <li> <span> Eyes: ${eyeColor} </span> </li>
                <li> <span> Birthday: ${birthYear} </span> </li>
                <li> <span> Gender: ${gender} </span> </li>
            </ul>`;
        return page;
    }

    const getPlanetSection = function(data) {
        const {
            name, residents, rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod, diameter, climate, gravity,
            terrain, surface_water: surfaceWater, population
        } = data;
        const section = document.createElement('section');
        section.setAttribute('id', 'world-section');
        section.innerHTML = 
        `<div class="character-modal--page--section"> 
            <h3>Planet ${name}</h3>
            <ul class="simple-list">
                <li> <span> Rotation period: ${rotationPeriod} </span> </li>
                <li> <span> Orbital Period: ${orbitalPeriod} </span> </li>
                <li> <span> Diameter: ${diameter} </span> </li>
                <li> <span> Climate: ${climate} </span> </li>
                <li> <span> Gravity: ${gravity} </span> </li>
                <li> <span> Terrain: ${terrain} </span> </li>
                <li> <span> Surface water: ${surfaceWater} </span> </li>
                <li> <span> Population: ${population} </span> </li>
            </ul>
            <h4> Other residents: </h4>
            <ul class="button-list">
                ${getResidents(residents)}
            </ul>
        </div>`;

        return section;
    }

    const getResidents = function (residents) {
        let html = ''
        residents.forEach(resident => {
            html += 
            `<li> <button class="js-resident" data-url= ${getHttps(resident)}> ${resident} </button></li>`;
        })
        return html;
    }

    /**
     * @param {string} url
     */
    const getHttps = function (url) {
        return url.replace(/^http:\/\//i, 'https://');
    }

    const getPlaceholder = function () {
        const placeholder = document.createElement('div');
        placeholder.innerHTML = '<div class="loading-sign"> Loading... </div>';
        return placeholder;
    }

    const getErrorMessage = function (error) {
       return `<span class="error"> ${error} </span>`;
    }

    return {
        getCharacterList,
        getCharacterPage,
        getPlanetSection,
        getPlaceholder,
        getErrorMessage
    }
}