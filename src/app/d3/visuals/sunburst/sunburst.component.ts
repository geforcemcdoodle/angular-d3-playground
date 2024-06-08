import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as d3 from 'd3';

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
    ) {
    this.nodeData = {
      "name": "TOPICS", "children": [{
          "name": "Topic A",
          "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
      }, {
          "name": "Topic B",
          "children": [{"name": "Sub B1", "size": 3}, {"name": "Sub B2", "size": 3}, {
              "name": "Sub B3", "size": 3}]
      }, {
          "name": "Topic C",
          "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
      }]
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
    
    drawSunburst(this.nodeData);


    /**
     * Draw our sunburst
     * @param {object} data - Hierarchical data
     */
    function drawSunburst(data: any) {
        // Layout + Data
        var vRoot = d3.hierarchy(data).sum(function (d) { return d.size});
        var vNodes = vRoot.descendants();
        vLayout(vRoot);
        var vSlices = g.selectAll('g').data(vNodes).enter().append('g');

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
      var angle = (d.x0 + d.x1) / Math.PI * 90;

      // Avoid upside-down labels
      return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
      //return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
    }
  } 
}