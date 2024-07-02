import { createActionGroup, props, createAction } from '@ngrx/store';
import { ShowAtPoint } from '../interfaces/showAtPoint';
import { Node } from '../d3/models/node';
import { SimulationNodeDatum } from 'd3';


export const NodesActions = createActionGroup({
  source: 'Nodes',
  events: {
    'Add Node': props<{ node: Node }>(),
    'Select Node': props<{ node: SimulationNodeDatum }>(),    
  },
});

export const ShowSunburst = createAction(
  'ShowSunburst',
  props<{showAtPoint: ShowAtPoint}>()
);