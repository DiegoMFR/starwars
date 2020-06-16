import PageComponent from "./PageComponent";
import contentBuilders from "../modules/contentBuilders";

export default class ListComponent {

    constructor() {
        this.placeholder = contentBuilders().getPlaceholder();
    }

    /**
     * @param {string} url
     */
    fetchData(url) {
        // cors disabled just for this test
        fetch(url).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch list');
            }
        })
        .then((responseJson) => { this.buildPage(responseJson) })
        .catch((error) => {
            this.placeholder.innerHTML = contentBuilders().getErrorMessage(error);
        });
    }


    /**
     * @param {{ results: any; }} data
     */
    buildPage(data) {
        const characterList = contentBuilders().getCharacterList(data);

        characterList.addEventListener('click', function (e) {
            const elem = e.target;
            if (elem.classList.contains('js-list-item')) {
                const url = elem.getAttribute('data-url');
                const characterPage = new PageComponent();
                document.body.appendChild(characterPage.placeholder);
                characterPage.fetchData(url);
            }
        });
        this.placeholder.innerHTML = '';
        this.placeholder.appendChild(characterList);
    }

    sortList(sortFunction) {
        const nodeList = this.placeholder.getElementsByClassName('main-list--item');
        const nameList = [...nodeList].map(a => a.innerText);
        nameList.sort(sortFunction);
        nameList.forEach((element, index) => {
            for (const node of nodeList) {
                if (node.innerText === element) {
                    node.setAttribute('style', `--index: ${(index + 1)};`);
                }
            };
        });
    }
}