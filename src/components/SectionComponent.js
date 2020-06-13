import contentBuilders from "../modules/contentBuilders";
import PageComponent from "./PageComponent";

export default class SectionComponent {
    /**
     * @param {RequestInfo} url
     */
    constructor(url) {
        this.url = url;
        this.placeholder = document.createElement('div');
        this.placeholder.innerHTML = contentBuilders().getPlaceholder();
        this.fetchData();
        return this.placeholder;
    }

    fetchData() {
        fetch(this.url)
        .then(response => response.json())
        .then(data => this.buildSection(data)); 
    }

    /**
     * @param {{ name: any; residents: any; }} [data]
     * @returns {Node}
     */
    buildSection(data) {
        const planetSection = contentBuilders().getPlanetSection(data);
        planetSection.addEventListener('click', function(e) {
            const elem = e.target;
            if(elem.classList.contains('js-resident')) {
                const url = elem.getAttribute('data-url');
                const page = new PageComponent(url);
            }
        });
        this.placeholder.innerHTML = '';
        this.placeholder.appendChild(planetSection);
    }
}