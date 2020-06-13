import contentBuilders from "../modules/contentBuilders";
import PageComponent from "./PageComponent";

export default class SectionComponent {
    /**
     * @param {object} caller
     */
    constructor(caller) {
        this.placeholder = contentBuilders().getPlaceholder();
        this.caller = caller;
    }

    /**
     * @param {RequestInfo} url
     */
    fetchData(url) {
        fetch(url)
        .then(response => response.json())
        .then(data => this.buildSection(data)); 
    }

    /**
     * @param {{ name: any; residents: any; }} [data]
     */
    buildSection(data) {
        const planetSection = contentBuilders().getPlanetSection(data);
        planetSection.addEventListener('click', (e) => {
            const elem = e.target;
            if(elem.classList.contains('js-resident')) {
                const url = elem.getAttribute('data-url');
                const characterPage = new PageComponent();
                document.body.appendChild(characterPage.placeholder);
                characterPage.fetchData(url);
                this.caller.destroy();
            }
        });
        this.placeholder.innerHTML = '';
        this.placeholder.appendChild(planetSection);
    }
}