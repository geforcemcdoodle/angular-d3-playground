import { createActionGroup, props } from '@ngrx/store';

export const MenuActions = createActionGroup({
  source: 'MenuChoices',
  events: {
    'Add Node': props<{ node: string }>(),
  },
});