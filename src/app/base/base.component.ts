import { Component } from '@angular/core';
import { GraphComponent } from '../d3/visuals/graph/graph.component';
import { Node } from '../d3/models/node';


@Component({
  selector: 'app-base',
  standalone: true,
  imports: [GraphComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  nodes: Node[];
  
  constructor() {
    this.nodes = [
      {r:15, x: 100, y:100, id: 1},
      {r:15, x: 200, y:100, id: 2}
    ];
  }
}
