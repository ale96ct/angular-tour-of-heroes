import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Hero } from "../../hero.model";

export const heroesActions = createActionGroup({
    source: 'Heroes',
    events: {
        'Load Heroes': emptyProps,
        'Load Heroes Success': props<{ heroes: Hero[] }>(),
        'Add Hero': props<{ hero: Hero }>(),
        'Add Hero Success': props<{ hero: Hero }>(),
        'Update Hero': props<{ hero: Hero }>(),
        'Update Hero Success': props<{ hero: Hero }>(),
        'Delete Hero': props<{ heroId: number }>(),
        'Delete Hero Success': props<{ heroId: number }>(),
    }
});
