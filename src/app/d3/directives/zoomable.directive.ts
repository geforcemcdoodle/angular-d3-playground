import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { D3Service } from '../d3.service';
import * as d3 from 'd3';

@Directive({
    selector: '[zoomableOf]',
    standalone: true
})
export class ZoomableDirective implements OnInit {
    @Input('zoomableOf') zoomableOf!: HTMLElement;

    constructor(private d3Service: D3Service, private _element: ElementRef) {}

    ngOnInit() {
        this.applyZoomableBehaviour(this.zoomableOf, this._element.nativeElement);
    }

    applyZoomableBehaviour(svgElement: any, containerElement: any) {
        let svg, container, zoomed, zoom;

        svg = d3.select(svgElement);
        container = d3.select(containerElement);

        zoomed = (evt: any) => {
            // const transform = d3.event.transform;
            const transform = evt.transform;
            container.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
        }

        zoom = d3.zoom().translateExtent([[0, 0], [window.innerWidth, window.innerHeight]]).on("zoom", zoomed);
        svg.call(zoom);
    }
}
