import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('Heroes have been fetched');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = of(HEROES.find(hero => hero.id === id)!);
    this.messageService.add(`Hero with id = ${id} has been fetched`);
    return hero;
  }
}
