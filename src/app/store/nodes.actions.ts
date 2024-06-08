import { createActionGroup, props, createAction } from '@ngrx/store';

export const NodesActions = createActionGroup({
  source: 'Nodes',
  events: {
    'Add Node': props<{ node: string }>(),
    // 'Show Sunburst': props(),
  },
});

export const ShowSunburst = createAction('ShowSunburst');