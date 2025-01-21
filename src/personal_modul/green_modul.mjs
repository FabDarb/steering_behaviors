import AlignModul from "../moduls/align_modul.mjs";
import CohesionModul from "../moduls/cohesion_modul.mjs";
import EvadeModul from "../moduls/evade_modul.mjs";
import Modul from "../moduls/modul.mjs";
import SeekModul from "../moduls/seek_modul.mjs";
import SeparateModul from "../moduls/separate_modul.mjs";
import Vector from "../objects/vector.mjs";

export default class GreenModul extends Modul {
    constructor(agents, agent) {
        super();
        this.agents = agents;
        this.agent = agent;
        this.separateModul = new SeparateModul(this.agents, this.agent);
        this.seekModul = new SeekModul(this.agent.walls, this.agent, true);
        this.alignModul = new AlignModul(this.agents, this.agent);
        this.cohesionModul = new CohesionModul(this.agents, this.agent);
        this.evadeModul = new EvadeModul(agent);
        this.leader = null;
    }
    set setTargetToEvade(value) {
        this.evadeModul.setTarget = value;
    }
    set setLeader(value) {
        this.leader = value;
    }
    calculVelocity(cPosition, position, velocity) {
        let totalSteer = new Vector(0, 0);
        const steers = [];
        steers.push(this.separateModul.calculVelocity(cPosition, position, velocity));
        if (this.leader == null) {
            steers.push(Vector.multi(this.seekModul.calculVelocity(cPosition, position, velocity), 1));
            //const evadeForce = Vector.multi(this.evadeModul.calculVelocity(cPosition, position, velocity), 1);
        } else {

        }
        totalSteer = this.applyForce(steers);
        return totalSteer;
    }
}