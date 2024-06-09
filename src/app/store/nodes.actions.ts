import { createActionGroup, props, createAction } from '@ngrx/store';
import { ShowAtPoint } from '../interfaces/showAtPoint';


export const NodesActions = createActionGroup({
  source: 'Nodes',
  events: {
    'Add Node': props<{ node: string }>(),
  },
});

export const ShowSunburst = createAction(
  'ShowSunburst',
  props<{showAtPoint: ShowAtPoint}>()
);