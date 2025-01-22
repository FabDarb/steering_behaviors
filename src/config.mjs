import Vector from "./objects/vector.mjs";

export const globalConfig = {
    "width": 1200,
    "height": 700,
    "agent_size": new Vector(30, 20),
    "number_train": 5,
    //cohésion, align
    "number_agents": 1,
    //modul
    "defaultMaxForce": 4,
    "maxSpeed": 4,
    "proxiRing": 100,
    //seek
    "arrival_zone": 70,
    //separate
    "proxiSeparateRing": 50,
    "bumpForce": 0.5,
    //agent
    "detectRadius": 50,
    //leader_following
    "evade_leader_radius": 20,
    "max_distance_to_leader": 25,
};