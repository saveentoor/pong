import { SVG_NS } from '../settings';

export default class Winner {

    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    render(svg, winner) {

        let results = document.createElementNS(SVG_NS, 'text');

        results.setAttributeNS(null, 'fill', 'red');
        results.setAttributeNS(null, 'x', this.x);
        results.setAttributeNS(null, 'y', this.y);
        results.setAttributeNS(null, 'font-size', this.size);
        results.setAttributeNS(null, 'font-family', 'Silkscreen Web');

        results.textContent = winner;
        svg.appendChild(results);
    }
}


