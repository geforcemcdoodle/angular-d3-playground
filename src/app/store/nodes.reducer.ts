import { createReducer, on } from '@ngrx/store';
import { 
  NodesActions, ShowSunburst
} from './nodes.actions';
import { ShowAtPoint } from '../interfaces/showAtPoint';
import { Node } from '../d3/models/node';
import { SimulationNodeDatum } from 'd3';

export const initialState: ReadonlyArray<Node> = [];
export const initialSunburstState: ShowAtPoint = { show: false, x: 0, y: 0 };
export const initialSelectedNodeState: SimulationNodeDatum = { 
  index : 0,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  fx: null,
  fy: null
};

export const nodesReducer = createReducer(
  initialState,  
  on(NodesActions.addNode, (state, { node }) => {
    return [...state, node];
  }),
);

export const nodesMenuReducer = createReducer(
  initialSunburstState,
  on(ShowSunburst, (state, {showAtPoint}) => {
    return showAtPoint;
  }),
);

export const nodesSelectionReducer = createReducer(
  initialSelectedNodeState,  
  on(NodesActions.selectNode, (state, { node }) => {    
    return node;
  }),
);