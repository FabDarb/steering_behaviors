import Vector from "../objects/vector.mjs";
import Modul from "./modul.mjs";

export default class AlignModul extends Modul {
    constructor(agents, agent) {
        super();
        this.agents = agents;
        this.agent = agent;
    }
    calculVelocity(cPosition, position, velocity) {
        let moyenne = new Vector(0, 0);
        let count = 0;
        for (const agent of this.agents) {
            const distance = Vector.subtract(agent.position, position).length();
            if (distance <= this.proxiRing) {
                moyenne = Vector.addition(moyenne, agent.currentVelocity);
                ++count;
            }
        }
        if (count > 0) {
            // moyenne = Vector.divide(moyenne, this.agents.length);
            moyenne = Vector.truncate(moyenne, this.maxSpeed);
            let steer = Vector.subtract(moyenne, velocity);
            steer = Vector.truncate(steer, this.maxForce);
            return steer;
        } else {
            Vector(0, 0);
        }
    }
}