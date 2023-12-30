import { Injectable } from '@angular/core';
import { Hero } from './hero.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = `${environment.api}/heroes`;
  private httpOptions = {
    headers: new HttpHeaders({ 'ContentType': 'application/json' })
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.messageService.add(`${operation} failed: ${error.message}`)
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.messageService.add('Heroes have been fetched')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(_ => this.messageService.add(`Hero with id = ${id} has been fetched`)),
      catchError(this.handleError<Hero>(`getHero with id = ${id}`))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.heroesUrl}/${hero.id}`, hero, this.httpOptions).pipe(
      tap(_ => this.messageService.add(`Hero with id = ${hero.id} has been updated`)),
      catchError(this.handleError<Hero>(`updateHero with id = ${hero.id}`))
    )
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(newHero => this.messageService.add(`Hero with id = ${newHero.id} has been added`)),
      catchError(this.handleError<Hero>(`addHero with name = ${hero.name}`))
    )
  }

  deleteHero(id: number): Observable<Hero>{
    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions).pipe(
      tap(newHero => this.messageService.add(`Hero with id = ${id} has been deleted`)),
      catchError(this.handleError<Hero>(`deleteHero with id = ${id}`))
    )
  }

  searchHeroes(name: string): Observable<Hero[]> {
    name = name.trim();
    if (!name) {
      return of([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name_like=${name}`).pipe(
      tap(heroes => heroes.length ? 
          this.messageService.add(`Found heroes matching "${name}"`) :
          this.messageService.add(`No heroes matching "${name}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
