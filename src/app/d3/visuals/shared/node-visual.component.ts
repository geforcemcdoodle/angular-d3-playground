import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Node } from '../../models';
import { NodesActions, ShowSunburst } from '../../../store/nodes.actions';

@Component({
  selector: '[nodeVisual]',
  standalone: true,
  templateUrl: './node-visual.component.svg',  
})
export class NodeVisualComponent {
  @Input('node') node!: Node;

  constructor(
    private store: Store
  ) {  }

  onClick() {
    this.store.dispatch(ShowSunburst());
  }
}
