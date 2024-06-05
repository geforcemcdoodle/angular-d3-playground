import * as d3 from 'd3';


export class Node implements d3.SimulationNodeDatum {
    // Optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;
    name?: string;
    group?: number;
    x!: number;
    y!: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    r?: number;
    radius?: number;
    color?: string;
    

    id?: number;
    
    constructor(id: number, x=100, y=100, r=15) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
    }
}