import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ActionReducerMap, provideStore } from '@ngrx/store';
import { heroReducer } from './state/hero.reducer';
import { provideEffects } from '@ngrx/effects';
import { Hero } from './hero.model';
import { HeroesEffects } from './state/hero.effects';

export interface AppState {
    heroes: Hero[]
}

export const reducers: ActionReducerMap<AppState> = {
    heroes: heroReducer
}

export const effects = [
    HeroesEffects
]

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideStore(reducers),
        provideEffects(effects)
    ]
};
