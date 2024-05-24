import * as d3 from 'd3';


export class Node {
    // Optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;
    name?: string;
    group?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    r?: number;
    radius?: number;
    color?: string;
    

    id?: number;
    
    constructor(id: number) {
        this.id = id;
    }
}