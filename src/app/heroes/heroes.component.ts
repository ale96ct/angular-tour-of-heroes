import { Component } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { HeroService } from '../hero.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
