import Vector from "./objects/vector.mjs";

export const globalConfig = {
    "width": 1200,
    "height": 700,
    "agent_size": new Vector(30, 20),
    "number_train": 5,
    //cohésion, align
    "number_agents": 100,
    //modul
    "defaultMaxForce": 4,
    "maxSpeed": 4,
    "proxiRing": 100,
    //seek
    "arrival_zone": 70,
    //separate
    "proxiSeparateRing": 50,
    "bumpForce": 0.5,
};