import { globalConfig } from "../config.mjs";
import Vector from "../objects/vector.mjs"
import ColisionModul from "./colision_modul.mjs";
import Modul from "./modul.mjs";
export default class SeekModul extends Modul {
    constructor(walls, agent, arrivalBool) {
        super();
        this.colisionModul = new ColisionModul(walls, agent);
        this.arrivalBool = arrivalBool;
    }
    get arrival_zone() {
        return globalConfig.arrival_zone;
    }
    calculVelocity(cPosition, position, velocity) {
        let trasjDesiree = Vector.subtract(cPosition, position);

        const distance = trasjDesiree.length();

        if (this.arrivalBool && distance < this.arrival_zone) {
            trasjDesiree = Vector.multi(Vector.multi(Vector.normalized(trasjDesiree), this.maxSpeed), (distance / this.arrival_zone));
        } else {
            trasjDesiree = Vector.multi(Vector.normalized(trasjDesiree), this.maxSpeed);
        }


        let steering = Vector.subtract(trasjDesiree, velocity);
        const seekSteering = Vector.truncate(steering, this.maxForce / 10);
        const colisionSteering = this.colisionModul.calculVelocity(cPosition, position, velocity);
        const steer = this.applyForce([seekSteering, colisionSteering]);
        return steer;

    }
}