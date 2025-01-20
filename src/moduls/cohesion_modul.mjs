import Vector from "../objects/vector.mjs";
import Modul from "./modul.mjs";
import SeekModul from "./seek_modul.mjs";

export default class CohesionModul extends Modul {
    constructor(agents, agent) {
        super();
        this.agents = agents;
        this.agent = agent;
        this.seekModul = new SeekModul();
    }

    calculVelocity(cPosition, position, velocity) {
        let moyenne = new Vector(0, 0);
        let count = 0;
        for (const agent of this.agents) {
            const distance = Vector.subtract(agent.position, position).length();
            if (distance <= this.proxiSeparateRing) {
                moyenne = Vector.addition(moyenne, agent.position);
            }
        }
        if (count > 0) {
            moyenne = Vector.divide(moyenne, count);
            // const directionPos = Vector.subtract(moyenne, position);
            return this.seekModul.calculVelocity(moyenne, position, velocity);
        } else {
            return new Vector(0, 0);
        }
    }
}