import { SVG_NS, KEYS } from "../settings";

import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Score from "./Score";
import Winner from "./Winner";


export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(element);
    this.ball1 = new Ball(12, this.width, this.height); //changed 8-12 for size of the ball
    this.ball2 = new Ball(8, this.width, this.height);

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;


    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    this.winner = new Winner(20, 120, 50); //testing 

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
      this.width - this.paddleWidth - this.boardGap, 
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

  champion(svg, player) {
    this.winner.render(svg, `${player} Wins!`);
    this.pause = true;
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

    this.ball1.render(svg, this.player1, this.player2);
    this.ball2.render(svg, this.player1, this.player2);

    this.score1.render(svg, this.player1.score)
    this.score2.render(svg, this.player2.score)
    this.winner.render(svg);

    if (this.player1.score === 5) {   //testing if declaring a winner works
      this.champion(svg, 'Player 1')
    } else if (this.player2.score === 5) {
      this.champion(svg, 'Player 2')
    }

  }
}
