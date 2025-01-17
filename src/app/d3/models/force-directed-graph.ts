import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -1
}

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<d3.SimulationNodeDatum, Link>> = new EventEmitter();
  public simulation!: d3.Simulation<d3.SimulationNodeDatum, Link>;

  public nodes: d3.SimulationNodeDatum[] = [];
  public links: Link[] = [];


  constructor(
    nodes: d3.SimulationNodeDatum[],
    links: Link[],
    options: { width: number, height: number },
  ) {
    this.nodes = nodes;
    this.links = links;

    this.initSimulation(options);
  }

  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.nodes(this.nodes);
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.force('links',
      d3.forceLink(this.links)
        .id((d: any) => d['id'])
        .strength(FORCES.LINKS)
    );
  }

  initSimulation(options: any) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;

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

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function () {
        ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();
    }

    /** Updating the central force of the simulation */
    this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }

  addNode(node_new: d3.SimulationNodeDatum) {
    // index is created
    this.nodes.push(node_new);

    this.simulation.nodes(this.nodes);
    this.simulation.alpha(1.0).restart();

    return node_new.index;
  }

  addLink(source_index: number, target: d3.SimulationNodeDatum) {
    let link_new = new Link(this.nodes[source_index], target);
    this.links.push(link_new);
    this.simulation.force('links',
      d3.forceLink(this.links)
        .id((d: any) => d['id'])
        .strength(FORCES.LINKS)
    );
    this.simulation.alpha(1.0).restart();
  }
}