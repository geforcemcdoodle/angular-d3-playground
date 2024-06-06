import { Component, Input } from '@angular/core';
import { Node } from '../../models';

@Component({
  selector: '[nodeVisual]',
  standalone: true,
  templateUrl: './node-visual.component.svg',  
})
export class NodeVisualComponent {
  @Input('node') node!: Node;

  onClick() {
    console.log("sdd");
  }
}
