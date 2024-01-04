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
   *
   * @param favMovieId
   * @returns a boolean, if the following movie is in the users favorite list or not
   */
   isFavorite(favMovieId: string): boolean {
    return this.fetchApiData.isFavMovies(favMovieId);
  }

  /**
   * add a movie to users favorite list
   * @param favMovieId
   */
  addFavMovie(favMovieId: string): void {
    this.fetchApiData.addFavMovie(favMovieId).subscribe(() => {
      console.log('addfavmovies called');

      this.snackBar.open('added to favorites', 'OK', { duration: 2000 });
      console.log('addfavmovies called');
    });
  }

  /**
   * removes a movie from the users favorite list
   * @param favMovieId
   */
  removeFavMovie(favMovieId: string): void {
    this.fetchApiData.deleteFavMovie(favMovieId).subscribe(() => {
      this.snackBar.open('removed movie from favorites', 'OK', {
        duration: 2000,
      });
    });
    console.log('removed fav movie');
  }
}