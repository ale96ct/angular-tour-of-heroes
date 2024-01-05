import { Component } from '@angular/core';
import { Hero } from '../hero.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.config';
import { heroesActions } from '../state/hero/hero.actions';
import { getHeroes } from '../state/hero/hero.selectors';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  
  heroes$: Observable<Hero[]>;

  constructor(private store: Store<AppState>) {
    this.heroes$ = store.select(getHeroes);
  }

  ngOnInit() {
    this.store.dispatch(heroesActions.loadHeroes())
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.store.dispatch(heroesActions.addHero({ hero: { name } as Hero }));
  }

  delete(hero: Hero): void {
    this.store.dispatch(heroesActions.deleteHero({ heroId: hero.id }));
  }
}
