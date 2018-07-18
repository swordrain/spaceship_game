class AlienGame {
    constructor(canvasDom) {
        this.canvas = canvasDom;
        this.context = this.canvas.getContext("2d");
        console.log(this.context);
    }

    init() {
        this.draw();
    }

    draw() {
        let now = Date.now();
        requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawBackground();

            now = Date.now();
            this.draw();
        })

    }

    drawBackground() {
        this.context.save();
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
    }
}

const alienGame = new AlienGame(document.getElementById("canvas"));

alienGame.init();
