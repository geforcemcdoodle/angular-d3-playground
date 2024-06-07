import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { nodesReducer } from './store/nodes.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      nodes: nodesReducer
    })
  ]
};
