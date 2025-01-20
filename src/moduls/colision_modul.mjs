import Vector from "../objects/vector.mjs";
import Modul from "./modul.mjs";
import { globalConfig } from "../config.mjs";

export default class ColisionModul extends Modul {
    constructor(walls, agent) {
        super();
        this.walls = walls;
        this.agent = agent;
    }
    calculVelocity(cPosition, position, velocity) {
        let trasjDesiree = null;
        trasjDesiree = this.calculTrajDesiree(position, velocity, new Vector(this.maxSpeed, this.maxSpeed), new Vector(globalConfig.width - this.maxSpeed, globalConfig.height - this.maxSpeed));
        for (const wall of this.walls) {
            const detectX = this.detectColAABB(wall.size.x, wall.x, this.agent.width, this.agent.position.x);
            if (detectX != null) {
                const detectY = this.detectColAABB(wall.size.y, wall.y, this.agent.height, this.agent.position.y);
                if (detectY != null) {
                    if (position.x < wall.x || position.x > wall.x + wall.size.x) {
                        trasjDesiree = new Vector(detectX, velocity.y);
                    }
                    if (position.y < wall.y || position.y > wall.y + wall.size.y) {
                        trasjDesiree = new Vector(velocity.x, detectY);
                    }
                }
            }
        }
        if (trasjDesiree != null) {
            trasjDesiree = Vector.normalized(trasjDesiree);
            trasjDesiree = Vector.multi(trasjDesiree, this.maxSpeed);
            let steer = Vector.subtract(trasjDesiree, velocity);
            steer = Vector.truncate(steer, this.maxForce);
            return steer;
        }
        return new Vector(0, 0);
    }
    calculTrajDesiree(position, velocity, minPos, maxPos) {
        let trasjDesiree = null;
        if (position.x < minPos.x) {
            trasjDesiree = new Vector(this.maxSpeed, velocity.y);
        } else if (position.x > maxPos.x) {
            trasjDesiree = new Vector(-this.maxSpeed, velocity.y);
        }
        if (position.y < minPos.y) {
            trasjDesiree = new Vector(velocity.x, this.maxSpeed);
        } else if (position.y > maxPos.y) {
            trasjDesiree = new Vector(velocity.x, -this.maxSpeed);
        }
        return trasjDesiree;
    }
    detectColAABB(wallSize, wall, agentSize, agent) {
        const deltaX = agent - (agentSize / 2);
        const a = new Map([
            ["agent", deltaX],
            ["wall", wall - this.maxSpeed],
        ]);
        const b = new Map([
            ["agent", deltaX + agentSize],
            ["wall", wall + wallSize + 2 * this.maxSpeed],
        ]);
        const litleA = Math.min(a.get("agent"), a.get("wall"));

        let keyLitleA = null;
        a.forEach((value, key) => {
            if (litleA == value) {
                keyLitleA = key;
            }
        });
        a.delete(keyLitleA);
        const bLitleValue = b.get(keyLitleA);
        if (a.values().next().value <= bLitleValue) {
            if (keyLitleA == "agent") {
                return -this.maxSpeed;
            } else {
                return this.maxSpeed;
            }
        }
        return null;
    }
}