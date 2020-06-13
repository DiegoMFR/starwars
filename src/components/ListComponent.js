import PageComponent from "./PageComponent";
import contentBuilders from "../modules/contentBuilders";

export default class ListComponent {

    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        const list = await fetch(this.url)
            .then(response => response.json())
            .then(data => this.populate(data));
        return list
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
                const page = new PageComponent(url);
                document.body.appendChild(page);
            }
        });
        return characterList;
    }
}