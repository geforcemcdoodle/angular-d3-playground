import { createReducer, on } from '@ngrx/store';
import { 
  NodesActions,
} from './nodes.actions';

export const initialState: string = '';

export const nodesReducer = createReducer(
  initialState,  
  on(NodesActions.addNode, (state, { node }) => {
    console.log(node); 
    return node;
  }),
);