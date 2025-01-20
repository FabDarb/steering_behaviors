import Vector from "../objects/vector.mjs";
import { globalConfig } from "../config.mjs";

export default class Modul {
    get defaultMaxForce() {
        return globalConfig.defaultMaxForce;
    }
    _maxForce = this.defaultMaxForce;
    get maxForce() {
        return this._maxForce;
    }
    set maxForce(value) {
        this._maxForce = value;
    }
    get maxSpeed() {
        return globalConfig.maxSpeed;
    }
    get proxiRing() {
        return globalConfig.proxiRing;
    }
    calculVelocity(cPosition, position, velocity) {
        const distanceTo = Vector.moyenne(this.position, cPosition);
        if (distanceTo >= 3) {
            const direction = Vector.normalized(Vector.subtract(position, cPosition));
            return Vector.multi(direction, this.speed);
        }
        return new Vector(0, 0);
    }
    applyForce(steers) {
        let totalSteer = new Vector(0, 0);
        for (const steer of steers) {
            totalSteer = Vector.addition(totalSteer, steer);
        }
        return Vector.truncate(totalSteer, this.maxSpeed);
    }
}