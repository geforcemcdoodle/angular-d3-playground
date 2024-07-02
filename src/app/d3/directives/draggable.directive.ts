import { Directive, Input, ElementRef } from '@angular/core';
import { Node } from '../models/node';
import { ForceDirectedGraph } from '../models/force-directed-graph';
import { D3Service } from '../d3.service';
// import * as d3 from 'd3';
import { SimulationNodeDatum, select, drag } from 'd3';

@Directive({
    selector: '[draggableNode]',
    standalone: true
})
export class DraggableDirective {
    @Input('draggableNode') draggableNode!: d3.SimulationNodeDatum;
    @Input('draggableInGraph') draggableInGraph!: ForceDirectedGraph;

    constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.draggableInGraph);
    }

    applyDraggableBehaviour(element: any, node: SimulationNodeDatum, graph: ForceDirectedGraph) {
        const d3element = select(element);

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

        d3element.call(drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    }
}