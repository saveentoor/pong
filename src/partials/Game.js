import { SVG_NS, KEYS } from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(element);
    this.ball = new Ball(8, this.width, this.height)

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;


    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap, //x position
      (this.height - this.paddleHeight) / 2,   //y position 
      KEYS.a,
      KEYS.z

    )

    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.paddleWidth - this.boardGap, //x 
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down
    )

    this.board = new Board(this.width, this.height);
    document.addEventListener('keytdown', event => {
      if (event.key === KEYS.spaceBar) {
        this.pause = !this.pause;

      }

    })

  }

  render() {
    //pause game
    if (this.pause) {
      return;
    }


    //empty out game elemment before re-rendering
    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    svg.setAttributeNS(null, "version", "1.1");
    this.gameElement.appendChild(svg);

    //here we will render all game elemtns inside the SVG
    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg);
  }
}
