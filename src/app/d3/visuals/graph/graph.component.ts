import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import { ForceDirectedGraph, Node, Link } from '../../models';
import { NodeVisualComponent } from '../shared/node-visual.component';
import { LinkVisualComponent } from '../shared/link-visual.component';

@Component({
  selector: 'graph',
  standalone: true,
  imports: [NodeVisualComponent, LinkVisualComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graph.component.html',  
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input('nodes') nodes!: Node[];
  @Input('links') links!: Link[];

  graph!: ForceDirectedGraph;
  private _options: { width: number, height: number } = { width: 800, height: 600 };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.graph.initSimulation(this.options);
  }


  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    // this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
    this.graph = new ForceDirectedGraph(this.nodes, [], this.options);
    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}
