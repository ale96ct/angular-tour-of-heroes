import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Hero } from '../hero.model';
import { RouterModule } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { Observable } from 'rxjs';
import { AppState } from '../app.config';
import { Store } from '@ngrx/store';
import { getDashboardHeroes, getHeroes } from '../state/hero.selectors';
import { heroesActions } from '../state/hero.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  heroes$: Observable<Hero[]>;

  constructor(private store: Store<AppState>) {
    this.heroes$ = store.select(getDashboardHeroes);
  }

  ngOnInit() {
    this.store.dispatch(heroesActions.loadHeroes())
  }
}
