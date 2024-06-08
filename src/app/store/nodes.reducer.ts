import { createReducer, on } from '@ngrx/store';
import { 
  NodesActions, ShowSunburst
} from './nodes.actions';

export const initialState: string = '';
export const initialSunburstState: boolean = false;

export const nodesReducer = createReducer(
  initialState,  
  on(NodesActions.addNode, (state, { node }) => {
    console.log(node); 
    return node;
  }),
);

export const nodesMenuReducer = createReducer(
  initialSunburstState,
  on(ShowSunburst, state => true),
);