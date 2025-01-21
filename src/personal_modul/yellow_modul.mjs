import Modul from "../moduls/modul.mjs";
import PathFollowingModul from "../moduls/path_following_modul.mjs";
import Vector from "../objects/vector.mjs";

export default class YellowModul extends Modul {
    constructor(agent, agents, pathIndex) {
        super();
        this.agent = agent;
        this.agents = agents;
        this.pathIndex = pathIndex;
        this.pathFollowingModul = new PathFollowingModul(this.agent, this.pathIndex)

    }

    calculVelocity(cPosition, position, velocity) {
        const pathForce = this.pathFollowingModul.calculVelocity(cPosition, position, velocity);
        if (Vector.subtract(cPosition, position).length() <= 35) {
            ++this.pathIndex;
            if (this.pathFollowingModul.getLatestNode == null || (this.pathFollowingModul.getLatestNode.x != cPosition.x || this.pathFollowingModul.getLatestNode.y != cPosition.y)) {
                this.pathFollowingModul.setLatestNode = cPosition;
            }
            if (this.pathIndex > 3) {
                this.pathIndex = 0;
            }
        }
        const totalSteer = this.applyForce([pathForce]);

        return totalSteer;
    }
}