document.addEventListener('DOMContentLoaded', () =>{
  const grid = document.querySelector('.game-grid')
  const width = 8
  const squares = []

  // create Board 
  function createBoard() {
    for (let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.classList.add('square')
      grid.appendChild(square)
      squares.push(square)
    }
  }
  createBoard()
})

