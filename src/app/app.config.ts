import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { nodesReducer, nodesMenuReducer, nodesSelectionReducer } from './store/nodes.reducer';

import { HammerModule } from '@angular/platform-browser'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      nodes: nodesReducer,
      show_sunburst: nodesMenuReducer,
      node_focused: nodesSelectionReducer
    }),
    importProvidersFrom(HammerModule)
  ]
};
