import Vector from "./vector.mjs";
import { globalConfig } from "../config.mjs";
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
        this.destination = null;
    }
    get getModul() {
        return this.modul;
    }
    set setModul(value) {
        this.modul = value;
    }
    get detectRadius() {
        return globalConfig.detectRadius;
    }
    set setDestination(value) {
        this.destination = value;
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
    detectTrain(trains) {
        for (const train of trains) {
            const distanceTo = Vector.subtract(train.position, this.position).length();
            if (distanceTo <= this.detectRadius && this.modul.leader == null) {
                this.modul.setLeader = train;
                console.log("detect leader");
            }
        }
    }
    update() {
        this.angle = this.calculateAngle(this.destination.x, this.destination.y);
        this.acceleration = this.move(new Vector(this.destination.x, this.destination.y));
        this.position = Vector.addition(this.position, this.currentVelocity);
        if (this.modul == null) {
            this.currentVelocity = this.move(new Vector(this.destination.x, this.destination.y));
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