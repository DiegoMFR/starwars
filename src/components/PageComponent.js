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
        // cors disabled just for this test
        fetch(url).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch character');
            }
        })
        .then((responseJson) => { this.buildPage(responseJson) })
        .catch((error) => {
            const page = document.createElement('section');
            page.classList.add('character-modal--page');
            page.innerHTML = contentBuilders().getErrorMessage(error);
            this.placeholder.innerHTML = '';
            this.placeholder.appendChild(page);
            this.addCloseListener();
        });
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
        this.addCloseListener();

    }

    addCloseListener() {
        /**
         * @param {Event} e
         */
        const closeListener = (e) => {
            const elem = e.target;
            if (elem.classList.contains('js-close-modal')) {
                this.placeholder.removeEventListener('click', closeListener);
                this.destroy();
            }
        }
        this.placeholder.addEventListener('click', closeListener);
    }

    destroy() {
        this.placeholder.remove();
    }
}