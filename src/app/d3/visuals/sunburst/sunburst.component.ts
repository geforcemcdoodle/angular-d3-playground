import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as d3 from 'd3';
import { ShowSunburst, NodesActions } from '../../../store/nodes.actions';
import { Node } from '../../models/node';
import { D3Service } from '../../d3.service';


@Component({
  selector: 'app-sunburst',
  standalone: true,
  imports: [],
  templateUrl: './sunburst.component.svg',
  styleUrl: './sunburst.component.css'
})
export class SunburstComponent {
  nodeData: any;
  // Variables
  width = 500;
  height = 500;
  radius = Math.min(this.width, this.height) / 2;
  color = d3.scaleOrdinal(d3.schemeCategory10); 

  constructor(
    private store: Store,
    private d3Service: D3Service
    ) {
    this.nodeData = {
      "name": "TOPICS", "children": [
        {
          "name": "add",
          "children": [{"name": "delete", "size": 4}, {"name": "move", "size": 4}]
        },
        {
          "name": "Topic B",
          "children": [{"name": "Sub B1", "size": 3}, {"name": "Sub B2", "size": 3}, {
              "name": "Sub B3", "size": 3}]
        },
        {
          "name": "Topic C",
          "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
        },
        {
          "name": "",
          "children": [{"name": "", "size": 1}]
        }
      ]
    };
  }

  ngOnInit() {
    let _this = this;
    var vWidth = 300;
    var vHeight = 300;
    var vRadius = Math.min(vWidth, vHeight) / 2;
    var vColor = d3.scaleOrdinal(d3.schemeCategory10);

    // Prepare our physical space
    var g = d3.select('svg')
        .attr('width', vWidth).attr('height', vHeight)
        .append('g')
        .attr('transform', 'translate(' + vWidth / 2 + ',' + vHeight / 2 + ')');

    // Declare d3 layout
    var vLayout = d3.partition().size([2 * Math.PI, vRadius]);
    var vArc = d3.arc()
        .startAngle(function (d: any) { return d.x0; })
        .endAngle(function (d: any) { return d.x1; })
        .innerRadius(function (d: any) { return d.y0; })
        .outerRadius(function (d: any) { return d.y1; });
    
    drawSunburst(this.store, this.d3Service, this.nodeData);


    /**
     * Draw our sunburst
     * @param {object} data - Hierarchical data
     */
    function drawSunburst(store: any, d3Service: any, data: any) {
        // Layout + Data
        let vRoot = d3.hierarchy(data).sum(function (d) { return d.size});
        let vNodes = vRoot.descendants();
        vLayout(vRoot);
        let vSlices = g.selectAll('g').data(vNodes).enter().append('g');
        vSlices.style("cursor", "pointer")
          .on("click", clicked);

        function clicked(event: any, p: any) {
          switch (p.data.name) {
          case "":
            store.dispatch(
              ShowSunburst({
                showAtPoint: {
                  show: false,
                  x: 0,
                  y: 0 
                }
              }
            ));
            break;
          case "add":
            d3Service.addConnectedNode();
            break;
          }
        }

        // Draw on screen
        vSlices.append('path')
          .attr('display', function (d) { return d.depth ? null : 'none'; })
          .attr('d', <any>vArc)
          .style('stroke', '#fff')
          .style('fill', function (d) { return vColor((d.children ? d : d.parent)!.data.id); });

        // Add text
        vSlices.append('text')
          .filter(function(d: any) { return d!.parent; })
          .attr('transform', function(d) {
              return 'translate(' + <any>vArc.centroid(d as any) + ') rotate(' + <any>computeTextRotation(d) + ')'; })
          .attr('dx', '-20')
          .attr('dy', '.5em')
          .text(function(d) { return d!.data.name });
    }

    function computeTextRotation(d: any) {
      let angle = (d.x0 + d.x1) / Math.PI * 90;

      // Avoid upside-down labels
      return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
    }
  } 
}