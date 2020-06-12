import './style.scss';
import ListComponent from './components/ListComponent';

const starWarsCatalog = new ListComponent('https://swapi.dev/api/people/?page=1');
// const starWarsCatalog = new ListComponent('https://swapi.dev/api/people/?search=r2');
starWarsCatalog.fetchData().then(
    (result) => {
        const body = document.getElementById('main-content');
        body.innerHTML = '';
        body.appendChild(result);
    }
);
