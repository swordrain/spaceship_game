class AlienGame {
    constructor(canvasDom) {
        this.SPACESHIP_MOVESTEP = 8;
        this.canvas = canvasDom;
        this.context = this.canvas.getContext("2d");
        this.spaceship = {
            image: new Image()
        };
        this.alien = {
            image: new Image()
        };
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
                        if (this.spaceship.location.x + this.spaceship.image.width + this.SPACESHIP_MOVESTEP >= this.canvas.width) {
                            this.spaceship.location.x = this.canvas.width - this.spaceship.image.width;
                        } else {
                            this.spaceship.location.x += this.SPACESHIP_MOVESTEP;
                        }

                        break;
                    case "ArrowLeft":
                        if (this.spaceship.location.x - this.SPACESHIP_MOVESTEP <= 0) {
                            this.spaceship.location.x = 0;
                        } else {
                            this.spaceship.location.x -= this.SPACESHIP_MOVESTEP;
                        }
                        break;
                    default:
                        break;
                }
            })
            this.draw();
        })

    }

    draw() {
        console.log(this)
        let now = Date.now();
        requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawBackground();
            this.drawSpaceship();

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
        this.context.drawImage(this.spaceship.image, this.spaceship.location.x, this.spaceship.location.y);
        this.context.restore();
    }
}

const alienGame = new AlienGame(document.getElementById("canvas"));

alienGame.init();
