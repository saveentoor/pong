import { SVG_NS } from "../settings";

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.reset();
    }
    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;

        this.vy = 0;

        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * - 5);
        }
        //BALL MOVEMENT 
        this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    wallCollision(player1, player2) {
        const hitLeft = this.x - this.r <= 0;
        const hitRight = this.x + this.r >= this.boardWidth;
        const hitTop = this.y - this.r <= 0;
        const hitBottom = this.y + this.r >= this.boardHeight;

        if (hitLeft) {
            this.direction = - 1;
            this.goal(player2)
        } else if (hitRight) {
            this.direction = 1;
            this.goal(player1)

        } else if (hitTop || hitBottom) {
            this.vy = -this.vy;
        }
    }

    render(svg, player1, player2) {

        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision(player1, player2);
        this.paddleCollision(player1, player2);

        let circle = document.createElementNS(SVG_NS, 'circle');
        ball.setAttributeNS(null, 'r', this.r);
        ball.setAttributeNS(null, 'fill', 'white');
        ball.setAttributeNS(null, 'cx', this.x);
        ball.setAttributeNS(null, 'cy', this.y);

        svg.appendChild(ball);

    }
}
