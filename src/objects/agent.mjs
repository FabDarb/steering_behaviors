import Vector from "./vector.mjs";
export default class Agent {
    constructor(id, position, ctx, height, width, color, walls, modul) {
        this.id = id;
        this.position = position;
        this.ctx = ctx;
        this.height = height;
        this.width = width;
        this.angle = 0;
        this.speed = 4;
        this.color = color;
        this.walls = walls;
        this.acceleration = new Vector(0, 0);
        this.modul = modul;
        this.currentVelocity = new Vector(0, 0);
    }
    get getModul() {
        return this.modul;
    }
    set setModul(value) {
        this.modul = value;
    }
    draw() {
        this.ctx.save();
        const dx = this.position.x - (this.width / 2);
        const dy = this.position.y - (this.height / 2);
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(Math.PI / 180 * this.angle);
        this.ctx.translate(-(this.position.x), -(this.position.y));
        this.ctx.beginPath();
        this.ctx.moveTo(dx, dy);
        this.ctx.lineTo(dx, dy + this.height);
        this.ctx.lineTo(dx + this.width, dy + this.height / 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.restore();
    }
    update(destination) {
        this.angle = this.calculateAngle(destination.x, destination.y);
        this.acceleration = this.move(new Vector(destination.x, destination.y));
        this.position = Vector.addition(this.position, this.currentVelocity);
        if (this.modul == null) {
            this.currentVelocity = this.move(new Vector(destination.x, destination.y));
        } else {
            this.currentVelocity = Vector.addition(this.acceleration, this.currentVelocity);
        }

        this.acceleration = Vector.multi(this.acceleration, 0);
        this.draw();
    }
    calculateAngle() {
        const radians = Math.atan2(this.currentVelocity.y, this.currentVelocity.x);
        return radians * (180 / Math.PI);
    }
    move(cPosition) {
        if (this.modul == null) {
            const distanceTo = Vector.moyenne(this.position, cPosition);
            if (distanceTo >= 3) {
                const direction = Vector.normalized(Vector.subtract(cPosition, this.position));
                return Vector.multi(direction, this.speed);
            }
            return new Vector(0, 0);
        }
        return this.modul.calculVelocity(cPosition, this.position, this.currentVelocity);
    }
}