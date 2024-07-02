import { SimulationNodeDatum } from 'd3';


export class Node {
    // Optional - defining optional implementation properties - required for relevant typing assistance
    sim: SimulationNodeDatum = { 
        index : 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        fx: null,
        fy: null
    }; 

    group?: number | string;
    name?: string;
    r?: number;
    radius?: number;
    color?: string;
    id?: number;

    parent?: Node;
    children?: Node[] = [];
    siblings?: Node[] = [];

    
    constructor(id: number, x=100, y=100, r=12) {
        this.id = id;
        this.sim.x = x;
        this.sim.y = y;
        this.r = r;
    }
}