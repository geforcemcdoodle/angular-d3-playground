import { Component, ElementRef, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Node } from '../../../models';
import { ShowSunburst, NodesActions } from '../../../../store/nodes.actions';
import { Indicator, IndicatorAnimations } from '../../../../gestures/press.indicator';


@Component({
  selector: '[nodeVisual]',
  standalone: true,
  templateUrl: './node-visual.component.svg',  
  styleUrls: ['./node-visual.component.css', '../../../../gestures/gestures.css'],
})
export class NodeVisualComponent {
  indicators!: any;

  @Input('node') node!: Node;

  constructor(
    private store: Store,
    private elementRef: ElementRef
  ) {
    this.indicators = new Indicator();
  }

  onPress(evt: any) {
    let _this = this;
    const gestureIndicator = this.indicators.display(
      evt.center.x,
      evt.center.y,
      50
    );

    let time = 0;
    gestureIndicator.interval = setInterval(() => {
      gestureIndicator.size += 2;
      if (gestureIndicator.size === 100) {
        this.store.dispatch(
          ShowSunburst({
            showAtPoint: {
              show: true,
              x: _this.node.sim.x as any,
              y: _this.node.sim.y as any
            }
          }
        ));
      }
    }, 10);
  }

  onPressUp(evt: any) {
    const indicator = this.indicators.gestureIndicators[0];
    if (indicator) {
      clearInterval(indicator.interval);
      this.indicators.hide(indicator);
    }
  }

  onClick() {
    // without this shallow copy ( doing { node: this.node}), we run into a 'fx is read-only' error loop
    let node = {...this.node};
    this.store.dispatch(
      NodesActions.selectNode({ node: node })
    );
  }
}
