import { Injectable } from '@angular/core';
import { ForceDirectedGraph } from './models/force-directed-graph';
import { Link } from './models/link';
import { Node } from './models/node';
import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3';
import { Store } from '@ngrx/store';
import { selectFocusedNode } from '../store/nodes.selectors';


@Injectable({
  providedIn: 'root',
})
export class D3Service {
    /** This service will provide methods to enable user interaction with elements
    * while maintaining the d3 simulations physics
    */
    graph!: ForceDirectedGraph;    
    node_focused$!: SimulationNodeDatum;

    constructor(
        private store: Store<{ node_focused: SimulationNodeDatum }>,
        ) {
        this.store.select(selectFocusedNode).subscribe({
            next: (node) => this.node_focused$ = node
        });
    }

    /** The interactable graph we will simulate in this article
    * This method does not interact with the document, purely physical calculations with d3
    */
    getForceDirectedGraph(nodes: SimulationNodeDatum[], links: Link[], options: { width: number, height: number} ) {
        this.graph = new ForceDirectedGraph(nodes, links, options);
        return this.graph;
    }

    addConnectedNode() {
        let node_target = this.graph.addNode();        

        // if we would put node_source as a parameter into addLink() instead of the index,
        // a link to the focused node is created with old positioning. This is reflected in a link, fixed to the target
        // but not to the source, thus in a state of limbo
        let node_source_index = this.node_focused$.index;
        this.graph.addLink(node_source_index as any, node_target.sim);
    }
}