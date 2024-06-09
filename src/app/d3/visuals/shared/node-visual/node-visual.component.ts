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
    this.store.dispatch(ShowSunburst( { showAtPoint: {show: true, x: 600, y: 600} } ));
    // console.log(this.elementRef.nativeElement);
    // console.log(this.node.x);
  }
}
