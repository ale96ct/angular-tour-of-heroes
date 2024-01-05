import { AppState } from '../../app.config';

export const getHeroes = (state: AppState) => state.heroes;

export const getDashboardHeroes = (state: AppState) => state.heroes.slice(0, 5);
