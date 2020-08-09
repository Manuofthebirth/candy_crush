import {squares, width, candyColors} from './game.js';
const grid = document.querySelector('.game-grid');

// create Board 
export function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('square');
    square.setAttribute('draggable', true);
    square.setAttribute('id', i); // each square gets an unique id from 0 to 63
    let randomCandy = Math.floor(Math.random() * candyColors.length);
    square.style.backgroundImage = candyColors[randomCandy]
    grid.appendChild(square);
    squares.push(square);
  }
}