import './styles/style.scss';
import ListComponent from './components/ListComponent';
import Helpers from './modules/Helpers';

// Create List
const starWarsCatalog = new ListComponent();
document.getElementById('main-content').appendChild(starWarsCatalog.placeholder);
starWarsCatalog.fetchData('https://swapi.dev/api/people/?page=1');

// Search functionality
document.getElementById('search-input').addEventListener(
    'keyup', Helpers.debounce(
        (e) => {
            starWarsCatalog.fetchData(`https://swapi.dev/api/people/?search=${e.target.value}`) 
        }, 500
    )
);

// Sort descending
document.getElementById('sort-down').addEventListener('click', () => {
    starWarsCatalog.sortList();
});

// Sort ascending
document.getElementById('sort-up').addEventListener('click', () => {
    starWarsCatalog.sortList((a, b) => ((a > b) ? -1 : 1));
});

