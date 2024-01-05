import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { HeroService } from '../../hero.service';
import { heroesActions } from './hero.actions';

@Injectable()
export class HeroesEffects {

    constructor(
        private actions$: Actions,
        private heroService: HeroService
    ) {}

    loadHeroes$ = createEffect(() => this.actions$.pipe(
        ofType(heroesActions.loadHeroes),
        switchMap(() => this.heroService.getHeroes().pipe(
            map(heroes => heroesActions.loadHeroesSuccess({ heroes })),
            catchError(() => EMPTY)
        ))
    ));

    addHero$ = createEffect(() => this.actions$.pipe(
        ofType(heroesActions.addHero),
        switchMap((props) => this.heroService.addHero(props.hero).pipe(
            map(hero => heroesActions.addHeroSuccess({ hero })),
            catchError(() => EMPTY)
        ))
    ));

    updateHero$ = createEffect(() => this.actions$.pipe(
        ofType(heroesActions.updateHero),
        switchMap((props) => this.heroService.updateHero(props.hero).pipe(
            map(hero => heroesActions.updateHeroSuccess({ hero })),
            catchError(() => EMPTY)
        ))
    ));

    deleteHero$ = createEffect(() => this.actions$.pipe(
        ofType(heroesActions.deleteHero),
        switchMap(props => this.heroService.deleteHero(props.heroId).pipe(
            map((heroId) => heroesActions.deleteHeroSuccess({ heroId })),
            catchError(() => EMPTY)
        ))
    ));
}
