const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.querySelector("#score-points"),
  },

  cardSprites: {
    avatar: document.querySelector("#card_image"),
    name: document.querySelector("#card_name"),
    type: document.querySelector("#card_type"),
  },
  fieldSide: {
    player: document.querySelector(".player-field-card"),
    computer: document.querySelector(".computer-field-card"),
  },
  actions: {
    buttom: document.querySelector("#next-duel"),
  },
};

const playersSides = {
  player1: "player-field-card",
  computer: "computer-field-card",
};

const cardData = [
  {
    id: 0,
    name: "Blue Eyes White Dragon",
    type: "Papel",
    img: "/src/assets/icons/dragon.png",
    winOf: [1],
    losseOF: [2],
  },

  {
    id: 1,
    name: "Dark Magician",
    type: "pedra",
    img: "/src/assets/icons/magician.png",
    winOf: [2],
    losseOF: [1],
  },

  {
    id: 2,
    name: "Exodia",
    type: "Tesoura",
    img: "/src/assets/icons/exodia.png",
    winOf: [0],
    losseOF: [1],
  },
];

async function getNumberCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "/src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", idCard);
  cardImage.classList.add("card");

  if (fieldSide === playersSides.player1) {
    cardImage.addEventListener("click", () => {
      setCardsFiels(cardImage.getAttribute("data-id"));
    });
  }

  cardImage.addEventListener("mouseover", () => {
    drawSelectCard(idCard);
  });

  return cardImage;
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getNumberCardId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);
    console.log(cardImage);
    console.log(fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}
function init() {
  drawCards(5, playersSides.player1);
  drawCards(5, playersSides.computer);
}

init();
