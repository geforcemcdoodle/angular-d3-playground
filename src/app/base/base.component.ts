import { Component } from '@angular/core';
import { GraphComponent } from '../d3/visuals/graph/graph.component';
import { Node, Link } from '../d3/models';


@Component({
  selector: 'app-base',
  standalone: true,
  imports: [GraphComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  nodes: Node[];
  links: Link[];
  
  constructor() {
    this.nodes = [
      new Node(1), new Node(2,150), new Node(3,200), new Node(4,250)
    ];
    this.links = [
      new Link(this.nodes[0], this.nodes[1]),
      new Link(this.nodes[2], this.nodes[3])
    ];
  }
}
