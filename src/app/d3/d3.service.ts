import { Injectable, OnInit } from '@angular/core';
import { ForceDirectedGraph } from './models/force-directed-graph';
import { Link } from './models/link';
import { Node } from './models/node';
import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3';
import { Store } from '@ngrx/store';
import { selectFocusedNode } from '../store/nodes.selectors';
import { NodesActions } from '../store/nodes.actions';


@Injectable({
  providedIn: 'root',
})
export class D3Service {
    nodes!: Node[];
    links!: Link[];

    /** This service will provide methods to enable user interaction with elements
    * while maintaining the d3 simulations physics
    */
    graph!: ForceDirectedGraph;    
    node_focused$!: SimulationNodeDatum;

    constructor(
        private store: Store<{ node_focused: SimulationNodeDatum, nodes: Node[] }>,
        ) {
        this.store.select(selectFocusedNode).subscribe({
            next: (node) => this.node_focused$ = { ...node }
        });
        this.nodesInit();
        this.linksInit();
    }

    /** The interactable graph we will simulate in this article
    * This method does not interact with the document, purely physical calculations with d3
    */
    getForceDirectedGraph(options: { width: number, height: number} ) {
        let nodes_sim = this.getSimNodes();
        this.graph = new ForceDirectedGraph(nodes_sim, this.links, options);
        return this.graph;
    }

    getNodes() {
        return [...this.nodes];
    }

    getLinks() {
        return [...this.links];
    }
    getSimNodes() {
        return this.nodes.map(({ sim }) => sim);
    }

    createNodeWithParent(parent: Node) {
        let id_new = this.nodes.length + 1;
        let node_new = new Node(id_new);
        node_new.parent = parent;

        return node_new;
    }

    addConnectedNode() {
        // if we would put node_source as a parameter into addLink() instead of the index,
        // a link to the focused node is created with old positioning. This is reflected in a link, fixed to the target
        // but not to the source, thus in a state of limbo
        let node_focused_index = this.node_focused$.index;
        let node_focused = this.nodes[node_focused_index as any];
        let node_new = this.createNodeWithParent(node_focused as any);

        // completed by index
        node_new.sim.index = this.graph.addNode(node_new.sim);

        this.setNodes(node_new);
        this.graph.addLink(node_focused_index as any, node_new.sim);

        this.store.dispatch(
          NodesActions.addNode({
            node: structuredClone(node_new)
          }
        ));
    }    

    nodesInit() {
        this.nodes = [ new Node(1) ];
        this.store.dispatch(
          NodesActions.addNode({
            node: structuredClone(this.nodes[0])
          })
        );
    }

    linksInit() {
        this.links = [];
    }

    setNodes(node_new: Node) {
        this.nodes = [...this.nodes, node_new];
    }
}