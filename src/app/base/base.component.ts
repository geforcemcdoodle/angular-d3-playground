import { Component } from '@angular/core';
import { GraphComponent } from '../d3/visuals/graph/graph.component';
import { SunburstComponent } from '../d3/visuals/sunburst/sunburst.component';
import { Node, Link } from '../d3/models';


@Component({
  selector: 'app-base',
  standalone: true,
  imports: [GraphComponent, SunburstComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  nodes: Node[];
  links: Link[];
  
  constructor() {
    this.nodes = [
      new Node(1), new Node(2,150), new Node(3,200), new Node(4,450),
      new Node(5,100,150), new Node(6,100,200)
    ];
    this.links = [
      new Link(this.nodes[0], this.nodes[1]),
      new Link(this.nodes[2], this.nodes[3])
    ];
  }
}
