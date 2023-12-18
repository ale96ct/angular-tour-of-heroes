import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent {

  @Input() hero?: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  } 
}
