document.addEventListener('DOMContentLoaded', () =>{
  const grid = document.querySelector('.game-grid');
  const scoreDisplay = document.getElementById('score');
  const movesDisplay = document.getElementById('moves');
  const startBtn = document.querySelector('.start-btn');
  const timerDisplay = document.getElementById('timer');
  const width = 8;
  const squares = [];
  let score = 0;
  let moves = 0;

  const candyColors = [
    'url(img/red.png)',
    'url(img/yellow.png)',
    'url(img/orange.png)',
    'url(img/purple.png)',
    'url(img/green.png)',
    'url(img/blue.png)'
  ]

  // create Board 
  function createBoard() {
    for (let i = 0; i < width*width; i++) {
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
  createBoard()
  
  // countdown
  let timeLeft = 180;

  function countDown() {
    if (timeLeft <= 0) {
      clearInterval(timeLeft = 0)
      timerDisplay.innerHTML = 'Game Over';
    } else if (timer) {
      timeLeft -= 1;
      timerDisplay.innerHTML = new Date(timeLeft * 1000).toISOString().substr(14, 5); // converts seconds to mm:ss format
    }
  }
  
  // start/pause button
  let timer;

  startBtn.addEventListener('click', () => {
    // pause if timer not null
    if(timer) {
      clearInterval(timer);
      timer = null;
      startBtn.innerHTML = 'Resume';
    } else {
      clearInterval(timer);
      timer = setInterval(countDown, 1000);
      startBtn.innerHTML = 'Pause';
    }
  })

  // Drag the squares (pc) ; inbuilt drag events
  let candyBeingDragged
  let candyBeingReplaced
  let candyIdBeingDragged
  let candyIdBeingReplaced
  
  squares.forEach(square => square.addEventListener('dragstart', dragStart));
  squares.forEach(square => square.addEventListener('dragend', dragEnd));
  squares.forEach(square => square.addEventListener('dragover', dragOver));
  squares.forEach(square => square.addEventListener('dragenter', dragEnter));
  squares.forEach(square => square.addEventListener('dragleave', dragLeave));
  squares.forEach(square => square.addEventListener('drop', dragDrop));

  function dragStart() {
    if (timer) {
      candyBeingDragged = this.style.backgroundImage;
      candyIdBeingDragged = parseInt(this.id); // needs to be a number
      console.log(candyBeingDragged); // identify candy being dragged
      console.log(this.id, 'dragstart');
    }
  }

  function dragOver (event) {
    event.preventDefault();
    if (timer) {
      console.log(this.id, 'dragover');
    }
  }

  function dragEnter (event) {
    event.preventDefault();
    if (timer) {
      console.log(this.id, 'dragenter');
    }
  }

  function dragLeave () {
    if (timer) {
      console.log(this.id, 'dragleave');
    }
  }

  function dragEnd () {
    if (timer) {
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
        moves += 1;
        movesDisplay.innerHTML = moves;
      } else if (candyIdBeingReplaced && !allowedMove) {
        // remains the same
        squares[candyIdBeingReplaced].style.backgroundImage = candyBeingReplaced;
        squares[candyIdBeingDragged].style.backgroundImage = candyBeingDragged;
      } else squares[candyIdBeingDragged].style.backgroundImage = candyBeingDragged;
    }
  }
  
  function dragDrop () {
    if (timer) {
      console.log(this.id, 'dragdrop');
      candyBeingReplaced = this.style.backgroundImage;
      candyIdBeingReplaced = parseInt(this.id); // needs to be a number 
      this.style.backgroundImage = candyBeingDragged; // replace for dragged candy
      squares[candyIdBeingDragged].style.backgroundImage = candyBeingReplaced; // replace dragged candy
    }
  }

  // drops candies when some have been cleared
  function moveDown() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === '') {
        squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = '';
        // fill if first row is empty
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[i].style.backgroundImage === '') {
          let randomCandy = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomCandy];
        }
      }
    }
  }

  // Matching candies (up to 5)
  // row of three
  function checkRowForThree() {
    for (i = 0; i < 61; i++) { // can't check for #64 or #65; respect limit at #61
      let rowOfThree = [i, i+1, i+2];
      let decidedCandy = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';

      const notAllowed = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
      if(notAllowed.includes(i)) continue // skip ; validate only if same row

      if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedCandy && !isBlank)) {
        if (timer) {
          score += 3;
          scoreDisplay.innerHTML = score;
        }
        rowOfThree.forEach(index => {
          squares[index].style.backgroundImage = '';
        })
      }
    }
  }
  checkRowForThree()

  // column of three
  function checkColumnForThree() {
    for (i = 0; i < 47; i++) { // can't check for #64 or #65; respect limit at #47
      let columnOfThree = [i, i+width, i+width*2];
      let decidedCandy = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';

      if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedCandy && !isBlank)) {
        if (timer) {
          score += 3;
          scoreDisplay.innerHTML = score;
        }
        columnOfThree.forEach(index => {
          squares[index].style.backgroundImage = '';
        })
      }
    }
  }
  checkColumnForThree()

  // row of four
  function checkRowForFour() {
    for (i = 0; i < 60; i++) { // can't check for #65 or #66; respect limit at #60
      let rowOfFour = [i, i+1, i+2, i+3];
      let decidedCandy = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';

      const notAllowed = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
      if(notAllowed.includes(i)) continue // skip

      if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedCandy && !isBlank)) {
        if (timer) {
          score += 4;
          scoreDisplay.innerHTML = score;
        }
        rowOfFour.forEach(index => {
          squares[index].style.backgroundImage = '';
        })
      }
    }
  }
  checkRowForFour()

  // column of four
  function checkColumnForFour() {
    for (i = 0; i < 39; i++) { // can't check for #71 or #79; respect limit at #39
      let columnOfFour = [i, i+width, i+width*2, i+width*3];
      let decidedCandy = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';

      if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedCandy && !isBlank)) {
        if (timer) {
          score += 4;
          scoreDisplay.innerHTML = score;
        }
        columnOfFour.forEach(index => {
          squares[index].style.backgroundImage = '';
        })
      }
    }
  }
  checkColumnForFour()

  // row of five
  function checkRowForFive() {
    for (i = 0; i < 59; i++) { // can't check for #66 or #67; respect limit at #60
      let rowOfFive = [i, i+1, i+2, i+3, i+4];
      let decidedCandy = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';

      const notAllowed = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]
      if(notAllowed.includes(i)) continue // skip

      if (rowOfFive.every(index => squares[index].style.backgroundImage === decidedCandy && !isBlank)) {
        if (timer) {
          score += 5;
          scoreDisplay.innerHTML = score;
        }
        rowOfFive.forEach(index => {
          squares[index].style.backgroundImage = '';
        })
      }
    }
  }
  checkRowForFive()

  // column of five
  function checkColumnForFive() {
    for (i = 0; i < 31; i++) { // can't check for #71 or #79; respect limit at #39
      let columnOfFive = [i, i+width, i+width*2, i+width*3, i+width*4];
      let decidedCandy = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';

      if (columnOfFive.every(index => squares[index].style.backgroundImage === decidedCandy && !isBlank)) {
        if (timer) {
          score += 5;
          scoreDisplay.innerHTML = score;
        }
        columnOfFive.forEach(index => {
          squares[index].style.backgroundImage = '';
        })
      }
    }
  }
  checkColumnForFive()

  // check for functions after each 100 miliseconds
  window.setInterval(function(){
    moveDown()
    checkRowForFive()
    checkColumnForFive()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
  }, 100)
})

