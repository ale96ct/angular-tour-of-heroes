import { AppState } from '../app.config';

export const getMessages = (state: AppState) => state.messages;

export const isEmpty = (state: AppState) => state.messages.length === 0;
