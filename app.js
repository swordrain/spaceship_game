class Alien {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class AlienGame {
    constructor(canvasDom) {
        this.SPACESHIP_MOVESTEP = 8;
        this.BULLETS_MOVESTEP = 3;
        this.BULLETS_LENGTH = 5;
        this.BULLETS_WIDTH = 3;
        this.BULLETS_COUNT = 5;
        this.ALIEN_COUNT = 5;
        this.spaceshipMove = 0;
        this.canvas = canvasDom;
        this.context = this.canvas.getContext("2d");
        this.spaceship = {
            image: new Image()
        };
        this.alien = {
            image: new Image()
        };
        this.bullets = [];
        this.aliens = [];
        console.log(this.context);
    }

    init() {


        Promise.all([new Promise((resolve, reject) => {
            this.spaceship.image.src = "images/ship.bmp";

            this.spaceship.image.onload = () => {

                this.spaceship.location = {
                    x: (this.canvas.width - this.spaceship.image.width) / 2,
                    y: this.canvas.height - this.spaceship.image.height
                }
                resolve();
            };

        }), new Promise((resolve, reject) => {
            this.alien.image.src = "images/alien.bmp";

            this.alien.image.onload = () => {
                resolve();
            };
        })]).then(() => {

            window.addEventListener("keydown", e => {
                switch (e.code) {

                    case "ArrowRight":
                        this.spaceshipMove = this.SPACESHIP_MOVESTEP;
                        break;
                    case "ArrowLeft":
                        this.spaceshipMove = -this.SPACESHIP_MOVESTEP;
                        break;
                    case "Space":
                        if (this.bullets.length < this.BULLETS_COUNT) {
                            this.bullets.push({
                                x: this.spaceship.location.x + this.spaceship.image.width / 2,
                                y: this.spaceship.location.y
                            });
                        }
                        break;
                    default:
                        break;
                }
            });
            window.addEventListener("keyup", e => {
                switch (e.code) {
                    case "ArrowRight":
                    case "ArrowLeft":
                        this.spaceshipMove = 0;
                        break;
                    default:
                        break;
                }
            });

            Array.from({ length: this.ALIEN_COUNT }).forEach(() => {
                this.aliens.push(new Alien(Math.floor((this.canvas.width - this.spaceship.image.width / 2) * Math.random()), Math.floor(this.canvas.height / 2 * Math.random())))
            });

            console.log(this.aliens);

            this.draw();
        })

    }

    draw() {
        let now = Date.now();
        requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawBackground();
            this.drawSpaceship();
            this.drawBullets();
            this.checkCollide();
            this.drawAliens();

            now = Date.now();
            this.draw();
        })

    }

    drawBackground() {
        this.context.save();
        this.context.fillStyle = "rgb(230, 230, 230)";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
    }

    drawSpaceship() {
        this.context.save();
        if (this.spaceship.location.x + this.spaceshipMove < 0) {
            this.spaceship.location.x = 0
        } else if (this.spaceship.location.x + this.spaceshipMove + this.spaceship.image.width > this.canvas.width) {
            this.spaceship.location.x = this.canvas.width - this.spaceship.image.width
        } else {
            this.spaceship.location.x += this.spaceshipMove;
        }

        this.context.drawImage(this.spaceship.image, this.spaceship.location.x, this.spaceship.location.y);
        this.context.restore();
    }

    drawBullets() {
        this.context.save();
        this.context.fillStyle = "black";

        this.bullets = this.bullets.filter(b => {
            return b.y - this.BULLETS_LENGTH > 0;
        });
        this.bullets.forEach(b => {
            b.y -= this.BULLETS_MOVESTEP;
            this.context.fillRect(b.x - this.BULLETS_WIDTH / 2, b.y - this.BULLETS_LENGTH, this.BULLETS_WIDTH, this.BULLETS_LENGTH);
        });
        this.context.restore();
    }

    drawAliens() {
        this.context.save();
        this.aliens.forEach(a => {
            a.x += Math.floor(Math.random() * 5 - 2);
            if (a.x < 0) {
                a.x = 0;
            }
            a.y += Math.floor(Math.random() * 5 - 2);
            if (a.y < 0) {
                a.y = 0
            }

            this.context.drawImage(this.alien.image, a.x, a.y);
        });

        this.context.restore();
    }

    checkCollide() {
        const alienFilterIndex = new Set();
        const bulletFilterIndex = new Set();
        this.aliens.forEach((a, aIndex) => {
            this.bullets.forEach((b, bIndex) => {
                if ((b.y + this.BULLETS_LENGTH) <= (a.y + this.alien.image.height) && b.y >= a.y && (b.x >= a.x && (b.x + this.BULLETS_WIDTH) <= (a.x + this.alien.image.width))) {
                    alienFilterIndex.add(aIndex);
                    bulletFilterIndex.add(bIndex);
                    console.log(alienFilterIndex, bulletFilterIndex);
                }
            })
        });

        this.aliens = this.aliens.filter((_, aIndex) => {
            return !alienFilterIndex.has(aIndex);
        });
        this.bullets = this.bullets.filter((_, bIndex) => {
            return !bulletFilterIndex.has(bIndex);
        });
    }
}

const alienGame = new AlienGame(document.getElementById("canvas"));

alienGame.init();
