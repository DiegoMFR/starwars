import './style.scss';

function component() {
    fetch('https://swapi.dev/api/people/?page=1')
        .then(response => response.json())
        .then(data => populate(data));
}

function populate(data) {
    const container = document.createElement('section');
    const item = document.createElement('div');
    let html = '';
    for(const dataEl of data.results) {
        html += createItem(dataEl);
    }
   
    container.innerHTML = html;
    container.classList.add('main-container');
    document.body.appendChild(container);
}

function createItem(dataEl) {
    
        const {name, height, homeworld} = dataEl;
        return (
            `<div class = "main-container--item">
                <div class="main-container--item--content">
                    <p> Name: ${name} </p>
                    <p> height: ${height} </p>
                    <p> homeworld: ${homeworld} </p>
                </div>
            </div>`
        );
}
component();