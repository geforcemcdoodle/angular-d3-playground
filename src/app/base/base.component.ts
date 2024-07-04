import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GraphComponent } from '../d3/visuals/graph/graph.component';
import { SunburstComponent } from '../d3/visuals/sunburst/sunburst.component';
import { Node, Link } from '../d3/models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { ShowAtPoint } from '../interfaces/showAtPoint';
import { GraphSummaryComponent } from '../menus/graph-summary/graph-summary.component';
import { Indicator, IndicatorAnimations } from '../gestures/pan.indicator';
import 'hammerjs';


@Component({
  selector: 'app-base',
  standalone: true,
  imports: [ 
    GraphComponent,
    SunburstComponent,
    NgIf,
    NgStyle,
    CommonModule,
    GraphSummaryComponent
    ],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css', '../gestures/gestures.css']
})
export class BaseComponent {
  showSunburstAtPoint$!: Observable<ShowAtPoint>;
  currentStyles: Record<string, string> = {};
  indicators!: any;

  constructor(
    private store: Store<{show_sunburst: ShowAtPoint}>,
    ) {
    this.indicators = new Indicator();
  }

  ngOnInit() {
    let _this = this;
    this.showSunburstAtPoint$ = this.store.select('show_sunburst');
    this.showSunburstAtPoint$.subscribe({
      next (z) {
        _this.setCurrentStyles(z.x, z.y);
      }
    });
  }

  setCurrentStyles(x: number, y: number) {
    this.currentStyles = {
      'position': 'absolute',
      'left': `${x-150+6}px`,
      'top': `${y-150+6}px`,
    };
  }

  onPan(evt: any) {
      const indicator = this.indicators.display(
      evt.center.x,
      evt.center.y,
      5
    );
    this.indicators.hide(indicator);
  }
}