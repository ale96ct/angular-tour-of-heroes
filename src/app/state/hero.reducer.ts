import { createReducer, on } from "@ngrx/store";
import { Hero } from "../hero.model"
import { heroesActions } from "./hero.actions";

export const initialeState: Hero[] = [];

export const heroReducer = createReducer(
    initialeState,
    on(heroesActions.loadHeroesSuccess, (_state, { heroes }) => heroes),
    on(heroesActions.addHeroSuccess, (state, { hero }) => [...state, hero]),
    on(heroesActions.updateHeroSuccess, (state, { hero }) => {
        const newState = state.filter((h) => h.id !== hero.id);
        newState.push(hero);
        return newState;
    }),
    on(heroesActions.deleteHeroSuccess, (state, { heroId }) => state.filter((hero) => hero.id !== heroId))
)
