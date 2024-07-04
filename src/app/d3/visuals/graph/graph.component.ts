import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import { ForceDirectedGraph, Node, Link } from '../../models';
import { NodeVisualComponent } from '../shared/node-visual/node-visual.component';
import { LinkVisualComponent } from '../shared/link-visual/link-visual.component';
import { D3Service } from '../../d3.service';
import { ZoomableDirective, DraggableDirective } from '../../directives';
import { NodesActions } from '../../../store/nodes.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'graph',
  standalone: true,
  imports: [NodeVisualComponent, LinkVisualComponent, ZoomableDirective, DraggableDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graph.component.html',  
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  nodes!: Node[];
  links: Link[] = [];

  graph!: ForceDirectedGraph;
  _options: { width: number, height: number } = { width: 400, height: 300 };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.graph.initSimulation(this.options);
  }


  constructor(
    private ref: ChangeDetectorRef,
    private d3Service: D3Service,
    private store: Store<{ nodes: Node[] }>
  ) {
    this.nodeInit();
  }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */

    let nodes_sim = this.nodes.map(({ sim }) => sim);
    this.graph = this.d3Service.getForceDirectedGraph(nodes_sim, this.links, this.options);
    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d: any) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  nodeInit() {
    this.nodes = [ new Node(1) ];
    this.store.dispatch(
      NodesActions.addNode({
        node: structuredClone(this.nodes[0])
      }
    ));
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}
