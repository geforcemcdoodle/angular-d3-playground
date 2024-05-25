import { Node } from './node';
import * as d3 from 'd3';

export class Link {
    index?: number;
    value?: number;
    source: number;
    target: number;
    
    constructor(source: number, target: number) {
        this.source = source;
        this.target = target;
    }
}