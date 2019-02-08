import { SVG_NS } from "../settings";

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;

        //set x and y coordinates at the cente 
        this.reset();
    }
    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;

        this.vy = 0;

        //ball movement 
        //generating a random # between -5 and 5
        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 - 5);
        }
        //setting a # between -5 and 5, bases on the vy
        this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    wallCollision(player1, player2) {
        const hitLeft = this.x - this.radius <= 0;
        const hitRight = this.x + this.radius >= this.boardWidth; //( to see if the outter ende of the ball is touching, add)
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= this.boardHeight;

        if (hitLeft || hitRight) {
            this.vx = -this.vx;
        } else if (hitTop || hitBottom) {
            this.vy = -this.vy
        }
    }


    render(svg) {
        //this.paddleCollision(player1, player2);
        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision();

        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x);  //x of the center point 
        circle.setAttributeNS(null, 'cy', this.y); // of of the center point 
        circle.setAttributeNS(null, 'fill', 'white');

        svg.appendChild(circle);
    }
}
