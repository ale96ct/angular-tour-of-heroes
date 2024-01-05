import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ActionReducerMap, provideStore } from '@ngrx/store';
import { heroReducer } from './state/hero/hero.reducer';
import { provideEffects } from '@ngrx/effects';
import { Hero } from './hero.model';
import { HeroesEffects } from './state/hero/hero.effects';
import { messageReducer } from './state/message/message.reducer';

export interface AppState {
    heroes: Hero[],
    messages: string[]
}

export const reducers: ActionReducerMap<AppState> = {
    heroes: heroReducer,
    messages: messageReducer
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
