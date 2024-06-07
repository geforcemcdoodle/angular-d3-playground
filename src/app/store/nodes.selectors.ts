import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectNodes = createFeatureSelector<string>('nodes');