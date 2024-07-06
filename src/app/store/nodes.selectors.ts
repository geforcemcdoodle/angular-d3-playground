import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Node } from '../d3/models/node';
import { ShowAtPoint } from '../interfaces/showAtPoint';
import { SimulationNodeDatum } from 'd3';

export const selectNodes = createFeatureSelector<ReadonlyArray<Node>>('nodes');
export const showSunburst = createSelector<any>('show_sunburst');
export const selectFocusedNode = createFeatureSelector<SimulationNodeDatum>('node_focused');