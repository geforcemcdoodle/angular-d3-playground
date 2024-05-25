import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import { TopicNode } from 'src/app/models/topic.model';
import * as d3 from 'd3';


export class ForceDirectedGraph {
    public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
    public simulation!: d3.Simulation<any, any>;

    public nodes: any;
    public links: any;
    public nodesArray: any;
    public linksArray: any;
    public g_nodes: any;
    public g_links: any;
    public svg: any;

    constructor(nodes: Node[], links: Link[], options: { width: number, height: number }) {
        this.nodes = nodes;
        this.links = links;
        
        this.initSimulation(options);
    }

    initSimulation(options: any) {
        let _this = this;
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }

        /** Creating the simulation */
        if (!this.simulation) {
            // Creating the force simulation and defining the charges
            this.simulation = d3.forceSimulation()
                .force("charge", d3.forceManyBody())
                .force("link", d3.forceLink().id((d: any) =>d.id))
                .force("x", d3.forceX())
                .force("y", d3.forceY())
                .on("tick", this.ticked);

            // Set the position attributes of links and nodes each time the simulation ticks.
            // Create the SVG container.
            this.svg = d3.select("svg")
                .attr("width", options.width)
                .attr("height", options.height)
                .attr("viewBox", [-options.width / 2, -options.height / 2, options.width, options.height])
                .attr("style", "max-width: 100%; height: auto;");

            // Add a line for each link, and a circle for each node.
            this.g_links = this.svg.append("g")
                .attr("class", "links")
                .selectAll("line");
            this.g_nodes = this.svg.append("g")
                .attr("class", "nodes")
                .selectAll("circle");

                     
            // Add a drag behavior.
            this.g_nodes.call(d3.drag()
                .on("start", this.dragstarted)
                .on("drag", this.dragged)
                .on("end", this.dragended));

            // Terminate the force layout when this cell re-runs.
            /*invalidation.then(() => _this.simulation.stop());*/
        }
    }
    // Reheat the simulation when drag starts, and fix the subject position.
    dragstarted = (event: any) => {
        let _this = this;
        if (!event.active) _this.simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }
    // Update the subject (dragged node) position during drag.
    dragged = (event: any) => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }
    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    dragended = (event: any) => {
        let _this = this;
        if (!event.active) _this.simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
    update(nodes: any, links: any) {

        // Make a shallow copy to protect against mutation, while
        // recycling old nodes to preserve position and velocity.
        const old = new Map(this.g_nodes.data().map((d: any) => [d.id, d]));
        nodes = nodes.map((d: any) => Object.assign(old.get(d.id) || {}, d));
        links = links.map((d: any) => Object.assign({}, d));

        this.simulation.nodes(nodes);
        this.simulation.force("link", d3.forceLink(links).id((d: any) =>d.id))
        this.simulation.alpha(1).restart();

        const color = d3.scaleOrdinal(d3.schemeCategory10);
        this.g_nodes = this.g_nodes
            .data(nodes, (d: any) => d.id)
            .join((enter: any) => enter.append("circle")
            .attr("r", 8)
            .attr("fill", (d: any) => color(d.id)));

        this.g_links = this.g_links
            .data(links, (d: any) => `${d.source.id}\t${d.target.id}`)
            .join("line");
    }
    ticked = () => {
        this.g_nodes
            .attr("cx", (d: any) => { return d.x; })
            .attr("cy", (d: any) => { return d.y; })
        this.g_links        
            .attr("x1", (d: any) => { return d.target.x; })
            .attr("y1", (d: any) => { return d.target.y; })
            .attr("x2", (d: any) => { return d.source.x; })
            .attr("y2", (d: any) => { return d.source.y; });
    }
    addNode = (node: TopicNode) => {
        node.id = this.nodes.length;
        this.nodes.push(node);
        this.update(this.nodes, this.links);
    }
}