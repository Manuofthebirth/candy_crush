document.addEventListener('DOMContentLoaded', () =>{
  const grid = document.querySelector('.game-grid');
  const width = 8;
  const squares = [];

  const candyColors = [
    'red',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue'
  ]

  // create Board 
  function createBoard() {
    for (let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.classList.add('square');
      square.setAttribute('draggable', true);
      square.setAttribute('id', i); // each square gets an unique id from 0 to 63
      let randomCandy = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundColor = candyColors[randomCandy]
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard()

  // Drag the squares (pc) ; inbuilt drag events
  squares.forEach(square => square.addEventListener('dragstart', dragStart));
  squares.forEach(square => square.addEventListener('dragsend', dragEnd));
  squares.forEach(square => square.addEventListener('dragover', dragOver));
  squares.forEach(square => square.addEventListener('dragenter', dragEnter));
  squares.forEach(square => square.addEventListener('dragleave', dragLeave));
  squares.forEach(square => square.addEventListener('dragdrop', dragDrop));

  function dragStart() {
    console.log(this.id, 'dragstart')
  }

  function dragOver () {
    console.log(this.id, 'dragover')
  }

  function dragEnter () {
    console.log(this.id, 'dragenter')
  }

  function dragLeave () {
    console.log(this.id, 'dragleave')
  }

  function dragEnd () {
    console.log(this.id, 'dragend')
  }

  function dragDrop () {
    console.log(this.id, 'dragdrop')
  }


})

