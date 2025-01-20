export default class Wall {
    constructor(x, y, size, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
    }
    draw() {
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(this.x, this.y, this.size.x, this.size.y);

    }
}