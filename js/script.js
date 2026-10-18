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
  clearTimeout(timerId)
  lockBoard = false
  firstCard = null
  secondCard = null
  score = 0
  attempt = 0
  countAttempt.textContent = 'Moves: 0'
  countScore.textContent = 'Pairs found: 0 of 8'
  const existingModal = document.querySelector('.modal-background')
  if (existingModal) {
    existingModal.remove()
    document.body.style.overflow = ''
  }
  shuffle(copyCardArr)
  const refreshCard = document.querySelectorAll('.card')
  refreshCard.forEach((item, index) => {
    item.classList.remove('card-open')
    item.dataset.name = copyCardArr[index].name
    item.querySelector('.card__image').src = copyCardArr[index].img
  })
}
function openModal(content) {
  const modalBg = document.createElement('div')
  modalBg.classList.add('modal-background')
  document.body.style.overflow = 'hidden'
  modalBg.append(content)
  document.body.append(modalBg)
  modalBg.addEventListener('click', (e) => {
    if (e.target === modalBg) {
      modalBg.remove()
      document.body.style.overflow = ''
    }
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBg.remove()
      document.body.style.overflow = ''
    }
  })
}
shuffle(copyCardArr)
let firstCard = null
let secondCard = null
let lockBoard = false
let score = 0
let attempt = 0
let timerId = null

const header = document.createElement('header')
header.classList.add('header')
const headerNewGameBtn = document.createElement('button')
headerNewGameBtn.textContent = 'New Game'
headerNewGameBtn.classList.add('header-new-game-btn')
headerNewGameBtn.addEventListener('click', resetGame)
header.append(headerNewGameBtn)

const userScoreBtn = document.createElement('button')
userScoreBtn.classList.add('user-score-btn')
userScoreBtn.textContent = 'Leaderboard'
header.append(userScoreBtn)

userScoreBtn.addEventListener('click', () => {
  let history = JSON.parse(localStorage.getItem('userStorage')) || []
  const topTen = history.sort((a, b) => a.attempt - b.attempt).slice(0, 10)

  const userScoreContainer = document.createElement('div')
  userScoreContainer.classList.add('user-score-container')
  const userScoreCard = document.createElement('div')
  userScoreCard.classList.add('user-score-card')
  userScoreContainer.append(userScoreCard)
  const userScoreTitle = document.createElement('h2')
  userScoreTitle.classList.add('user-score-title')
  userScoreTitle.textContent = 'Leaderboard'
  userScoreCard.append(userScoreTitle)
  if (topTen.length === 0) {
    const notTop = document.createElement('p')
    notTop.classList.add('not-top')
    notTop.textContent = 'No results yet'
    userScoreCard.append(notTop)
  } else {
    topTen.forEach((item, index) => {
      const userScoreText = document.createElement('p')
      userScoreText.classList.add('user-score-text')
      userScoreText.textContent = `${index + 1}. ${item.date} Number of moves: ${item.attempt}`
      userScoreCard.append(userScoreText)
    })
  }
  const closeUserScore = document.createElement('button')
  closeUserScore.textContent = 'Close'
  closeUserScore.classList.add('close-user-score-btn')
  closeUserScore.addEventListener('click', () => {
    userScoreContainer.parentElement.remove()
    document.body.style.overflow = ''
  })
  userScoreCard.append(closeUserScore)
  openModal(userScoreContainer)
})

document.body.prepend(header)

const scoreBoard = document.createElement('div')
scoreBoard.classList.add('scoreboard')

let countAttempt = document.createElement('p')
countAttempt.textContent = 'Moves: 0'

let countScore = document.createElement('p')
countScore.textContent = 'Pairs found: 0 of 8'

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
    countAttempt.textContent = 'Moves: ' + attempt
    if (firstCard) secondCard = card
    if (firstCard.dataset.name === secondCard.dataset.name) {
      score++
      countScore.textContent = 'Pairs found: ' + score + ' of 8'
      if (score === 8) {
        const day = String(new Date().getDate()).padStart(2, '0')
        const month = String(new Date().getMonth() + 1).padStart(2, '0')
        const year = new Date().getFullYear()
        const localData = {
          date: `${day}.${month}.${year}`,
          attempt: attempt,
        }
        let history = JSON.parse(localStorage.getItem('userStorage')) || []
        history.push(localData)
        localStorage.setItem('userStorage', JSON.stringify(history))
        setTimeout(() => {
          const modal = document.createElement('div')
          modal.classList.add('modal')
          const modalText = document.createElement('p')
          modalText.classList.add('modal-text')
          modalText.textContent = `Congratulations! You won in ${attempt} moves`
          const newGame = document.createElement('button')
          newGame.classList.add('new-game-btn')
          newGame.textContent = 'New Game'
          newGame.addEventListener('click', resetGame)
          const closeGame = document.createElement('button')
          closeGame.classList.add('close-game-btn')
          closeGame.textContent = 'Close'
          closeGame.addEventListener('click', () => {
            modal.parentElement.remove()
            document.body.style.overflow = ''
          })
          modal.append(modalText)
          modal.append(newGame)
          modal.append(closeGame)

          openModal(modal)
        }, 500)
      }

      firstCard = null
      secondCard = null
    } else {
      lockBoard = true
      timerId = setTimeout(() => {
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
