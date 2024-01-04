import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }


  /**
   * opens dialog with movie director details
   * @param name
   * @param bio
   * @returns director dialog with name and bio
   *
   */
  openDirectorDialog(director: any): void {
   this.dialog.open(MovieDetailsComponent, {
      data: {
        title: director.name,
        content: director.birthdate,
      },
    });

  }

  /**
   * opens dialog with movie genre details
   * @param name
   * @param description
   * @returns genre dialog with name and description
   *
   */
  openGenreDialog(genre: any): void {
     this.dialog.open(MovieDetailsComponent, {
      data: {
        title: genre.name,
        content: genre.description,
      },
    });
  
  }

  /**
   * opens dialog with movie synopsis
   * @param description
   * @returns synopsis dialog with movie description
   *
   */
  openSynopsisDialog(movie: any): void {
  this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Synopsis',
        content: movie.summary,
      },
    });
  }

    /**
   * gets user's favorite movies and populates favorites array
   * @returns user's favorite movies
   */
    getFavorite(): void {
      this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
        this.favorites = resp;
        return this.favorites;
      });
    }
  
    /**
     * checks if movieId is in favorites list and returns boolean
     * @param movieId
     * @returns true or false boolean
     */
    isFavorite(movieId: string): boolean {
      if (this.favorites.includes(movieId)) {
        return true;
      } else {
        return false;
      }
    }
  
    /**
     * updates both database and favorites array with movieId
     * @param movieId
     */
    addFavorite(movieId: string): void {
      const username = localStorage.getItem('Username');
      const token = localStorage.getItem('token');
  
      if (username && token) {
        this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(
          (response) => {
            this.favorites.push(movieId); // updates favorites array
            this.snackBar.open('Movie added to favorites', 'OK', {
              duration: 2000,
            });
          },
          (error) => {
            this.snackBar.open('Failed to add movie to favorites', 'OK', {
              duration: 2000,
            });
          }
        );
      }
    }
  
    /**
     * deletes movie from both database and favorites array
     * @param movieId
     */
    deleteFavorite(movieId: string): void {
      const username = localStorage.getItem('Username');
      const token = localStorage.getItem('token');
  
      if (username && token) {
        this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe(
          (response) => {
            // updates favorites array
            this.favorites = this.favorites.filter((movie) => movie !== movieId);
            this.snackBar.open('Movie deleted from favorites', 'OK', {
              duration: 2000,
            });
          },
          (error) => {
            this.snackBar.open('Failed to delete movie from favorites', 'OK', {
              duration: 2000,
            });
          }
        );
      }
    }
}