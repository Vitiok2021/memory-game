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
console.log(copyCardArr)

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

for (let i = 0; i < copyCardArr.length; i++) {
  const card = document.createElement('div')
  card.classList.add('card')
  grid.append(card)
}
