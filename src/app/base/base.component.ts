import { Component } from '@angular/core';
import { GraphComponent } from '../d3/visuals/graph/graph.component';
import { LinkVisualComponent } from '../d3/visuals/shared/link-visual/link-visual.component';
import { NodeVisualComponent } from '../d3/visuals/shared/node-visual.component';
import { Node, Link } from '../d3/models';


@Component({
  selector: 'app-base',
  standalone: true,
  imports: [GraphComponent, LinkVisualComponent, NodeVisualComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  nodes: Node[];
  links: Link[];
  
  constructor() {
    this.nodes = [      
      new Node(1),
      new Node(2,200)
    ];
    this.links = [
      new Link(this.nodes[0], this.nodes[1])
    ];
  }
}