const cardArr = [
  {
    name: 'aries',
    img: './img/aries.png',
  },
  {
    name: 'bird',
    img: './img/bird.png',
  },
  {
    name: 'capricorn',
    img: './img/capricorn.png',
  },
  {
    name: 'crab',
    img: './img/crab.png',
  },
  {
    name: 'fish',
    img: './img/fish.png',
  },
  {
    name: 'horse',
    img: './img/horse.png',
  },
  {
    name: 'scorpio',
    img: './img/scorpio.png',
  },
  {
    name: 'taurus',
    img: './img/taurus.png',
  },
]
const copyCardArr = [...cardArr, ...cardArr]
// console.log(copyCardArr)

function shuffle(array) {
  let m = array.length,
    t,
    i

  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}
function resetGame() {
  firstCard = null
  secondCard = null
  score = 0
  attempt = 0
  countAttempt.textContent = 'Ходи: 0'
  countScore.textContent = 'Знайдено пар: 0 з 8'
  const existingModal = document.querySelector('.modal-background')
  if (existingModal) {
    existingModal.remove()
  }
  shuffle(copyCardArr)
  const refreshCard = document.querySelectorAll('.card')
  refreshCard.forEach((item, index) => {
    item.classList.remove('card-open')
    item.dataset.name = copyCardArr[index].name
    item.querySelector('.card__image').src = copyCardArr[index].img
  })
}
shuffle(copyCardArr)
let firstCard = null
let secondCard = null
let lockBoard = false
let score = 0
let attempt = 0

const scoreBoard = document.createElement('div')
scoreBoard.classList.add('scoreboard')

let countAttempt = document.createElement('p')
countAttempt.textContent = 'Ходи: 0'

let countScore = document.createElement('p')
countScore.textContent = 'Знайдено пар: 0 з 8'

scoreBoard.append(countAttempt)
scoreBoard.append(countScore)

document.body.append(scoreBoard)

const grid = document.createElement('div')
grid.classList.add('cards')
document.body.append(grid)

for (let i = 0; i < copyCardArr.length; i++) {
  const card = document.createElement('div')
  card.dataset.name = copyCardArr[i].name
  card.classList.add('card')
  card.addEventListener('click', () => {
    if (lockBoard) return
    if (card === firstCard) return
    if (card.classList.contains('card-open')) return
    card.classList.add('card-open')
    if (firstCard === null) {
      firstCard = card
      return
    }
    attempt++
    countAttempt.textContent = 'Ходи ' + attempt
    if (firstCard) secondCard = card
    //  console.log(firstCard, secondCard)
    if (firstCard.dataset.name === secondCard.dataset.name) {
      score++
      countScore.textContent = 'Знайдено пар ' + score + ' з 8'
      if (score === 8) {
        setTimeout(() => {
          const modalBackground = document.createElement('div')
          modalBackground.classList.add('modal-background')
          const modal = document.createElement('div')
          modal.classList.add('modal')
          const modalText = document.createElement('p')
          modalText.textContent = `Вітаю Це перемога! Ви зробили ${attempt} ходів`
          const newGame = document.createElement('button')
          newGame.classList.add('new-game-btn')
          newGame.textContent = 'New Game'
          newGame.addEventListener('click', resetGame)
          const closeGame = document.createElement('button')
          closeGame.classList.add('close-game-btn')
          closeGame.textContent = 'Close'
          closeGame.addEventListener('click', () => {
            modalBackground.remove()
          })
          modal.append(modalText)
          modal.append(newGame)
          modal.append(closeGame)
          modalBackground.append(modal)
          document.body.append(modalBackground)
        }, 500)
      }
      console.log('Зображення співпали')

      firstCard = null
      secondCard = null
      console.log(score)
    } else {
      lockBoard = true
      setTimeout(() => {
        firstCard.classList.remove('card-open')
        secondCard.classList.remove('card-open')
        firstCard = null
        secondCard = null
        lockBoard = false
      }, 1000)
    }
  })
  const img = document.createElement('img')

  img.classList.add('card__image')
  img.src = copyCardArr[i].img
  card.append(img)
  grid.append(card)
}
