import SectionComponent from "./SectionComponent";
import contentBuilders from "../modules/contentBuilders";

export default class PageComponent {
    
    /**
     * @param {RequestInfo} url
     */
    constructor(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => this.buildPage(data));
    }

    buildPage(data) {
        const page = contentBuilders().getCharacterPage(data);
        document.body.appendChild(page);
        document.body.addEventListener('click', function closeListener (e) {
            const elem = e.target;
            if(elem.classList.contains('js-close-modal')) {
                document.body.removeEventListener('click', closeListener);
                document.body.removeChild(page);
            }
        });
        const worldSection = new SectionComponent(data.homeworld);
        worldSection.fetchData().then(
            (result) => {
                const worldContainer = document.getElementById('world-section');
                worldContainer.textContent = '';
                worldContainer.appendChild(result);
            }
        );
    }    
}