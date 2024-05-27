import { EventEmitter } from '@angular/core';
import { Node } from './node';
import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -1
}

export class ForceDirectedGraph {
  public simulation!: d3.Simulation<any, any>;

  public nodes: Node[] = [];

  constructor(nodes: Node[], links: any, options: { width: number, height: number }) {
    this.nodes = nodes;

    this.initSimulation(options);
  }

  
  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.nodes(this.nodes);
  }

  initSimulation(options: any) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      this.simulation = d3.forceSimulation()
        .force('charge',
          d3.forceManyBody()
            .strength((d: any) => FORCES.CHARGE * d['r'])
        )
        .force('collide',
          d3.forceCollide()
            .strength(FORCES.COLLISION)
            .radius((d: any) => d['r'] + 5).iterations(2)
        );

      this.initNodes();
    }

    /** Updating the central force of the simulation */
    this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}