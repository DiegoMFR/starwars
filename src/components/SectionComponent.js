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
        fetch(url, { mode: "no-cors" }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch planet');
            }
        })
        .then((responseJson) => { this.buildPage(responseJson) })
        .catch((error) => {
            console.log(error);
            this.placeholder.innerHTML = contentBuilders().getErrorMessage(error);
        });
    }

    /**
     * @param {{ name: any; residents: any; }} [data]
     */
    buildPage(data) {
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