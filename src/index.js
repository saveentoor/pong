import './styles/game.css'; // this line we are importing css into javescript 
import Game from './partials/Game'; 

// create a game instance
const game = new Game('game', 512, 256);

(function gameLoop() {   //
  game.render(); 
  requestAnimationFrame(gameLoop); //fun that we get through browser api, that helps us loop at the same time the browser loads 
})();                             //also stops running that loop when the user isnt looking at it
