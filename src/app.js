const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// on définie la vitesse
let speed = 100;
// on donne la direction
let direction = 'n'
// grille de 20 * 20
const gridElem = 40; 
// on positionne notre serpent
const snake = [
    [9,9],
    [8,9],
    [7,9],
];
// on donne la taille de notre pomme
let apple = [5, 5];
// score
let score = 0;

// dessiner la map
const drawMap = () => {
    ctx.fillStyle = 'black'; // fond noir
    ctx.fillRect(0, 0, 800, 800);
};

//on dessine notre serpent
const drawSnake = () => {
    ctx.fillStyle = 'green'; // on donne la couleur du serpernt
    for(let body of snake) {
        ctx.fillRect(body[0] * gridElem, body[1] * gridElem, gridElem, gridElem);
    }
};

// fonction pour bouger le serpent
const updateSnakePostion = () => {
    let head;
    switch(direction) {
        case 'e': {
            head = [snake[0][0] + 1, snake[0][1]];
            break;
        }
        case 'o': {
            head = [snake[0][0] - 1, snake[0][1]];
            break;
        }
        case 'n': {
            head = [snake[0][0], snake[0][1] - 1];
            break;
        }
        case 's': {
            head = [snake[0][0], snake[0][1] + 1];
            break;
        }
    }
    snake.unshift(head);
    if (head[0] === apple[0] && head[1] === apple[1]) {
        generateApple(); // on génére une nouvelle pomme si on l'a mange
    } else {
        snake.pop();
    }
    return gameover();
};

// on dessine notre pomme
const drawApple = () => {
    ctx.fillStyle = 'red';
    ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem);
};
// fonction gameover
const gameover = () => {
    if (
        snake[0][0] > 19 ||
        snake[0][0] < 0 ||
        snake[0][1] > 19 ||
        snake[0][1] < 0
      ) {
        return true;
      } else {
          const [head, ...body] = snake;
          for(let bodyElem of body) {
            if (bodyElem[0] === head[0]&& bodyElem[1] === head[1]) {
                return true;
            }
          }
      }
      return false;
};

// on change la pomme de place
const generateApple = () => {
    score++;
    const [x, y] = [
      Math.trunc(Math.random() * 20),
      Math.trunc(Math.random() * 20),
    ];
    for (let body of snake) {
      if (body[0] === x && body[1] === y) {
        return generateApple();
      }
    }
    apple = [x, y];
};

// on écoute l'évènement sur les touches de direction
window.addEventListener('keydown', (event) => {
    
    switch(event.key) {
        case 'ArrowRight': {
            direction = 'e';
            break;
        }
        case 'ArrowLeft': {
            direction = 'o';
            break;
        }
        case 'ArrowUp': {
            direction = 'n';
            break;
        }
        case 'ArrowDown': {
            direction = 's';
            break;
        }
    }

});

// fonction pour dessiner le score
const drawScore = () => {
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.textBaseline = "top";
    ctx.fillText(score, gridElem, gridElem);
};

// fonction qui gère le déplacement
const move = () => {
    
    if(!updateSnakePostion()) {
        speed = score * 200;
        drawMap();
        drawSnake();
        drawApple();
        drawScore();
        setTimeout(() => {
            requestAnimationFrame(move);
        }, 1000 - 500 )
    } else {
        alert('Perdu, votre score est :' + score);
    }
};

requestAnimationFrame(move);