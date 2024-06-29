import { createReducer, on } from '@ngrx/store';
import { 
  NodesActions, ShowSunburst
} from './nodes.actions';
import { ShowAtPoint } from '../interfaces/showAtPoint';
import { Node } from '../d3/models/node';

export const initialState: ReadonlyArray<Node> = [];
export const initialSunburstState: ShowAtPoint = { show: false, x: 0, y: 0 };
export const initialSelectedNodeState: Node = new Node(0);

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