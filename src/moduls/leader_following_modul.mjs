import { globalConfig } from "../config.mjs";
import Vector from "../objects/vector.mjs";
import EvadeModul from "./evade_modul.mjs";
import Modul from "./modul.mjs";
import SeekModul from "./seek_modul.mjs";

export default class LeaderFollowingModul extends Modul {
    constructor(leader, agent) {
        super();
        this.leader = leader;
        this.agent = agent;
        this.seekModul = new SeekModul(this.agent.walls, this.agent, true);
        this.evadeModul = new EvadeModul(agent);
    }
    get evadeLeaderRadius() {
        return globalConfig.evade_leader_radius;
    }
    calculVelocity(cPosition, position, velocity) {
        const target = Vector.subtract(this.leader.position, this.leader.currentVelocity);
        const steers = [];
        const leaderFuture = Vector.addition(this.leader.position, this.leader.currentVelocity);
        const distanceToLeader = Vector.subtract(leaderFuture, position).length();
        if (distanceToLeader > this.evadeLeaderRadius) {
            steers.push(this.seekModul.calculVelocity(target, position, velocity));
        } else {
            this.evadeModul.setTarget = this.leader;
            steers.push(this.evadeModul.calculVelocity(leaderFuture, position, velocity));
        }
        const totalForce = this.applyForce(steers);
        return totalForce;
    }
}