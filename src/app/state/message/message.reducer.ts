import { createReducer, on } from "@ngrx/store";
import { messagesActions } from "./message.actions";

export const initialeState: string[] = [];

export const messageReducer = createReducer(
    initialeState,
    on(messagesActions.addMessage, (state, { message } ) => [...state, message]),
    on(messagesActions.clearMessages, (_state) => [])
)
