import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectNodes } from '../../store/nodes.selectors';
import { Node } from '../../d3/models';
import { SimulationNodeDatum } from 'd3';

@Component({
  selector: 'app-graph-summary',
  standalone: true,
  imports: [],
  templateUrl: './graph-summary.component.html',
  styleUrl: './graph-summary.component.css'
})
export class GraphSummaryComponent {
  nodes$!: Node[];

  constructor(
    private store: Store<{nodes: Node[]}>,
  ) {
    let _this = this;
    this.store.select(selectNodes).subscribe({
      next (z: any) { _this.nodes$ = z;}
    });
  }
}