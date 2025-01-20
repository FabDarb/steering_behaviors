import { globalConfig } from "../config.mjs";
import Vector from "../objects/vector.mjs";
import Modul from "./modul.mjs";

export default class SeparateModul extends Modul {
    constructor(agents, agent) {
        super();
        this.agents = agents;
        this.agent = agent;
    }
    get proxiSeparateRing() {
        return globalConfig.proxiSeparateRing;
    }
    get bumpForce() {
        return globalConfig.bumpForce;
    }

    calculVelocity(cPosition, position, velocity) {
        const proxiAgents = [];
        for (const agent of this.agents) {
            if (agent.id != this.agent.id) {
                const distanceAgent = Vector.subtract(agent.position, position).length();
                if (distanceAgent <= this.proxiSeparateRing) {
                    proxiAgents.push(agent);
                }
            }
        }
        return Vector.truncate(this.calculRepulsForce(proxiAgents, position, velocity), this.maxSpeed);
    }
    calculRepulsForce(agents, position, velocity) {
        let repulsForce = new Vector(0, 0);
        for (const agent of agents) {
            let sub = Vector.subtract(position, agent.position);
            const distance = sub.length();
            sub = Vector.normalized(sub);
            sub = Vector.multi(sub, 1 / distance);
            repulsForce = Vector.addition(repulsForce, sub);

        }
        if (agents.length > 0) {
            repulsForce = Vector.normalized(repulsForce);
            repulsForce = Vector.multi(repulsForce, this.maxSpeed);
            repulsForce = Vector.subtract(repulsForce, velocity);
            repulsForce = Vector.truncate(repulsForce, this.bumpForce);
        }
        return repulsForce;
    }
}