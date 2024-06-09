import { Component, ElementRef, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Node } from '../../../models';
import { NodesActions, ShowSunburst } from '../../../../store/nodes.actions';

@Component({
  selector: '[nodeVisual]',
  standalone: true,
  templateUrl: './node-visual.component.svg',  
  styleUrl: './node-visual.component.css',
})
export class NodeVisualComponent {
  @Input('node') node!: Node;

  constructor(
    private store: Store,
    private elementRef: ElementRef
  ) {  }

  onClick() {    
    this.store.dispatch(ShowSunburst( { showAtPoint: {show: true, x: this.node.x as any, y: this.node.y as any} } ));
  }
}
