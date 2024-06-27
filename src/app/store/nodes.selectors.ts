import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Node } from '../interfaces/node';

export const selectNodes = createFeatureSelector<ReadonlyArray<Node>>('nodes');
export const showSunburst = createSelector<boolean>('show_sunburst');
