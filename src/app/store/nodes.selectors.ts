import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectNodes = createFeatureSelector<string>('nodes');
export const showSunburst = createSelector<boolean>('show_sunburst');
