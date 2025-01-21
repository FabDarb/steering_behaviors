import Vector from "../objects/vector.mjs";
import FleeModul from "./flee_modul.mjs";
import Modul from "./modul.mjs";

export default class EvadeModul extends Modul {
    constructor(agent) {
        super();
        this.agent = agent;
        this.target = null;
        this.fleeModul = new FleeModul(this.agent.walls, this.agent);
    }
    set setTarget(value) {
        this.target = value;
    }
    calculVelocity(cPosition, position, velocity) {
        if (this.target != null) {
            const distance = Vector.subtract(cPosition, position).length();
            const timeToFutureTargetPos = distance / this.maxSpeed;
            const futurePos = Vector.multi(Vector.addition(cPosition, this.target.currentVelocity), timeToFutureTargetPos);
            return this.fleeModul.calculVelocity(futurePos, position, velocity);
        }
        return new Vector(0, 0);
    }
}