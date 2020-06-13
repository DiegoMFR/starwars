import SectionComponent from "./SectionComponent";
import contentBuilders from "../modules/contentBuilders";

export default class PageComponent {
    
    /**
     * @param {RequestInfo} url
     */
    constructor(url) {
        this.placeholder = document.createElement('div');
        this.placeholder.classList.add('character-modal', 'js-close-modal');
        this.placeholder.innerHTML = contentBuilders().getPlaceholder();
        this.fetchData(url);
        return this.placeholder;
    }

    fetchData(url) {
        fetch(url)
        .then(response => response.json())
        .then(data => this.buildPage(data));
    }

    buildPage(data) {
        const worldSection = new SectionComponent(data.homeworld.replace(/^http:\/\//i, 'https://'));
        const characterPage = contentBuilders().getCharacterPage(data);
        characterPage.appendChild(worldSection);
        this.placeholder.innerHTML = '';
        this.placeholder.appendChild(characterPage);

        /**
         * @param {Event} e
         */
        const closeListener = (e) => {
            const elem = e.target;
            if(elem.classList.contains('js-close-modal')) {
                characterPage.removeEventListener('click', closeListener);
                this.placeholder.remove();
            }
        }
        this.placeholder.addEventListener('click', closeListener);
    }    
}