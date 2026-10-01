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

const grid = document.createElement('div')
grid.classList.add('cards')
document.body.append(grid)

let firstCard = null
let secondCard = null
let lockBoard = false

let score = 0
let attempt = 0

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
    if (firstCard) secondCard = card
    //  console.log(firstCard, secondCard)
    if (firstCard.dataset.name === secondCard.dataset.name) {
      console.log('Зображення співпали')
      score++
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
