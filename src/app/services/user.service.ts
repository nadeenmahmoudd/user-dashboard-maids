import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = 'https://reqres.in/api/users';
  private userCache = new Map<number, any>();
  private usersCache = new Map<number, any[]>();

  constructor( private _httpClient:HttpClient) { }


  getAllUsers(page: number): Observable<any> {
    if (this.usersCache.has(page)) {
      return of({ data: this.usersCache.get(page) as any[], total: 12 });
    }
    return this._httpClient.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      tap(response => this.usersCache.set(page, response.data)),
      catchError(error => {
        console.error(error);
        return of({ data: [], total: 0 });
      })
    );
  }

  getUser(id: number): Observable<{ data: any }> {
    if (this.userCache.has(id)) {
      return of({ data: this.userCache.get(id) as any });
    }
    return this._httpClient.get<{ data: any }>(`${this.apiUrl}/${id}`).pipe(
      tap(response => this.userCache.set(id, response.data)),
      catchError(error => {
        console.error(error);
        return of({ data: {} as any });
      })
    );
  }
}
