import { Injectable } from '@angular/core';
import { ForceDirectedGraph } from './models/force-directed-graph';
import { Link } from './models/link';
import { Node } from './models/node';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class D3Service {
    /** This service will provide methods to enable user interaction with elements
    * while maintaining the d3 simulations physics
    */
   graph!: ForceDirectedGraph;

    constructor() {

    }

    applyZoomableBehaviour(svgElement: any, containerElement: any) {
        let svg, container, zoomed, zoom;

        svg = d3.select(svgElement);
        container = d3.select(containerElement);

        zoomed = (evt: any) => {
            // const transform = d3.event.transform;
            const transform = evt.transform;
            container.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
        }

        zoom = d3.zoom().on("zoom", zoomed);
        svg.call(zoom);
    }

    /** A method to bind a draggable behaviour to an svg element */
    applyDraggableBehaviour(element: any, node: Node, graph: ForceDirectedGraph) {
        const d3element = d3.select(element);

        // Reheat the simulation when drag starts, and fix the subject position.
        function dragstarted(event: any) {
          if (!event.active) graph.simulation.alphaTarget(0.3).restart();
          node.fx = event.subject.x;
          node.fy = event.subject.y;
        }

        // Update the subject (dragged node) position during drag.
        function dragged(event: any) {
          node.fx = event.x;
          node.fy = event.y;
        }

        // Restore the target alpha so the simulation cools after dragging ends.
        // Unfix the subject position now that it’s no longer being dragged.
        function dragended(event: any) {
          if (!event.active) graph.simulation.alphaTarget(0);
          node.fx = null;
          node.fy = null;

        }

        d3element.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    }

    /** The interactable graph we will simulate in this article
    * This method does not interact with the document, purely physical calculations with d3
    */
    getForceDirectedGraph(nodes: Node[], links: Link[], options: { width: number, height: number} ) {
        this.graph = new ForceDirectedGraph(nodes, links, options);
        return this.graph;
    }

    addConnectedNode() {
        this.graph.addNode();
        this.graph.addLink();
    }
}