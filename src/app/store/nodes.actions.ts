import { createActionGroup, props } from '@ngrx/store';

export const NodesActions = createActionGroup({
  source: 'Nodes',
  events: {
    'Add Node': props<{ node: string }>(),
  },
});