class AlienGame {
    constructor(canvasDom) {
        this.canvas = canvasDom;
        this.context = this.canvas.getContext("2d");
        this.spaceship = new Image();
        this.alien = new Image();
        console.log(this.context);
    }

    init() {


        Promise.all([new Promise((resolve, reject) => {
            this.spaceship.src = "images/ship.bmp";

            this.spaceship.onload = () => {
                resolve();
            };

        }), new Promise((resolve, reject) => {
            this.alien.src = "images/alien.bmp";

            this.alien.onload = () => {
                resolve();
            };
        })]).then(() => {
            this.draw();
        })

    }

    draw() {
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
        this.context.drawImage(this.spaceship, this.canvas.width / 2 - this.spaceship.width / 2, this.canvas.height - this.spaceship.height);
        this.context.restore();
    }
}

const alienGame = new AlienGame(document.getElementById("canvas"));

alienGame.init();
