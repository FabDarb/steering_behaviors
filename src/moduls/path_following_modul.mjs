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
        return 10;
    }
    set setLatestNode(value) {
        this.latestNode = value;
    }
    get getLatestNode() {
        return this.latestNode;
    }
    calculVelocity(cPosition, position, velocity) {
        let steer = new Vector(0, 0);
        const predictPos = Vector.addition(position, velocity);
        if (this.latestNode != null) {
            const distanceOf = Vector.subtract(cPosition, this.latestNode);
            const absDistanceOf = new Vector(Math.abs(distanceOf.x), Math.abs(distanceOf.y));
            const reverseSimpleDist = new Vector(absDistanceOf.y == 0 ? 0 : 1, absDistanceOf.x == 0 ? 0 : 1);
            const predictPosWithReverse = Vector.multiplication(predictPos, reverseSimpleDist);
            const minValuePredict = Math.max(predictPosWithReverse.x, predictPosWithReverse.y);
            const pointWithReverse = Vector.multiplication(cPosition, reverseSimpleDist);
            const minValuePoint = Math.max(pointWithReverse.x, pointWithReverse.y);
            if (minValuePredict > minValuePoint + this.pathRadius || minValuePredict < minValuePoint - this.pathRadius) {
                const target = new Vector(distanceOf.x == 0 ? minValuePoint : predictPos.x, distanceOf.y == 0 ? minValuePoint : predictPos.y);
                const seekForce = this.seekModul.calculVelocity(target, position, velocity);
                steer = seekForce;
            }
            //  else {
            //     steer = this.seekModul.calculVelocity(cPosition, position, velocity);
            // }
        } else {
            const seekForce = this.seekModul.calculVelocity(cPosition, position, velocity);
            steer = seekForce;
        }
        return steer;
    }
}