import { Component } from '@angular/core';
import { NodeVisualComponent } from '../d3/visuals/shared/node-visual.component';
import { Node } from '../d3/models/node';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [NodeVisualComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  node: Node;
  
  constructor() {
    this.node = { r:15, x: 100, y:100, id: 1};
  }
}
