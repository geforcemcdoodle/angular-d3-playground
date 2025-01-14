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
  links!: Link[];

  graph!: ForceDirectedGraph;
  _options: { width: number, height: number } = { width: 400, height: 300 };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.graph.initSimulation(this.options);
  }


  constructor(
    private ref: ChangeDetectorRef,
    private d3Service: D3Service,    
  ) {
  }

  ngOnInit() {
    this.graph = this.d3Service.getForceDirectedGraph(this.options);

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d: any) => {
      this.ref.markForCheck();
      // how bad is this for performance?
      this.nodes = this.d3Service.getNodes();
      this.links = this.d3Service.getLinks();
    });
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
