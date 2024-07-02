export class Link implements d3.SimulationLinkDatum<d3.SimulationNodeDatum> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  value?: number;
  strength?: number;

  // must - defining enforced implementation properties
  source: d3.SimulationNodeDatum;
  target: d3.SimulationNodeDatum;

  constructor(source: d3.SimulationNodeDatum, target: d3.SimulationNodeDatum) {
    this.source = source;
    this.target = target;
  }
}
