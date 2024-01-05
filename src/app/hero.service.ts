import { Injectable } from '@angular/core';
import { Hero } from './hero.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppState } from './app.config';
import { Store } from '@ngrx/store';
import { messagesActions } from './state/message.actions';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = `${environment.api}/heroes`;
  private httpOptions = {
    headers: new HttpHeaders({ 'ContentType': 'application/json' })
  }

  constructor(
    private store: Store<AppState>,
    private http: HttpClient
  ) {}

  private printMessage(message: string) {
    this.store.dispatch(messagesActions.addMessage({ message }))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.printMessage(`${operation} failed: ${error.message}`)
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.printMessage('Heroes have been fetched')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(_ => this.printMessage(`Hero with id = ${id} has been fetched`)),
      catchError(this.handleError<Hero>(`getHero with id = ${id}`))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.heroesUrl}/${hero.id}`, hero, this.httpOptions).pipe(
      tap(_ => this.printMessage(`Hero with id = ${hero.id} has been updated`)),
      catchError(this.handleError<Hero>(`updateHero with id = ${hero.id}`))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(newHero => this.printMessage(`Hero with id = ${newHero.id} has been added`)),
      catchError(this.handleError<Hero>(`addHero with name = ${hero.name}`))
    )
  }

  deleteHero(id: number): Observable<number> {
    this.http.delete<{}>(`${this.heroesUrl}/${id}`, this.httpOptions).pipe(
      tap(() => this.printMessage(`Hero with id = ${id} has been deleted`)),
      catchError(this.handleError<Hero>(`deleteHero with id = ${id}`))
    ).subscribe()
    return of(id)
  }

  searchHeroes(name: string): Observable<Hero[]> {
    name = name.trim();
    if (!name) {
      return of([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name_like=${name}`).pipe(
      tap(heroes => heroes.length ? 
          this.printMessage(`Found heroes matching "${name}"`) :
          this.printMessage(`No heroes matching "${name}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
