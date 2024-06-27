import { createActionGroup, props, createAction } from '@ngrx/store';
import { ShowAtPoint } from '../interfaces/showAtPoint';
import { Node } from '../d3/models/node';


export const NodesActions = createActionGroup({
  source: 'Nodes',
  events: {
    'Add Node': props<{ node: Node }>(),
  },
});

export const ShowSunburst = createAction(
  'ShowSunburst',
  props<{showAtPoint: ShowAtPoint}>()
);