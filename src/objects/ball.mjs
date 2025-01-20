export default class Ball {
    constructor(color, x, y, velocity, size) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.size = size;
    }

    generateBall(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    move(ctx, cnv) {
        // if (this.x + this.size >= cnv.clientWidth || this.x <= 0) {
        //     this.velocity.x = this.velocity.x * -1;
        // }
        // if (this.y + this.size >= cnv.clientHeight || this.y <= 0) {
        //     this.velocity.y = this.velocity.y * -1;
        // }
        // this.x += this.velocity.x;
        // this.y += this.velocity.y;
        this.generateBall(ctx);
    }
}