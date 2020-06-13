import './style.scss';
import ListComponent from './components/ListComponent';

const starWarsCatalog = new ListComponent();
// const starWarsCatalog = new ListComponent('https://swapi.dev/api/people/?search=r2');
document.getElementById('main-content').appendChild(starWarsCatalog.placeholder);
starWarsCatalog.fetchData('https://swapi.dev/api/people/?page=1');

