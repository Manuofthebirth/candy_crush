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
  let candyBeingDragged
  let candyBeingReplaced
  let candyIdBeingDragged
  let candyIdBeingReplaced

  squares.forEach(square => square.addEventListener('dragstart', dragStart));
  squares.forEach(square => square.addEventListener('dragsend', dragEnd));
  squares.forEach(square => square.addEventListener('dragover', dragOver));
  squares.forEach(square => square.addEventListener('dragenter', dragEnter));
  squares.forEach(square => square.addEventListener('dragleave', dragLeave));
  squares.forEach(square => square.addEventListener('drop', dragDrop));

  function dragStart() {
    candyBeingDragged = this.style.backgroundColor;
    candyIdBeingDragged = parseInt(this.id); // needs to be a number
    console.log(candyBeingDragged); // identify candy being dragged
    console.log(this.id, 'dragstart');
  }

  function dragOver (event) {
    event.preventDefault();
    console.log(this.id, 'dragover');
  }

  function dragEnter (event) {
    event.preventDefault();
    console.log(this.id, 'dragenter');
  }

  function dragLeave () {
    console.log(this.id, 'dragleave');
  }

  function dragEnd () {
    console.log(this.id, 'dragend');
    // Moves allowed
    let allowedMoves = [
      candyIdBeingDragged - 1, // left side
      candyIdBeingDragged - width, // below
      candyIdBeingDragged + 1, // above
      candyIdBeingDragged + width // above
    ] 
    let allowedMove = allowedMoves.includes(candyIdBeingReplaced);

    if (candyIdBeingReplaced && allowedMove) { // if it exists and is an allowed move
      candyIdBeingReplaced = null; // clear id value
    } else if (candyIdBeingReplaced && !allowedMove) {
      // remains the same
      squares[candyIdBeingReplaced].style.backgroundColor = candyBeingReplaced;
      squares[candyIdBeingDragged].style.backgroundColor = candyBeingDragged;
    } else squares[candyIdBeingDragged].style.backgroundColor = candyBeingDragged;
  }
  
  function dragDrop () {
    console.log(this.id, 'dragdrop');
    candyBeingReplaced = this.style.backgroundColor;
    candyIdBeingReplaced = parseInt(this.id); // needs to be a number 
    this.style.backgroundColor = candyBeingDragged; // replace for dragged candy
    squares[candyIdBeingDragged].style.backgroundColor = candyBeingReplaced; // replace dragged candy
  }


})

