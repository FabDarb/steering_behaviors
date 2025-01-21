import Modul from "./modul.mjs";
import SeekModul from "../moduls/seek_modul.mjs";
import Vector from "../objects/vector.mjs";
export default class PathFollowingModul extends Modul {
    constructor(agent, pathIndex) {
        super();
        this.agent = agent;
        this.pathIndex = pathIndex;
        this.latestNode = null;
        this.seekModul = new SeekModul(agent.walls, this.agent, false);
    }
    get pathRadius() {
        return 5;
    }
    set setLatestNode(value) {
        this.latestNode = value;
    }
    get getLatestNode() {
        return this.latestNode;
    }
    calculVelocity(cPosition, position, velocity) {
        let steer = new Vector(0, 0);
        const predictPos = Vector.addition(position, Vector.multi(velocity, 12));
        if (this.latestNode != null) {
            let distanceOfPredict = Vector.subtract(predictPos, position);
            let distanceOfDestin = Vector.subtract(cPosition, position);
            distanceOfDestin = Vector.normalized(distanceOfDestin);
            let projectionPoint = Vector.dot(distanceOfPredict, distanceOfDestin);
            distanceOfDestin = Vector.multi(distanceOfDestin, projectionPoint);
            const point = Vector.addition(distanceOfDestin, position);
            const distanceOfPoint = Vector.subtract(point, predictPos).length();
            if (distanceOfPoint > this.pathRadius) {
                const target = point;
                const seekForce = this.seekModul.calculVelocity(target, position, velocity);
                steer = seekForce;
            }
        } else {
            const seekForce = this.seekModul.calculVelocity(cPosition, position, velocity);
            steer = seekForce;
        }
        return steer;
    }
}