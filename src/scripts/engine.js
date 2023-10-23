
const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scorePlayerBox: document.querySelectorAll(".score-player"),
    scoreComputerBox: document.querySelectorAll(".score-computer"),
  },

  cardSprites: {
    avatar: document.querySelector("#card_image"),
    name: document.querySelector("#card_name"),
    type: document.querySelector("#card_type"),

    avatarComputer: document.querySelector("#card_image_computer"),
    nameComputer: document.querySelector("#card_name_computer"),
    typeComputer: document.querySelector("#card_type_computer"),
  },

  playersSides: {
    player: document.querySelector("#player-cards"),
    computer: document.querySelector("#computer-cards"),
  },
  fieldCards: {
    player: document.querySelector("#player-field-card"),
    computer: document.querySelector("#computer-field-card"),
  },
  actions: {
    button: document.querySelector("#next-duel"),
  },
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
    losseOF: [0],
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

async function getRadomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "/src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", idCard);
  cardImage.classList.add("card");

  if (fieldSide === state.playersSides.player) {
    cardImage.addEventListener("click", () => {
      setCardsInField(cardImage.getAttribute("data-id"));
    });
    cardImage.classList.add("player_cards");
  }

  if (cardImage.classList.contains("player_cards")) {
    cardImage.addEventListener("mouseover", () => {
      drawSelectCard(idCard);
    });
  }

  return cardImage;
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRadomCardId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);
    fieldSide.appendChild(cardImage);
  }
}

async function drawSelectCard(index) {
  state.cardSprites.avatar.src = cardData[index].img;
  state.cardSprites.name.innerText = cardData[index].name;
  state.cardSprites.type.innerText = "Atributo :" + cardData[index].type;
}

async function setCardsInField(cardId) {
  await removeAllCardsImage();

  let computerCardId = await getRadomCardId();

  state.fieldCards.player.style.display = "block";
  state.fieldCards.computer.display = "block";

  state.fieldCards.player.src = cardData[cardId].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;

  let result = await checkDuelResult(cardId, computerCardId);
  await getAttributeComputerCardId(computerCardId);
  await updateScore();
  await drawButton(result);
}

async function getAttributeComputerCardId(index) {
  state.cardSprites.avatarComputer.src = cardData[index].img;
  state.cardSprites.nameComputer.innerText = cardData[index].name;
  state.cardSprites.typeComputer.innerText =
    "Atributo :" + cardData[index].type;
}

async function updateScore() {
  state.score.scorePlayerBox.forEach((element) => {
    element.innerText = "";
    element.innerText = `${state.score.playerScore}`;
  });
  state.score.scoreComputerBox.forEach((element) => {
    element.innerText = "";
    element.innerText = `${state.score.computerScore}`;
  });
}

async function drawButton(text) {
  state.actions.button.innerText = text;
  state.actions.button.style.display = "block";
}
async function checkDuelResult(playCardId, computerCardId) {
  let duelResult;
  let playcard = cardData[playCardId];

  if (playcard.winOf.includes(computerCardId)) {
    duelResult = "Você Ganhou";
    state.score.playerScore++;
    await playSounds("win");
  } else if (playcard.losseOF.includes(computerCardId)) {
    duelResult = "Você Perdeu";
    await playSounds("lose");
    state.score.computerScore++;
  } else {
    duelResult = "empate";
  }

  return duelResult;
}

async function removeAllCardsImage() {
  let cards = state.playersSides.computer;
  let imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());

  cards = state.playersSides.player;
  imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

let audio = new Audio(`../src/assets/audios/egyptian_duel.mp3`);
audio.loop = true;
audio.play();
function init() {
  
  drawCards(5, state.playersSides.player);
  drawCards(5, state.playersSides.computer);
}
async function resetDuel() {
  state.cardSprites.avatar.src = "";
  state.actions.button.style.display = "none";

  init();
}

async function playSounds(status) {
  let audio = new Audio(`../src/assets/audios/${status}.wav`);
  audio.play();
}
init();
