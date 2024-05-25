import { Component, Input } from '@angular/core';
import { ForceDirectedGraph } from '../../models/force-directed-graph';
import { Node } from '../../models/node';
import { Link } from '../../models/link';
import { D3Service } from '../../d3.service';


@Component({
  selector: 'd3-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class D3GraphComponent {
  graph!: ForceDirectedGraph;

  constructor(
    private d3Service: D3Service,
  ) {
  }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph([], [], this.options);
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  _options = { width: 600, height: 400 };

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}
