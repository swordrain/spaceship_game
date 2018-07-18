class AlienGame {
    constructor(canvasDom) {
        this.SPACESHIP_MOVESTEP = 8;
        this.BULLETS_MOVESTEP = 3;
        this.BULLETS_LENGTH = 5;
        this.BULLETS_WIDTH = 3;
        this.canvas = canvasDom;
        this.context = this.canvas.getContext("2d");
        this.spaceship = {
            image: new Image()
        };
        this.alien = {
            image: new Image()
        };
        this.bullets = [];
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
                console.log(e)
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
                    case "Space":
                        if(this.bullets.length < 3){
                            this.bullets.push({
                                x: this.spaceship.location.x + this.spaceship.image.width / 2,
                                y: this.spaceship.location.y
                            });
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
        let now = Date.now();
        requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawBackground();
            this.drawSpaceship();
            this.drawBullets();

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
}

const alienGame = new AlienGame(document.getElementById("canvas"));

alienGame.init();
