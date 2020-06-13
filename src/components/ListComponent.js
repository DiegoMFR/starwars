import PageComponent from "./PageComponent";
import contentBuilders from "../modules/contentBuilders";

export default class ListComponent {

    constructor() {
        this.placeholder = contentBuilders().getPlaceholder();
    }

    fetchData(url) {
       fetch(url)
        .then(response => response.json())
        .then(data => this.populate(data));
    }


    /**
     * @param {{ results: any; }} data
     */
    populate(data) {
        const characterList = contentBuilders().getCharacterList(data);

        characterList.addEventListener('click', function(e) {
            const elem = e.target;
            if(elem.classList.contains('js-list-item')) {
                const url = elem.getAttribute('data-url');
                const characterPage = new PageComponent();
                document.body.appendChild(characterPage.placeholder);
                characterPage.fetchData(url);
            }
        });
        this.placeholder.innerHTML = '';
        this.placeholder.appendChild(characterList);
    }
}