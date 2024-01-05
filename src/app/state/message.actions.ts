import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const messagesActions = createActionGroup({
    source: 'Messages',
    events: {
        'Add Message': props<{ message: string }>(),
        'Clear Messages': emptyProps
    }
});
