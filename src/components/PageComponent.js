import SectionComponent from "./SectionComponent";
import contentBuilders from "../modules/contentBuilders";

export default class PageComponent {
    constructor() {
        this.placeholder = contentBuilders().getPlaceholder();
        this.placeholder.classList.add('character-modal', 'js-close-modal');
    }

    /**
     * @param {RequestInfo} url
     */
    fetchData(url) {
        fetch(url)
        .then(response => response.json())
        .then(data => this.buildPage(data));
    }

    /**
     * @param {{ homeworld: string; }} data
     */
    buildPage(data) {
        const worldSection = new SectionComponent(this);
        const characterPage = contentBuilders().getCharacterPage(data);
        characterPage.appendChild(worldSection.placeholder);
        worldSection.fetchData(data.homeworld.replace(/^http:\/\//i, 'https://'));
        this.placeholder.innerHTML = '';
        this.placeholder.appendChild(characterPage);

        /**
         * @param {Event} e
         */
        const closeListener = (e) => {
            const elem = e.target;
            if(elem.classList.contains('js-close-modal')) {
                characterPage.removeEventListener('click', closeListener);
                this.destroy();
            }
        }
        this.placeholder.addEventListener('click', closeListener);
    }

    destroy() {
        this.placeholder.remove();
    }
}