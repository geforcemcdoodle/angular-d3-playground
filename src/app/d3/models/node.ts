import { SimulationNodeDatum } from 'd3';


export class Node {
    sim: SimulationNodeDatum = { 
        index : 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        fx: null,
        fy: null
    }; 

    svg = {
        group: 0,
        name: "",
        color: "",
        id: 0
    };

    radius?: number = 12;

    parent?: Node;
    children?: Node[] = [];
    siblings?: Node[] = [];

    
    constructor(id: number, x=100, y=100, r=12) {
        this.svg.id = id;
        this.sim.x = x;
        this.sim.y = y;
    }
}