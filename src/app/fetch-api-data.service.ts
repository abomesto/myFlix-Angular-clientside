import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://iyas-movies-d1500c6f9580.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

    // Making the api call for the user login endpoint
    public userLogin(userDetails: any): Observable<any> {
      console.log(userDetails);
      return this.http.post(apiUrl + 'login', userDetails).pipe(
        catchError(this.handleError)
      );
    }

      // Making the api call for the get all movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get one movie endpoint
  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    // Making the api call for the get one director endpoint
    getDirector(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/director/', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

      // Making the api call for the get one genre endpoint
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   /**
   * get one of the users
   * @param username
   * @returns the user on the user-profile component
   */
   getUser(): Observable<any> {
    const username = localStorage.getItem('Username');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
    
    public addFavMovie(favMovieId: string): Observable<any> {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.FavoriteMovies.push(favMovieId);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('fetch api: add fav movies called');
      console.log(favMovieId);
      console.log(`Add Fav Token: ${token}`);
      console.log(`Username: ${user.Username}`);
  
      return this.http
        .post<Response>(
          apiUrl + 'users/' + user.Username + '/movies/' + favMovieId,
          {},
          {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            }),
          }
        )
        .pipe(map(this.extractResponseData), catchError(this.handleError));
    }
  
    public deleteFavMovie(favMovieId: string): Observable<any> {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
  
      const index = user.FavoriteMovies.indexOf(favMovieId);
      console.log('index:', index);
  
      console.log(`Delete Fav Token: ${token}`);
  
      if (index > -1) {
        user.FavoriteMovies.splice(index, 1);
      }
      localStorage.setItem('user', JSON.stringify(user));
  
      return this.http
        .delete<Response>(
          apiUrl + 'users/' + user.Username + '/movies/' + favMovieId,
          {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            }),
          }
        )
        .pipe(map(this.extractResponseData), catchError(this.handleError));
    }
  
    public isFavMovies(favMovieId: string): boolean {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      // const token = localStorage.getItem('token');
      // return user.favoriteMovies.indeOf(favMovieId) >= 0;
      if (user) {
        return user.FavoriteMovies.includes(favMovieId);
      } else {
        return false;
      }
    }
  

   

       // Making the api call for the edit user endpoint
editUser(updatedUser: any): Observable<any> {
  const username = localStorage.getItem('Username');
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + username, updatedUser, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Making the api call for the delete user endpoint
deleteUser(): Observable<any> {
  const userId = localStorage.getItem('_Id');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + userId, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

 
    // Non-typed response extraction
    private extractResponseData(res: any): any {
      const body = res;
      return body || {};
    }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

